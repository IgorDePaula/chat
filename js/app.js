var app = angular.module('chat',['socket']);

app.controller('ChatCtrl',function($scope,$window,socket){
    var nome = $window.prompt('Qual o seu nome?');

    socket.on('connect',function(){
        socket.emit('adduser',nome);
    });
    socket.on('new',function(data){
    $scope.status = data.msg;
    });
});
