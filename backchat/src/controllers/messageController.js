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
      // Verificar se já existe uma mensagem semelhante
      const existingMessage = await message.findOne({
        text: newMessage.text,
        userRec: newMessage.userRec,
        userEnv: newMessage.userEnv,
      });

      if (existingMessage) {
        // Se existir, atualize a mensagem existente
        await message.findByIdAndUpdate(existingMessage._id, newMessage);
        res.status(200).json({ message: "Message updated successfully", message: existingMessage });
      } else {
        // Se não existir, crie uma nova mensagem
        const createdMessage = await message.create(newMessage);
        res.status(201).json({ message: "Message created successfully", message: createdMessage });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to create/update message` });
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
