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