import express from "express";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";
import connectDataBase from "./src/config/dbConnect.js";
import routes from "./src/routes/index.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

const PORT = 3001;

app.use(express.json());

routes(app);

const conexao = await connectDataBase();

conexao.on('error', err => console.error(err));

conexao.once("open", () => {
    console.log("Conectado ao banco de dados");
});

io.on("connection", (socket) => {
    console.log("Novo cliente conectado", socket.id);

    socket.on("disconnect", reason => {
      console.log("Cliente desconectado", socket.id);
  });

    socket.on("set_username", username => {
        socket.data.username = username;    
    });
  
    
    socket.on("message", text => {
        io.emit("receiveMessage", {
            text,
            authorId: socket.id,
            author: socket.data.username
        });
    })
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
