const http = require('http')
const express = require('express');
const app = express()
const socketIO = require('socket.io')
const cors = require('cors')
const server = http.createServer(app);
require("./Conns/db.js")
require('dotenv').config();

const port =  process.env.PORT || 5000;
// connectDB()
const io = socketIO(server);
app.use(cors());
app.use(express.json());
app.use("/api/auth",require("./routers/user.js"))
app.use("/api/chat",require("./routers/chatRoutes.js"))



io.on("connection", ()=>{
    console.log("new connection")
})



server.listen(port,()=>{
    console.log(`app listen on the port ${port}`)
})