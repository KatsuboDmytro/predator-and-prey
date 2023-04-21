import { Prey } from "../prey";
export class Boar extends Prey{
	constructor(sex, row, col, type) {
		super(sex, row, col, type);
	}

	get numberOfBoars(){
		return howMuchBoars;
	}

	boarDie(number){
		howMuchBoars--;
		delete preys[number];
	}
}