import express from "express";
import MessageController from "../controllers/messageController.js";

const router = express.Router();


router.get("/messages", MessageController.listMessages);
router.get("/messages/:id", MessageController.findMessageById);
router.post("/messages", MessageController.createMessage);
router.put("/messages/:id", MessageController.updateMessage);
router.delete("/messages/:id", MessageController.deleteMessage);
router.get("/messages/search", MessageController.findMessageByContent);

export default router;
