/*--------------------------------Horse-------------------------------- */
class Horse extends Prey{
	constructor(sex, row, col, type) {
		super(sex, row, col, type);
	}

	get numberOfHorses(){
		return howMuchHorses;
	}

	horseDie(number){
		howMuchHorses--;
		delete preys[number];
	}
}