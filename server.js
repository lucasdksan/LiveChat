const express = require('express');
const path = require('path');//padrão do Node

const app = express();
const server = require('http').createServer(app);//informar uma porta pelo websocket e definir o protocolo http
const io = require('socket.io')(server);//Definir o protocolo wss para o websocket

app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'public'));
app.engine('html',require('ejs').renderFile);
app.set('views engine','html');

app.use('/',(req,res)=>{
    res.render('index.html');
});

let messages = []

io.on('connection',socket =>{
    console.log(`Socket conectado ${socket.id}`);
    socket.emit('previousMessage',messages);
    socket.on('sendMessage',data =>{
        messages.push(data);
        socket.broadcast.emit('receiveMessage',data)
    })
});

server.listen(3001);