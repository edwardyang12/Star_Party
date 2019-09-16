'use strict';

var logger = require('./logger');

var Room = function(id, observer){
  this.id = id;
  this.io = io.of('/' + id);
  this.io.on('connection', this.connectController);

  this.observer = observer; // a socket object
  observer.room = this;
  observer.emit('connect-roomId', id);
  observer.on('disconnect', this.observerDisconnected);

  this.players = [];
  this.population = 1; // number of connected sockets
  this.state = 'lobby';
  this.password = 1000 + Math.floor(Math.random() * 9000); // random 4-digit number
}
module.exports.Room = Room;

Room.prototype.info = function(s){
  logger.info('room id=' + this.id + ': ' + s);
}

Room.prototype.connectController = function(socket){
  // give the socket 30 seconds to tell us what it's doing
  socket.decisionTimeout = setTimeout(function(){
    socket.emit('connect-error', 'socket failed to provide action in time');
    socket.disconnect();
  }, 1000 * 30);

  // join new player
  socket.on('connect-new', function(name, password){
    clearTimeout(socket.decisionTimeout);
    if(this.population >= 4){ // room is already full
      socket.emit('connect-error', 'room is full');
      socket.disconnect();
      return;
    }
    if(password != this.password){ // authenticate
      socket.emit('connect-error', 'password is incorrect');
      socket.decisionTimeout = setTimeout(function(){ // restart the decision timer
        socket.emit('connect-error', 'socket failed to provide action in time');
        socket.disconnect();
      }, 1000 * 30);
      return;
    }

    var player = false;
    for(var i = 0; i < 4; i++) if(this.players[i] == null){
      var player = new Player(i, socket);
      this.players[i] = player;
      socket.player = player;
      this.info('player ' + i + ' connected');
    }
    if(!player){
      socket.emit('connect-error', 'room is full');
      return;
    }

    this.population++;
  });

  // reconnect controller
  socket.on('connect-reconnect', function(id, password){
    clearTimeout(socket.decisionTimeout);

    if(this.players[id].socket != null){
      socket.emit('connect-error', 'player already has a connected controller');
      socket.disconnect();
      return;
    }

    if(password != this.password){ // authenticate
      socket.emit('connect-error', 'password is incorrect');
      socket.decisionTimeout = setTimeout(function(){ // restart the decision timer
        socket.emit('connect-error', 'socket failed to provide action in time');
        socket.disconnect();
      }, 1000 * 30);
      return;
    }

    this.info('player ' + id + ' reconnected');
    this.players[id].reconnectSocket(socket);
    this.population++;

  });
}

Room.prototype.observerDisconnected = function(){
  this.info('observer disconnected');
  this.population--;
  delete this.observer;
  this.observer.disconnect();
}

Room.prototype.reconnectObserver = function(socket){
  this.info('observer reconnected');
  this.observer = socket;
  socket.on('disconnect', this.observerDisconnected);
  this.population++;
}

// player objects call this when their socket disconnects
Room.prototype.playerDisconnected = function(id){
  this.info('player ' + id + ' disconnected');
  this.population--;
}


var Player = function(id, socket, game){
  this.id = id; // number from 0 to 3
  this.socket = socket;
  socket.on('disconnect', this.disconnected);
  socket.on('button-down', this.buttonDown);
  socket.on('button-up', this.buttonUp);
  socket.on('joystick-update', this.joystickUpdate);
  this.game = game;
  this.connected = true;
  this.buttons = {};
  this.joystick = [0, 0];
  this.stars = 0;
  this.coins = 0;
}

Player.prototype.disconnected = function(){
  this.socket.disconnect();
  delete this.socket;
  this.connected = false;
  this.room.playerDisconnected(this.id);
}

Player.prototype.reconnectSocket = function(socket){
  this.socket = socket;
  this.connected = true;
  socket.on('disconnect', this.disconnected);
  socket.on('button-down', this.buttonDown);
  socket.on('button-up', this.buttonUp);
  socket.on('joystick-update', this.joystickUpdate);
}

Player.prototype.buttonDown = function(btn){
  this.buttons[btn] = true;
}

Player.prototype.buttonUp = function(btn){
  this.buttons[btn] = false;
}

Player.prototype.joystickUpdate = function(c){
  this.joystick = c;
}
