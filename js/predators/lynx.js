/*--------------------------------Lynx-------------------------------- */
class Lynx extends Predator{
	constructor(sex, row, col, type) {
		super(sex, row, col, type);
	}

	get numberOfLynxes(){
		return howMuchLynxes;
	}

	lynxDie(number){
		howMuchLynxes--;
		delete predators[number];
	}
}