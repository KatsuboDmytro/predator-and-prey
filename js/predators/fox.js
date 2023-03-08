/*--------------------------------Fox-------------------------------- */
class Fox extends Predator{
	constructor(sex, row, col, type) {
		super(sex, row, col, type);
	}

	get numberOfFoxes(){
		return howMuchFoxes;
	}

	foxDie(number){
		howMuchFoxes--;
		delete predators[number];
	}
}