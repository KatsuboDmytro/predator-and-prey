import { Predator } from "./predator";
import { MovePredator } from "./predator";



import { Prey } from "./prey";
import { MovePrey } from "./prey";


export let map = new Array(70), predators = [], preys = [],
		howMuchFoxes = 5, howMuchBears = 5, howMuchLynxes = 5, howMuchWolfes = 5,
		howMuchPredators = howMuchFoxes + howMuchBears + howMuchLynxes + howMuchWolfes;

		howManyRabbits = 5, howManyBoars = 5, howManyDeers = 5, howManyHorses = 5,
		howMuchPreys = howManyRabbits + howManyBoars + howManyDeers + howManyHorses;
/*--------------------------------Manager-------------------------------- */
export class Manager{
	constructor(){
		this.numbOfPredators = predators;
		this.numbOfPreys = preys;
	}
	static randomNumb(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	call(){
		Map.theMap();
		Map.animalsPosition();

		setInterval(()=>{
			MovePredator.move();
			MovePrey.move();
			console.log(map);
			console.log("predators length = " + predators.length);
			console.log("preys length = " + preys.length);
		},100);
	}

	createNew(){
		for(let i = 0; i < howMuchFoxes; i++)
			Predator.bornFox(Manager.randomNumb(1,2), Manager.randomNumb(0,69), Manager.randomNumb(0,69), 1);
		for(let i = 0; i < howMuchBears; i++)
			Predator.bornBear(Manager.randomNumb(1,2), Manager.randomNumb(0,69), Manager.randomNumb(0,69), 2);
		for(let i = 0; i < howMuchLynxes; i++)
			Predator.bornLynx(Manager.randomNumb(1,2), Manager.randomNumb(0,69), Manager.randomNumb(0,69), 3);
		for(let i = 0; i < howMuchWolfes; i++)
			Predator.bornWolf(Manager.randomNumb(1,2), Manager.randomNumb(0,69), Manager.randomNumb(0,69), 4);

		for(let i = 0; i < howManyRabbits; i++)
			Prey.bornRabbit(Manager.randomNumb(1,2), Manager.randomNumb(0,69), Manager.randomNumb(0,69), 1);
		for(let i = 0; i < howManyBoars; i++)
			Prey.bornBoar(Manager.randomNumb(1,2), Manager.randomNumb(0,69), Manager.randomNumb(0,69), 2);
		for(let i = 0; i < howManyDeers; i++)
			Prey.bornDeer(Manager.randomNumb(1,2), Manager.randomNumb(0,69), Manager.randomNumb(0,69), 3);
		for(let i = 0; i < howManyHorses; i++)
			Prey.bornHorse(Manager.randomNumb(1,2), Manager.randomNumb(0,69), Manager.randomNumb(0,69), 4);
	}
}
/*--------------------------------Animal-------------------------------- */
export class Animal{
	constructor (sex, row, col, type) {
		this.sex = sex,
		this.row = row,
		this.col = col;
		this.type = type;
		if(sex == "woman") this.pregnancyTime = true;
		else this.pregnancyTime = false;
	}

	get numbOfAnimal(){
		return howMuchPredators + howMuchPreys;
	}
}
/*--------------------------------Map-------------------------------- */
class Map extends Animal{
	constructor(sex, row, col, type) {
		super(sex, row, col, type);
	}

	static theMap(){
		map = new Array(70).fill(undefined).map(() => new Array(70).fill(undefined));
		/*for (let i = 0; i < map.length; i++)
			map[i] = new Array(70);

		for (var m = 0; m < map.length; m++)
			for (var n = 0; n < map.length; n++)
				map[m][n] = undefined;*/
	}

	static animalsPosition(){
		for (let animal of predators.concat(preys)) {
			let x = animal.row, y = animal.col;
			map[x][y] = animal;
		  }
		/*for(let k = 0; k < predators.length; k++){
			let x = predators[k].row, y = predators[k].col;
			map[x][y] = predators[k];
		}
		for(let k = 0; k < preys.length; k++){
			let x = preys[k].row, y = preys[k].col;
			map[x][y] = preys[k];
		}*/
	}
}