const express = require("express");
const { createPDF } = require("../controller/CreatePDF");

const router = express.Router();

router.post("/", createPDF)

exports.router = router;
