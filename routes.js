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

router.post("/contact/:senderNumber/message/:receiverNumber", addMessage);

router.delete("/message/:id", deleteMessage);

router.post("/contact", addContact);

router.delete("/contact/:phoneNumber", deleteContact);

export default router;
