import { user } from "../models/User.js";

class userController {
  static async listusers(req, res) {
    try {
      const userList = await user.find({});
      res.status(200).json(userList);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Request failed` });
    }
  }

  static async finduserById(req, res) {
    try {
      const id = req.params.id;
      const userFound = await user.findById(id);
      res.status(200).json(userFound);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve user` });
    }
  }

  static async createUser(req, res) {
    try {
      const { email } = req.body;
      // Verifique se o usuário com o mesmo e-mail já existe
      const existingUser = await user.findOne({ email: email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
      // Se o usuário não existir, crie um novo usuário
      const newUser = await user.create(req.body);
      res.status(201).json({ message: 'Created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to create user` });
    }
  }  

  static async updateuser(req, res) {
    try {
      const id = req.params.id;
      await user.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "user updated" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Update failed` });
    }
  }

  static async deleteuser(req, res) {
    try {
      const id = req.params.id;
      await user.findByIdAndDelete(id);
      res.status(200).json({ message: "user successfully deleted" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Deletion failed` });
    }
  }

  static async listarUserPorGitHubId (req, res) {
    const id = req.query.githubId;
    try {
      const userFound = await user.find({ githubId: id });
      res.status(200).json(userFound);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve user` });
    }
  }
};

export default userController;