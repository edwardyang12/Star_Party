'use strict';

// room = a game instance, with an observer that the server sends output to and several controllers.
// controller = a mobile screen, sends input to the server

var logger = require('./logger');
var room = require('./room');

var io;

// called once to initialize the socket io server
function init(server){
  io = require('socket.io')(server);
  io.of('/observer').on('connection', connectObserver);

  setInterval(clearEmptyRooms, 5000);
}
module.exports.init = init;

var rooms = {};

function connectObserver(socket){
  // give the socket 10 seconds to tell us what it's doing
  socket.decisionTimeout = setTimeout(function(){
    socket.emit('connect-error', 'socket failed to provide action in time');
    socket.disconnect();
  }, 1000 * 10);

  // start a new room with the socket as the observer
  socket.on('connect-new', function(){
    clearTimeout(socket.decisionTimeout);
    if(socket.room != null){
      socket.emit('connect-error', 'observer has already been assigned to a room');
      return;
    }
    createRoom(socket);
  });

  // reconnect an observer
  socket.on('connect-reconnect', function(id){
    clearTimeout(socket.decisionTimeout);
    if(socket.room != null){
      socket.emit('connect-error', 'observer has already been assigned to a room');
      return;
    }
    if(rooms[id] == null){
      socket.emit('connect-error', 'room does not exist');
      socket.disconnect();
      return;
    }
    rooms[id].reconnectObserver(socket);
  });
}

function createRoom(observer){
  // generate a unique id for the room
  var id = Math.floor(Math.random() * 100000);
  while(id in rooms) id = Math.floor(Math.random() * 100000);

  var r = new room.Room(id, observer);
  rooms[id] = r;

  r.info('created room (observer connected)');
}

function clearEmptyRooms(){
  // delete rooms that have no users and no updates in 60 seconds, or no new activity for 15 minutes
  for(var i in rooms){
    var r = rooms[i];
    if(r.population == 0 && Date.now() - r.lastActionTime > 1000 * 60 || Date.now() - r.lastActionTime > 1000 * 60 * 15){
      for(var i in r.players) if(r.players[i].socket != null) r.players[i].socket.emit('connect-roomDeleted');
      delete rooms[i];
      logger.info('deleted Room id=' + i + ' due to inactivity');
    }
  }
}
