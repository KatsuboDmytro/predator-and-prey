class Vect2D {
    constructor(vx, vy) {
        this.vx = vx;
        this.vy = vy;
    }
}   

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