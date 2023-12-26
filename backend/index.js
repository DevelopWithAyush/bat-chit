const http = require('http')
const express = require('express');
const app = express()
const socketIO = require('socket.io')
const cors = require('cors')
const server = http.createServer(app);
require("./Conns/db.js")

const port = 5000 || process.env.PORT;
// connectDB()
const io = socketIO(server);



io.on("connection", ()=>{
    console.log("new connection")
})



server.listen(port,()=>{
    console.log(`app listen on the port ${port}`)
})