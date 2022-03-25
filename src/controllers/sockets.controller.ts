import ChatHelper from "../helpers/chat.helper";

const ch: ChatHelper = new ChatHelper();

class SocketsController{

    constructor(socket:any){
        this.sendMessage(socket);
        this.joinRoom(socket);
        this.disconnectServer(socket);
    };

    private joinRoom(socket:any){
        socket.on("join_room", (data:any) => {
            socket.join(data);
        });
    };

    private sendMessage(socket:any){
        socket.on("send_message", (data:any) => {
            ch.newChat(data).then(v => {
                socket.to(data.id).emit("receive_message", v);
            });
        });
    };

    private disconnectServer(socket:any){
        socket.on("disconnect", (rev:any)=>{
            socket.disconnect();
            console.log(rev, "El usuario se ha desconectado");
        });
    };

};

export default SocketsController;