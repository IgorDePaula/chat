var io = require('socket.io').listen(8020);
var users = [];
io.sockets.on('connection',function(socket){

    socket.on('adduser',function(user){

        socket.username = user;
        users.forEach(function(i,value){
            console.log('verify user');
            if(value != user){
                users[users.length] = user;
                console.log(user+' add');

            }
        });

        if(users.length <=0){
            users.push(user);
        }

        console.log(users);
        var msg = '<b>SERVER:</b> '+user+' Entrou no chat<br/>';
        socket.emit('newuser',{usersList:users});
        console.log(users);
        socket.broadcast.emit('newuser',{usersList:users});
    });

    socket.on('send',function(user,message){
        var msg = '<b>'+user+':</b> '+message+'<br/>';
        socket.emit('new',{msg:msg});
        socket.broadcast.emit('new',{msg:msg});
    });

    socket.on('disconnect',function(){
        delete users[socket.username];
        socket.emit('newuser',{usersList:users});
        console.log(users);
        console.log(socket.username+' disconectado');


        var index = users.indexOf(socket.username);
        if (index > -1) {
            users.splice(index, 1);
        }
        socket.broadcast.emit('newuser',{usersList:users});
    });


})
