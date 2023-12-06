import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product-list/ProductSlice";
import authReducer from "../features/Auth/AuthSlice";
import cartReducer from "../features/Cart/CartSlice";
import orderReducer from "../features/orders/OrderSlice";
import UserReducer from "../features/user/UserSlice";
import ContactReducer from "../features/Contact/ContactSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: UserReducer,
    message: ContactReducer,
  },
});
