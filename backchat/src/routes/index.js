import express  from "express";
import users from './userRoutes.js';
import messages from './messageRoutes.js';

const routes = ( app ) => {

    app.route("/").get((req, res) => res.status(200).send("Teste Curso"));

    app.use(express.json(), users, messages);
};

export default routes;