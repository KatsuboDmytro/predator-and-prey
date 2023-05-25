// Це початкова кількість здобичі та хижаків на момент першого запуску симуляції.
let numbOfPredators = 500, numbOfPreys = 500;

// Це швидкість з якою можуть бігти хижаки та здобич. Збільшення цього числа збільшує швидкість!
let predatorSpeedLimit = 1.5, preySpeedLimit = 10.5;

// Це Скільки років має бути хижаку та жертві, перш ніж вона розмножиться
let predatorsBirthTime = 3.0, preyBirthTime = 2.4;

// Саме стільки можуть протриматися хижаки, перш ніж помруть від голоду.
let predatorsHungerTime = 1.5, preysHungerTime = 1.5;

// Це максимальна кількість здобичі, яка може існувати в симуляції.
let predatorPopCap = 4000, preyPopCap = 4000;

// Хижаки вбиватимуть здобич, яка знаходиться на цій відстані (у пікселях). Збільшення цього числа дозволить хижакам вбивати здобич, яка знаходиться далі.
let killPreyRadius = 4.5;

let predatorArray = [], maxPredator = 0, minPredator = 0, 
    preyArray = [], maxPrey = 0, minPrey = 0;

// Це максимальний вік здобичі до смерті
const preyAgeTime = 5.0, predatorAgeTime = 13.0;

const populationSample = 10, delay = 1, radius = 1;
let delayCount = 0, running = false;

let popPrey, popPredators;
const popHistory = 600;

let popCount = 0, popCountBeginning = 0, popPreyAve = 0, popPredatorsAve = 0;
let sampleCount = populationSample - 1, maxPop = numbOfPredators;

const predatorsColor = [255, 0, 0], preyColor = [0, 255, 0];

const environmentHeight = 555, environmentWidth = 550;
const paramScale = 0.4; //дивне щось, напевно множим для приведення до секунд

let preyBirthAge = preyBirthTime * paramScale;
let predatorsBirthAge = predatorsBirthTime * paramScale;
let predatorsHungerLimit = predatorsHungerTime * paramScale;

let radiusForAnimalBall = 2;

let time = 0;
const timeStep = 0.01;

let predators = [], prey = [];

const listener = () => {
    document.querySelector('.Analytics').classList.toggle('absolute');
    document.getElementById('settings_block').classList.toggle('absolute');
}

class Manager {
    settings(){
        const maxOfPredators = (number) => document.querySelector('.maxOfPredators').textContent = number;
        const minOfPredators = (number) => document.querySelector('.minOfPredators').textContent = number;
        const maxOfPreys = (number) => document.querySelector('.maxOfPreys').textContent = number;
        const minOfPreys = (number) => document.querySelector('.minOfPreys').textContent = number;

        document.getElementById('settings').addEventListener('click', listener);
        document.querySelector('.info').addEventListener('click', listener);
        document.querySelector('.samotyzhki').addEventListener('click', () => {
            numbOfPredators = prompt("numb of them"), numbOfPreys = prompt("numb of them");
            predatorSpeedLimit = prompt("numb of them"), preySpeedLimit = prompt("numb of them");
            predatorsBirthTime = prompt("numb of them"), preyBirthTime = prompt("numb of them");
            predatorsHungerTime = prompt("numb of them"), preysHungerTime = prompt("numb of them");
            predatorPopCap = prompt("numb of them"), preyPopCap = prompt("numb of them");
            killPreyRadius = prompt("numb of them");
        });
        
        document.querySelector('.start').addEventListener('click', () => running = true);
        document.querySelector('.pause').addEventListener('click', ()=>{
            running = false;
            document.querySelector('.start').textContent = 'Continue'; 
            maxOfPredators(Math.max(...predatorArray));
            minOfPredators(Math.min(...predatorArray));
            maxOfPreys(Math.max(...preyArray));
            minOfPreys(Math.min(...preyArray));
        });
        
        document.querySelector('.clear').addEventListener('click', () => location.reload());
    }
}

class Vect2D {
    constructor(vx, vy) {
        this.vx = vx;
        this.vy = vy;
    }
}   

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

class Predator extends Animal {
    kill(predators, predatorsHungerLimit, predatorAgeTime){
        for (let i = predators.length - 1; i >= 0; i--) {
            let temp = predators[i];
            if (temp.hunger > predatorsHungerLimit || temp.a > predatorAgeTime) {
                predators.splice(i, 1);
            }
        }
    }
}

