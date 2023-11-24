import express from 'express';
import UserController from '../controllers/userController.js';

const routes = express.Router();

routes.get('/users', UserController.listusers);
routes.get('/users/busca', UserController.listarUserPorGitHubId);
routes.get('/users/:id', UserController.finduserById);
routes.post('/user', UserController.getUser);
routes.post('/users', UserController.createUser);
routes.put('/users/:id', UserController.updateuser);
routes.delete('/users/:id', UserController.deleteuser);


export default routes;