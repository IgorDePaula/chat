var io  = require('socket.io').listen(8020);

io.sockets.on('connection',function(socket){
    var users = [];
    socket.on('adduser',function(user){
        users[user] = user; 
        var msg = '<b>SERVER:</b> '+user+' Entrou no chat<br/>';
        socket.emit('new',{msg:msg});
        socket.broadcast.emit('new',{msg:msg});
    });

    socket.on('send',function(user,message){
        var msg = '<b>'+user+':</b> '+message+'<br/>';
        socket.emit('new',{msg:msg});
        socket.broadcast.emit('new',{msg:msg});
    });


})