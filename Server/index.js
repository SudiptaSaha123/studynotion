const express = require("express");
const app = express();

const userRouts = require("./routes/User");
const profileRouts = require("./routes/Profile");
const paymentRouts = require("./routes/Payment");
const courseRouts = require("./routes/Course");
const contactUsRouts = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Database connect
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Cloudinary connection
cloudinaryConnect();

// Mount routs
// app.use("/api/v1/auth", userRouts);
app.use("/api/v1/auth", userRouts);
app.use("/api/v1/profile", profileRouts);
app.use("/api/v1/course", courseRouts);
app.use("/api/v1/payment", paymentRouts);
app.use("/api/v1/reach", contactUsRouts);

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
