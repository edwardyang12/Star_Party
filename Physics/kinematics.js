var a = require('./Object.js'); //import object class

var position = [1,2,3 ];
const JOJO = new a.Object(position,5);
console.log(JOJO.getPosition);

JOJO.changeVelocity = [9,9,9];
positionVCalc(JOJO,1);
console.log(JOJO.getPosition);

//i assume time is tick based so we can figure that out later
// TODO: connecting time to the tick based system

// positionCalc and velocityCalc update values based on time 
function positionCalc(object, time){
    var index;
    var temp = object.getPosition;
    for(index = 0; index<object.getVelocity.length;index++){
        temp[index] = temp[index] + object.getVelocity[index]*time
          + object.getAcceleration[index]*time*time/2;
    }
    object.changePosition = temp;
}

function velocityCalc(object, time){
    var index;
    var temp = object.getVelocity;
    for(index = 0; index<object.getAcceleration.length;index++){
        temp[index] = temp[index] + object.getAcceleration[index]*time;
    }
    object.changeVelocity = temp;
}


function distanceCalc(position, velocity, mass, endPosition){
  //takes in particle's position and velocity and returns the max height
  //and distance, and returns both
  //assumes a flat surface for now lol
  //index one of both arrays should be the X value, and the index of the
  //second array should be the Y value

  //to find the total distance, we're going to use v^2= v^2_0 + 2a(delta)x
  //we have to find the x distance and the y distance, and from this
  //we will be able to get the max height and distance

  //to find distance, we can find the time from the Y value returning to 0
  //and then recording time

  var time;
  var displacement = [endPosition[0]-position[0], endPosition[1]-position[1]];
  var momentum = [mass*velocity[0], mass*velocity[1]];
  //to derive time, we can use velocityY = velocityY(initial) + accel*time
  //we want to know when velocity is 0


}
