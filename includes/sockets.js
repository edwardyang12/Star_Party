'use strict';

// room = a game instance, with an observer that the server sends output to and several controllers.
// controller = a mobile screen, sends input to the server

var logger = require('./logger');
var game = require('./game');

var io;

// called once to initialize the socket io server
function init(server){
  io = require('socket.io')(server);
  io.of('/observer').on('connection', createRoom);
  setInterval(updateRooms, 1000 / 60); // 60 updates per second
}
module.exports.init = init;

function updateRooms(){
  for(var room in rooms)
    room.observer.emit('update', room.game.getUpdate());
}

var rooms = {};

var Room = function(id, observer){
  this.id = id;
  this.game = game.createGame();
  this.io = io.of('/' + id);
  this.io.on('connection', this.connectController);
  this.observer = observer; // a socket object
  this.controllers = [];
}

Room.prototype.connectController = function(socket){
  var controller = false;

  // find an empty controller within the room
  for(var i = 0; i < 4; i++)
    if(this.controllers[i] == null){ // new connection
      controller = new Controller(i, socket);
      this.controllers[i] = controller;
      this.info('added controller ' + i);
      break;
    } else if(this.controllers[i].socket == null){ // reconnect
      controller = this.controllers[i];
      controller.socket = socket;
      controller.player.reconnected();
      this.info('reconnected controller ' + i);
      break;
    }

  if(!controller){
    // if no empty space, deny the controller
    socket.disconnect();
    return;
  }

  socket.controller = controller;

  // when a controller disconnects
  socket.on('disconnect', function(){
    r.info('controller ' + controller.id + ' lost connection');
    controller.socket = null;
    controller.player.disonnected();
    socket.disconnect();
  });

  // input events
  socket.on('button-down', controller.player.buttonDown);
  socket.on('button-up', controller.player.buttonUp);
  socket.on('joystick-update', controller.player.joystickUpdate);

}

Room.prototype.info = function(s){
  logger.info('room id=' + this.id + ': ' + s);
}

var Controller = function(id, socket){
  this.socket = socket;
  this.id = id; // number from 0 to 3
  this.player = game.addPlayer(id);
}

function createRoom(observer){
  // generate a unique id for the room
  var id = Math.floor(Math.random() * 100000);
  while(id in rooms) id = Math.floor(Math.random() * 100000);

  var r = new Room(id, observer);
  rooms[id] = r;

  // link the observer socket
  observer.room = r;

  r.info('created room (observer connected)');

  observer.on('disconnect', function(){
    r.info('deleting room (observer disconnected)');

    for(var i = 0; i < 4; i++)
      if(r.controllers[i].socket)
        r.controllers[i].socket.disconnect();

    delete rooms[id];
    observer.disconnect();
  });
}
