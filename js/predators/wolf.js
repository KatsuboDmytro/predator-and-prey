import { Predator } from "../predator";
export class Wolf extends Predator{
	constructor(sex, row, col, type) {
		super(sex, row, col, type);
	}

	get numberOfWolfes(){
		return howMuchWolfes;
	}

	wolfDie(number){
		howMuchWolfes--;
		delete predators[number];
	}
}