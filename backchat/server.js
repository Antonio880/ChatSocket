import express from "express";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";
import cors from "cors";
import connectDataBase from "./src/config/dbConnect.js";
import routes from "./src/routes/index.js";

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

const PORT = process.env.PORT || 3001;

app.use(express.json());

// app.get('/githubLogin', (req, res) => {
//     const link = `<a href="https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}">Login with GitHub</a>`;
//   res.send(link);
//   });
  
// app.get('/callback', async (req, res) => {
// const code = req.query.code;

// try {
//     // Exchange the code for an access token
//     const response = await axios.post('https://github.com/login/oauth/access_token', {
//     client_id: process.env.CLIENT_ID,
//     client_secret: process.env.CLIENT_SECRET,
//     code: code,
//     });

//     const accessToken = querystring.parse(response.data).access_token;

//     // You can now use the accessToken to make authenticated requests to the GitHub API

//     const render = `Successfully authorized! Got code ${code}. Access Token: ${accessToken}`;
//     res.send(render);
// } catch (error) {
//     console.error('Error exchanging code for access token:', error.message);
//     res.status(500).send('Error exchanging code for access token');
// }
// })

routes(app);

const conexao = await connectDataBase();

conexao.on('error', err => console.error(err));

conexao.once("open", () => {
    console.log("Conectado ao banco de dados");
});

io.on("connection", async (socket) => {
    console.log("Novo cliente conectado", socket.id);

    socket.on("disconnect", (reason) => {
        console.log("disconnect", socket.id, reason);
    });

    socket.on("set_username", username => {
        socket.data.username = username;    
    });

    socket.on("get_username", () => {
        socket.emit("receive_username", socket.data.username);
    });
  
    
    socket.on("message", data => {
      io.emit("receiveMessage", {
          text: data.text,
          userRec: data.userRec,
          userEnv: data.userEnv,
          authorId: socket.id,
          author: socket.data.username
      });
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
