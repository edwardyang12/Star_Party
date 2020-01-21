// data about a point particle
var position;
var velocity;
var mass;

function Object(positionX, positionY, mass){
    this.position = [positionX,positionY];
    this.velocity = [0,0];
    this.mass = mass;
}

function Object(positionX, positionY, velocityX, velocityY, mass){
    this.position = [positionX,positionY];
    this.velocity = [velocityX,velocityY];
    this.mass = mass;
}

function getPosition(){
  return this.position;
}

function getVelocity(){
  return this.velocity;
}

function getMass(){
  return this.mass;
}


// TODO: add adjustments to velocity and position

function addVelocity(){

}
