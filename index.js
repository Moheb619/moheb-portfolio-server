import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// Import all routes start
import ContactRoutes from "./routes/ContactRoutes.js";
// Import all routes ends
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
// use routes middleware

app.get("/", (req, res) => {
  res.send("Working Fine Portfolio Server");
});

// Use routes
app.use("/contact", ContactRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log("Connected to backend.");
});
