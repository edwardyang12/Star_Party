'use strict';

var logger = require('./logger');

var Game = function(){
  this.players = [];
}

Game.prototype.addPlayer = function(id){
  var p = new Player(this, id);
  this.players[id] = p;
  return p;
}

Game.prototype.getUpdate = function(){

}

module.exports.createGame = Game;

var Player = function(game, id){
  this.game = game;
  this.id = id;
  this.joystick = [0, 0];
}

Player.prototype.buttonDown = function(btn){
}

Player.prototype.buttonUp = function(btn){

}

Player.prototype.joystickUpdate = function(c){
  this.joystick = c;
}
