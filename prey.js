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