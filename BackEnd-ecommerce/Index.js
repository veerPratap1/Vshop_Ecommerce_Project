const express = require("express");
const mongoose = require("mongoose");
const ProductRouter = require("./routes/ProductRoute");
const CategoryRouter = require("./routes/CategoryRoute");
const SubCategoryRouter = require("./routes/SubCategoryRoute");
const ColourRouter = require("./routes/ColorRoute");
const SizeRouter = require("./routes/SizeRoute");
const MessageRoute = require("./routes/MessageRoute");
const BrandRouter = require("./routes/BrandRoute");
const UserRouter = require("./routes/UserRoute");
const AuthRouter = require("./routes/AuthRoute");
const CartRouter = require("./routes/CartRoute");
const OrderRouter = require("./routes/OrderRoute");
const passport = require("passport");
const session = require("express-session");
const MemoryStore = require('memorystore')(session)
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const { User } = require("./models/UserModel");
const JwtStrategy = require("passport-jwt").Strategy;
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { isAuth, senitizeUser, cookieExtractor } = require("./services/commen");
const cors = require("cors");
const path = require("path");
const { Order } = require("./models/OrderModel");
const pdfRoute = require("./routes/PdfRoute");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

const server = express();
//Payment

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SERVER_KEY);

//Webhook

const endpointSecret = process.env.ENDPOINT_SECRET;

server.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        const order = await Order.findById(
          paymentIntentSucceeded.metadata.orderId
        );
        order.paymentStatus = "received";
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

//middlewear
server.use(express.static(path.resolve(__dirname, "build")));
server.use(cookieParser());
server.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: process.env.SESSION_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

server.use(passport.authenticate("session"));

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(
  "/uploads/Product_img",
  express.static(path.join(path.resolve(__dirname, "uploads", "Product_img")))
);

//app routes
server.use("/products", ProductRouter.router);
server.use("/categories", CategoryRouter.router);
server.use("/Subcategories", SubCategoryRouter.router);
server.use("/colour", isAuth(), ColourRouter.router);
server.use("/size", isAuth(), SizeRouter.router);
server.use("/message", isAuth(), MessageRoute.router);
server.use("/brands", BrandRouter.router);
server.use("/api/users", isAuth(), UserRouter.router);
server.use("/api/auth", AuthRouter.router);
server.use("/carts", isAuth(), CartRouter.router);
server.use("/orders", isAuth(), OrderRouter.router);
server.use("/invoicePdf", pdfRoute.router);

// * if any route doesn't match react router will work
server.get("*", (req, res) => {
  res.sendFile(path.resolve("build", "index.html"));
});

//Passport authenticate
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        return done(null, false, { message: "User Not found" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Password is incorrect" });
          }
          const token = jwt.sign(senitizeUser(user), SECRET_KEY);

          done(null, { id: user.id, role: user.role, token });
        }
      );
    } catch (error) {
      done(error.message);
    }
  })
);

//Passport JWT token

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, senitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(err, false);
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      role: user.role,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

//Database connection

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGOODB_URL);
  console.log("dataBase connected");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

server.post("/create-payment-intent", async (req, res) => {
  const { totalAmount, orderId } = req.body;


  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100,
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      orderId,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

server.listen(process.env.PORT, () => {
  console.log("server started");
});
