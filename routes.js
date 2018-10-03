import express from "express";
import {
  addContact,
  deleteContact,
  addMessage,
  deleteMessage
} from "./server/controllers";
const router = express.Router();

router.get("/", (req, res) => {
  res.json("It works!");
});

router.post("/message", addMessage);

router.delete("/message", deleteMessage);

router.post("/contact", addContact);

router.delete("/contact", deleteContact);

export default router;
