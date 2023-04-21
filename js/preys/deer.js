import { Prey } from "../prey";
export class Deer extends Prey{
	constructor(sex, row, col, type) {
		super(sex, row, col, type);
	}

	get numberOfDeers(){
		return howMuchDeers;
	}

	deerDie(number){
		howMuchDeers--;
		delete preys[number];
	}
}