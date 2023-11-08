import { message } from "../models/Message.js";
import { user } from "../models/User.js";

class MessageController {
  static async listMessages(req, res) {
    try {
      const messageList = await message.find({});
      res.status(200).json(messageList);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to fetch messages` });
    }
  }

  static async findMessageById(req, res) {
    try {
      const id = req.params.id;
      const messageFound = await message.findById(id);
      res.status(200).json(messageFound);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve message` });
    }
  }

  static async createMessage(req, res) {
    const newMessage = req.body;
    try {
      const userFoundEnv = await user.findById(newMessage.userEnv);
      const userFoundRec = await user.findById(newMessage.userRec);
      console.log(userFoundEnv, userFoundRec);
      if (!userFoundEnv || !userFoundRec) {
        return res.status(404).json({ message: "User not found" });
      }
      const completeMessage = { ...newMessage, userEnv: { ...userFoundEnv._doc }, userRec: { ...userFoundRec._doc } };
      const createdMessage = await message.create(completeMessage);
      res.status(201).json({ message: "Message created successfully", message: createdMessage });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to create message` });
    }
  }

  static async updateMessage(req, res) {
    try {
      const id = req.params.id;
      await message.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Message updated" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to update message` });
    }
  }

  static async deleteMessage(req, res) {
    try {
      const id = req.params.id;
      await message.findByIdAndDelete(id);
      res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to delete message` });
    }
  }

  static async findMessageByContent(req, res) {
    const content = req.query.content;
    try {
      const messagesByContent = await message.find({ content: content });
      res.status(200).json(messagesByContent);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to search messages` });
    }
  }
}

export default MessageController;
