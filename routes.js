import express from "express";
import {
  addContact,
  deleteContact,
  addMessage,
  deleteMessage,
  getMessage
} from "./server/controllers";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("It works!");
});

router.post("/contact/:senderNumber/message/:receiverNumber", addMessage);

router.delete("/message/:id", deleteMessage);

router.post("/contact", addContact);

router.delete("/contact/:phoneNumber", deleteContact);
router.get("/message/:id", getMessage);

export default router;
