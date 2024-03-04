const express = require("express");
const router = express.Router();
const { contuctUsController } = require("../controllers/ContactUs");

router.post("/contact", contuctUsController);

module.exports = router;