class Prey extends Animal {
    kill(prey, predators, killPreyRadius, preyAgeTime){
        for (let i = prey.length - 1; i >= 0; i--) {
            let isClose = 0;
            let j = 0;
            let tempPrey = prey[i];
            while ((isClose == 0) && j < predators.length) {
                let tempPred = predators[j];
                //dist() призначена для обчислення відстані між двома точками в двовимірному просторі. 
                if (dist(tempPrey.x, tempPrey.y, tempPred.x, tempPred.y) < killPreyRadius) {
                    isClose = 1;
                    tempPred.hunger = 0; //цей щойно з'їв
                    predators[j] = tempPred;
                }
                j++;
            }
            if (isClose == 1) prey.splice(i, 1);
            if (prey.a > preyAgeTime) prey.splice(i, 1);
        }
    }
}

let manager = new Manager(); manager.settings();
let create = new Animal();
let pred = new Predator();
let preyy = new Prey();

function setup() {
    createCanvas(1150, 555);
    predators = [], prey = [];
    
    popPrey = new Array(popHistory);
    popPredators = new Array(popHistory);
    
    create.setUp(numbOfPredators, predators, 'pred');// налаштування хижаків
    create.setUp(numbOfPreys, prey, 'prey');// налаштування жертви
}

function draw() {
    stroke(128, 128, 128);
    line(551, 0, 555, 555);

    if (running) {
        delayCount++;
        if (delayCount >= delay) { //затримка
            delayCount = 0;
            
            time += timeStep;
            
            background(0);
            create.adjustPositions(predators);
            create.adjustPositions(prey);

            create.bornAnimal(predators, 'pred', predatorPopCap, predatorsBirthAge); //народження хижака
            create.bornAnimal(prey, 'prey', preyPopCap, preyBirthAge); //народження здобичі
                  
            create.drawAnimal(predators, predatorsColor); //малюємо хижака
            create.drawAnimal(prey, preyColor); //малюємо жертву
            
            pred.kill(predators, predatorsHungerLimit, predatorAgeTime); //вбиваєм хижака
            preyy.kill(prey, predators, killPreyRadius, preyAgeTime); //вбиваєм жертву

            create.adjustVelocities(predators, prey);
            sampleCount++;
            
            if (sampleCount == populationSample) {
                sampleCount = 0;
                popCount++;
                if (popCount < popHistory) {
                    popPrey[popCount] = prey.length/20;
                    popPredators[popCount] = predators.length/20;
                }
                if (popCount >= popHistory) {
                    for (let i = 0; i < popPrey.length - 1; i++) {
                        popPrey[i] = popPrey[i + 1];
                        popPredators[i] = popPredators[i + 1];
                    }
                    popPrey[popHistory - 1] = prey.length;
                    popPredators[popHistory - 1] = predators.length;
                    popPredatorsAve = 0;
                    popPreyAve = 0;
                    popCountBeginning++;
                }
            }        
            //дані про населення ділянки
            let maxIndex = 0;
            let maxPop = popPrey[0];
            
            for (let i = 0; i < popPrey.length; i++){ //знаходимо максимальну к-ть здобичі
                if (popPrey[i] > maxPop && i < popCount) {
                    maxIndex = i;
                    maxPop = popPrey[i];
                }
                if (popPredators[i] > maxPop && i < popCount) {
                    maxIndex = i;
                    maxPop = popPredators[i];
                }
            }

            translate(600, 0);
            for(let i = 0; i < popPrey.length; i++) { //Наносимо точки графіка
                let popY = 0;

                stroke(preyColor);
                popY = popToY(popPrey[i]);
                if (radius == 1) {
                    point(i, popY);
                } else {
                    fill(preyColor);
                    ellipse(i, popY, radius, radius);
                    fill(0);
                }
                
                stroke(predatorsColor);
                popY = popToY(popPredators[i]);
                if (radius == 1) {
                    point(i, popY);
                } else {
                    fill(predatorsColor);
                    ellipse(i, popY, radius, radius);
                    fill(0);
                }
            }
        
            text(round(max(popPrey[maxIndex], popPredators[maxIndex])), popToY(max(popPrey[maxIndex], popPredators[maxIndex])));
            line(popToY(max(popPrey[maxIndex], popPredators[maxIndex])), popToY(max(popPrey[maxIndex], popPredators[maxIndex])));
            
            textSize(15);
            fill(predatorsColor);
            text("PREDATORS:" + predators.length, 420, height - 540);
            predatorArray.push(predators.length);
            
            fill(preyColor);
            text("PREY:" + prey.length, 420, height - 520);
            preyArray.push(prey.length);
        }
    }
}

//Коригування y позицій графіка на основі максимального населення
function popToY(x) {
    return height - 5 - (95 * (x / maxPop));
}

//Додати обмеження швидкості
function speedLimit(vels, speedLimit) {
    const speed = dist(0, 0, vels.vx, vels.vy);
    if (speed > speedLimit) {
        vels.vx = speedLimit * vels.vx / speed;
        vels.vy = speedLimit * vels.vy / speed;
    }
}