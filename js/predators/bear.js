/*--------------------------------Bear-------------------------------- */
class Bear extends Predator{
	constructor(sex, row, col, type) {
		super(sex, row, col, type);
	}

	get numberOfBears(){
		return howMuchBears;
	}

	bearDie(number){
		howMuchBears--;
		delete predators[number];
	}
}