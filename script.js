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
const paramScale = 0.4;

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

let manager = new Manager(); manager.settings();
let create = new Animal();
let pred = new Predator();
let preyy = new Prey();