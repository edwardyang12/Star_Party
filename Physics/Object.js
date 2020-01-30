// Object that has position, velocity, acceleration, mass in up to 3 dimensions
// with their associated accessors and getter methods

class Object{

    constructor(position, mass, velocity = null, acceleration = null){
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.acceleration = acceleration
    }

    get getPosition(){
        return this.position;
    }

    get getVelocity(){
        if (this.velocity==null) {
            return [0,0,0];
        }
        return this.velocity;
    }

    get getAcceleration(){
        if (this.acceleration==null) {
            return [0,0,0];
        }
        return this.acceleration;
    }

    get getMass(){
        return this.mass;
    }

    set changeVelocity(value){
        this.velocity = value;
        return 1; //1 for success
    }

    set changePosition(value){
        this.position = value;
        return 1; //1 for success
    }

    set changeAcceleration(value){
        this.acceleration = value;
        return 1; //1 for success
    }

    set changeMass(value){
        this.mass = value;
        return 1; //1 for success
    }
}

module.exports.Object = Object;
// var position = [1,2,3 ];
// const JOJO = new Object(position,5);
// console.log(JOJO.getVelocity);
// JOJO.changeVelocity= [9,9,9];
// JOJO.getVelocity;
