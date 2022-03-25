import app from "./app";
import {resolve} from "path";
import {config} from "dotenv";
import SocketsController from "./controllers/sockets.controller";

config({path: resolve(__dirname, "../.env")});

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on("connection", (socket:any) => {
    console.log(`Se ha conectado 1 usuario ${socket.id}`)
    const t: SocketsController = new SocketsController(socket);
});

server.listen(process.env.PORT!, ()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT!}`);
});

