import express from "express";
import { contactMessages } from "./../controllers/ContactControllers.js";
const router = express.Router();

// Send Messages in Database
router.post("/", contactMessages);

export default router;
