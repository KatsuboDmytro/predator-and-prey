/*--------------------------------Predator-------------------------------- */
class Predator extends Animal{
	constructor(sex, row, col, type) {
		super(sex, row, col, type);
	}
	static bornFox(randForSex, row, col, randForType){
		if(map[row][col] === undefined){
			let sex = "", child, type = '';
			(randForSex == 1) ? sex = "woman" : (randForSex == 2) ? sex = "man" : sex = undefined;
			(randForType == 1) ? type = "fox" : type = undefined;
			child = new Fox(sex, row, col, type);
			predators.push(child);
		}
		else{
			row++; col++;
			if(col >= 69 || row <= 0) {col -= 2; row += 2;}
			Predator.bornFox(randForSex, row, col, randForType);
		}
	}

	static bornBear(randForSex, row, col, randForType){
		if(map[row][col] === undefined){
			let sex = "", child, type = '';
			(randForSex == 1) ? sex = "woman" : (randForSex == 2) ? sex = "man" : sex = undefined;
			(randForType == 2) ? type = "bear" : type = undefined;
			child = new Bear(sex, row, col, type);
			predators.push(child);
		}
		else{
			row++; col++;
			if(col >= 69 || row <= 0) {col -= 2; row += 2;}
			Predator.bornBear(randForSex, row, col, randForType);
		}
	}

	static bornLynx(randForSex, row, col, randForType){
		if(map[row][col] === undefined){
			let sex = "", child, type = '';
			(randForSex == 1) ? sex = "woman" : (randForSex == 2) ? sex = "man" : sex = undefined;
			(randForType == 3) ? type = "lynx" : type = undefined;
			child = new Lynx(sex, row, col, type);
			predators.push(child);	
		}
		else{
			row++; col++;
			if(col >= 69 || row <= 0) {col -= 2; row += 2;}
			Predator.bornLynx(randForSex, row, col, randForType);
		}
	}

	static bornWolf(randForSex, row, col, randForType){
		if(map[row][col] === undefined){
			let sex = "", child, type = '';
			(randForSex == 1) ? sex = "woman" : (randForSex == 2) ? sex = "man" : sex = undefined;
			(randForType == 4) ? type = "wolf" : type = undefined;
			child = new Wolf(sex, row, col, type);
			predators.push(child);	
		}
		else{
			row++; col++;
			if(col >= 69 || row <= 0) {col -= 2; row += 2;}
			Predator.bornWolf(randForSex, row, col, randForType);
		}
	}

	get allPredators(){
		return predators;
	}

	get numberOfPredators(){
		return howMuchPredators;
	}
}

/*--------------------------------Move-------------------------------- */
class MovePredator extends Predator{
	constructor(sex, row, col, type) {
		super(sex, row, col, type);
	}

	static bornAnAnimal(sex, x, y, type){
		if(type == 1) Predator.bornFox(sex, x, y, type);
		else if(type == 2) Predator.bornBear(sex, x, y, type);
		else if(type == 3) Predator.bornLynx(sex, x, y, type);
		else if(type == 4) Predator.bornWolf(sex, x, y, type);
	}

	static eatThePrey(sex, x, y, type){
		console.log(`Before: ${x}, ${y}`);
		/*preys.forEach((animal) => {
			if (animal.x === x && animal.y === y) {
				preys.splice([animal.x, animal.y], 1);
				console.log(`animal: ${x}, ${y}`);
			}
		});*/
		/*preys.forEach((row, rowIndex) => {
			row.forEach((element, columnIndex) => {
				console.log(`forEach: ${rowIndex}, ${columnIndex}`);
			  if (element.x === x && element.y === y) {
				preys[rowIndex].splice(columnIndex, 1);
				console.log(`animal: ${x}, ${y}`);
			  }
			});
		});*/
		for (var m = 0; m < map.length; m++) {
			for (var n = 0; n < map.length; n++) {
				if (m === x && n === y) {
					let turupuru = preys.indexOf(map[x][y]);
					console.log(`turupuru: ${turupuru}`);
				}
			}
		  }
	}

	static move(){
		let k = 0, flag = 0, thisIter = howMuchPredators - 1;
		while(flag != howMuchPredators){
			let x = predators[k].row, y = predators[k].col, sex = predators[k].sex, type = predators[k].type, rand = Manager.randomNumb(1,4);

			if(sex == 'man') sex = 2;
			else if(sex == 'woman') sex = 1;

			if(type == 'fox') type = 1;
			else if(type == 'bear') type = 2;
			else if(type == 'lynx') type = 3;
			else if(type == 'wolf') type = 4;

			if(predators[k] == map[x][y]){
				switch (rand) {
					case 1:  //goBack
							map[x][y] = undefined;
							if(y >= 69) y -= 2;
							y++;
							if(map[x][y] instanceof Prey){
								MovePredator.eatThePrey(sex, x, y, type);
							}
							if(map[x][y] instanceof Predator){
								y -= 2; x += 1;
								if(y >= 69) {y -= 2; x -= 2;}
							}
							MovePredator.bornAnAnimal(sex, x, y, type);
							predators.shift();
							map[x][y] = predators[thisIter];
							flag++;
							break;

					case 2:  //goLeft
							map[x][y] = undefined;
							if(x <= 0) x += 2;
							x--;
							if(map[x][y] instanceof Prey){
								MovePredator.eatThePrey(sex, x, y, type);
							}
							if(map[x][y] instanceof Predator){
								x += 2;  y += 1;
								if(x <= 0) {x += 2;  y -= 2;}
							}
							MovePredator.bornAnAnimal(sex, x, y, type);
							predators.shift();
							map[x][y] = predators[thisIter];
							flag++;
							break;

					case 3:  //goStraight
							map[x][y] = undefined;
							if(y <= 0) y += 2;
							y--;
							if(map[x][y] instanceof Prey){
								MovePredator.eatThePrey(sex, x, y, type);
							}
							if(map[x][y] instanceof Predator){
								y += 2;  x += 1;
								if(y <= 0) {y += 2;  x -= 2;}
							}
							MovePredator.bornAnAnimal(sex, x, y, type);
							predators.shift();
							map[x][y] = predators[thisIter];
							flag++;
							break;

					case 4:  //goRight
							map[x][y] = undefined;
							if(x >= 69) x -= 2;
							x++;
							if(map[x][y] instanceof Prey){
								MovePredator.eatThePrey(sex, x, y, type);
							}
							if(map[x][y] instanceof Predator){
								x -= 2;  y += 1;
								if(x >= 69) {x -= 2;  x -= 2;}
							}
							MovePredator.bornAnAnimal(sex, x, y, type);
							predators.shift();
							map[x][y] = predators[thisIter];
							flag++;
							break;
				}
			}
		}
	}
}