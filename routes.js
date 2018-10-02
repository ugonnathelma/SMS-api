import express from "express";
import { addContact, deleteContact } from "./server/controllers/contact";
const router = express.Router();

router.get("/", (req, res) => {
  res.json("It works!");
});

router.post("/message", (req, res) => {
  res.json("Message sent");
});

router.delete("/message", (req, res) => {
  res.json("Message deleted");
});

router.post("/contact", addContact);

router.delete("/contact", deleteContact);

export default router;
