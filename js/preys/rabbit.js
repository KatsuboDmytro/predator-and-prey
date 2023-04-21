import { Prey } from "../prey";
export class Rabbit extends Prey{
	constructor(sex, row, col, type) {
		super(sex, row, col, type);
	}

	get numberOfRabbits(){
		return howMuchRabbits;
	}

	rabbitDie(number){
		howMuchRabbits--;
		delete preys[number];
	}
}