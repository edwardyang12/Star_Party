//i assume time is tick based so we can figure that out later
// TODO: connecting time to the tick based system
function positionCalc(position, velocity, time){
  position = velocity * time * position;
  return position;
}
function velocityCalc(velocity, acceleration, time){
  velocity = acceleration, time, velocity;
  return velocity
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
