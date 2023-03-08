/*--------------------------------FoodForPrey-------------------------------- */
/*class FoodForPrey{
	constructor(row, col, type) {
		super(row, col, type);
	}
	
	static generateApple(row, col, randForType){
		let food, type = '';
		(randForType == 1) ? type = "apple" : type = undefined;
		food = new Apple(row, col, type);
		apples.push(food);
	}
}*/
/*--------------------------------Apple-------------------------------- */
/*class Apple extends FoodForPrey{
	constructor(row, col, type) {
		super(row, col, type);
	}
	get numberOfApples(){
		return howMuchApples;
	}

	appleWasEatten(number){
		howMuchApples--;
		delete apples[number];
	}
}*/
/*--------------------------------Move-------------------------------- */
/*class GenerateFood extends FoodForPrey{
	constructor(row, col, type) {
		super(row, col, type);
	}
	static move(){
		let k = 0, flag = 0, thisIter = howMuchApples - 1;
		while(flag != howMuchApples){
			let x = apples[k].row, y = apples[k].col, type = apples[k].type;
			while(!(map[x][y] instanceof Predator) || !(map[x][y] instanceof Prey) || !(map[x][y] instanceof Apple)){
				if(apples[k] == map[x][y]){
					map[x][y] = undefined;
					if(y >= 19) y -= 2;
					y++;
					MovePredator.bornAnAnimal(sex, x, y, type);
					predators.shift();
					map[x][y] = predators[thisIter];
					flag++;
				}
			}
			while(map[x][y] instanceof Predator || map[x][y] instanceof Prey || map[x][y] instanceof Apple){
				y--;
				if(y >= 19) y -= 2;
			}
		}
	}
}*/