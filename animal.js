class Animal {
    constructor(x, y, r, a, velocity, acceleration, hunger, birthTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.a = a; // age
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.hunger = hunger; // час з останнього прийому їжі (для хижаків)
        this.birthTime = birthTime; // час від останнього народження
    }

    setUp(numbOfAnimal, animalArr, animalType){
        for(let i = 0; i < numbOfAnimal; i++) {
            let velocity = new Vect2D(0, 0);
            let acceleration = new Vect2D(0, 0);
            animalArr.push(
                new Animal( //Animal(
                    random(width), //x
                    random(height), //y
                    radiusForAnimalBall * 1., //radius
                    random( (animalType === 'pred' ? predatorsHungerLimit : preyBirthAge) * 0.8), // age
                    velocity, //швидкість
                    acceleration, //прискорення
                    0, //hunger
                    random( (animalType === 'pred' ? predatorsBirthAge : 0) * 0.9) //birthTime
                )
            )
        }
    }

    bornAnimal(animalArr, animalType, popCap, birthAge){
        for (let i = 0; i < animalArr.length; i++) {
            let temp = animalArr[i];
            let tempAge = (animalType == 'pred') ? temp.birthTime : temp.a;
            if (tempAge > birthAge) {
                let velocity = new Vect2D(0.0, 0.0);
                let acceleration = new Vect2D(0.0, 0.0);
                
                if (Math.random() > (animalArr.length / popCap) ** 2) {
                    animalArr.push(
                        new Animal(
                            temp.x, //x
                            temp.y, //y
                            temp.r, //radius
                            (animalType === 'pred') ? 0 : Math.random() * (birthAge * 0.2), // age
                            velocity, //швидкість
                            acceleration, //прискорення
                            0, //hunger
                            (animalType === 'pred') ? Math.random() * (birthAge * 0.2) : 0, //birthTime
                        )
                    );
                }
                animalArr[i] = temp;
                if(animalType === 'pred') {
                    temp.birthTime = 0;
                } else {
                    temp.a = Math.random() * (preyBirthAge * 0.1);
                };
            }
        }
    }

    drawAnimal(animalArr, animalColor) {
        for (let i = 0; i < animalArr.length; i++) {
            let temp = animalArr[i];
            fill(animalColor);
            stroke(animalColor);
            ellipse(temp.x, temp.y, temp.r * 2, temp.r * 2);
        }
    }

    adjustVelocities(predators, prey) { //Швидкості
        for(let i = 0; i < predators.length; i++) {
            let temp = predators[i];
            temp.velocity.vx += random(-0.1, 0.1);
            temp.velocity.vy += random(-0.1, 0.1);
            speedLimit(temp.velocity, predatorSpeedLimit);
            predators[i] = temp;
        }
         
        for(let i = 0; i < prey.length; i++) {
            let temp = prey[i];
            temp.velocity.vx += random(-0.1, 0.1);
            temp.velocity.vy += random(-0.1, 0.1);
            speedLimit(temp.velocity, preySpeedLimit);
            prey[i] = temp;
        }
    }

    adjustPositions(balls) {
        for (let i = 0; i < balls.length; i++) {
            let temp = balls[i];
            temp.x += temp.velocity.vx;
            temp.y += temp.velocity.vy;
            
            if (temp.x < 0) temp.x += environmentWidth;
            if (temp.x > environmentWidth) temp.x -= environmentWidth;
    
            if (temp.y < 0) temp.y += environmentHeight;
            if (temp.y > environmentHeight) temp.y -= environmentHeight;
            
            temp.a += timeStep;
            temp.hunger += timeStep;
            temp.birthTime += timeStep;
            balls[i] = temp;
        }
    }
}