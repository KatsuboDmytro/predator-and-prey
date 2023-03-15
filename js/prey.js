/*--------------------------------Prey-------------------------------- */
class Prey extends Animal{
	constructor(sex, row, col, type) {
		super(sex, row, col, type);
	}
	static bornRabbit(randForSex, row, col, randForType){
		if(map[row][col] === undefined){
			let sex = "", child, type = '';
			(randForSex == 1) ? sex = "woman" : (randForSex == 2) ? sex = "man" : sex = undefined;
			(randForType == 1) ? type = "rabbit" : type = undefined;
			child = new Rabbit(sex, row, col, type);
			preys.push(child);
		}
		else{
			row++; col++;
			if(col >= 69 || row <= 0) {col -= 2; row += 2;}
			Prey.bornRabbit(randForSex, row, col, randForType);
		}
	}

	static bornBoar(randForSex, row, col, randForType){
		if(map[row][col] === undefined){
			let sex = "", child, type = '';
			(randForSex == 1) ? sex = "woman" : (randForSex == 2) ? sex = "man" : sex = undefined;
			(randForType == 2) ? type = "boar" : type = undefined;
			child = new Boar(sex, row, col, type);
			preys.push(child);	
		}
		else{
			row++; col++;
			if(col >= 69 || row <= 0) {col -= 2; row += 2;}
			Prey.bornBoar(randForSex, row, col, randForType);
		}
	}

	static bornDeer(randForSex, row, col, randForType){
		if(map[row][col] === undefined){
			let sex = "", child, type = '';
			(randForSex == 1) ? sex = "woman" : (randForSex == 2) ? sex = "man" : sex = undefined;
			(randForType == 3) ? type = "deer" : type = undefined;
			child = new Deer(sex, row, col, type);
			preys.push(child);	
		}
		else{
			row++; col++;
			if(col >= 69 || row <= 0) {col -= 2; row += 2;}
			Prey.bornDeer(randForSex, row, col, randForType);
		}
	}

	static bornHorse(randForSex, row, col, randForType){
		if(map[row][col] === undefined){
			let sex = "", child, type = '';
			(randForSex == 1) ? sex = "woman" : (randForSex == 2) ? sex = "man" : sex = undefined;
			(randForType == 4) ? type = "horse" : type = undefined;
			child = new Horse(sex, row, col, type);
			preys.push(child);	
		}
		else{
			row++; col++;
			if(col >= 69 || row <= 0) {col -= 2; row += 2;}
			Prey.bornHorse(randForSex, row, col, randForType);
		}
	}

	static die(x, y){
		console.log(`Before: ${x}, ${y}`);
		if (map[x][y]) {
			console.log(map[x][y]);
			let obj = map[x][y];
			let by_X = obj.row, by_Y = obj.col;
			preys.forEach((item, index) => {
				if(item.row == by_X && item.col == by_Y){
					preys.slice(index, 1);
					preys[index] = null;
					map[x][y] = undefined;
				}
			})
			let filtered = preys.filter((item) => item !== null);
			preys = filtered;
			console.log(preys);
		} else {
			console.log("No prey found at coordinates (" + x + "," + y + ")");
		}
	}

	get allPreys(){
		return preys;
	}

	get numberOfPreys(){
		return howMuchPreys;
	}
}

/*--------------------------------Move-------------------------------- */
class MovePrey extends Prey{
	constructor(sex, row, col, type) {
		super(sex, row, col, type);
	}

	static bornAnAnimal(sex, x, y, type){
		if(type == 1) Prey.bornRabbit(sex, x, y, type);
		else if(type == 2) Prey.bornBoar(sex, x, y, type);
		else if(type == 3) Prey.bornDeer(sex, x, y, type);
		else if(type == 4) Prey.bornHorse(sex, x, y, type);
	}

	static move(){
		let k = 0, flag = 0, thisIter = howMuchPreys - 1;
		while(flag != howMuchPreys){
			let x = preys[k].row, y = preys[k].col, sex = preys[k].sex, type = preys[k].type, rand = Manager.randomNumb(1,4);

			if(sex == 'man') sex = 2;
			else if(sex == 'woman') sex = 1;

			if(type == 'rabbit') type = 1;
			else if(type == 'boar') type = 2;
			else if(type == 'deer') type = 3;
			else if(type == 'horse') type = 4;

			if(preys[k] == map[x][y]){
				switch (rand) {
					case 1: //goBack
							map[x][y] = undefined;
							if(y >= 69) y -= 2;
							y++;
							if(map[x][y] !== undefined){
								y -= 2;
								if(y >= 69) y -= 2;
							}
							MovePrey.bornAnAnimal(sex, x, y, type);
							preys.shift();
							map[x][y] = preys[thisIter];
							flag++;
							break;

					case 2: //goLeft
							map[x][y] = undefined;
							if(x <= 0) x += 2;
							x--;
							if(map[x][y] !== undefined){
								x += 2;
								if(x <= 0) x += 2;
							}
							MovePrey.bornAnAnimal(sex, x, y, type);
							preys.shift();
							map[x][y] = preys[thisIter];
							flag++;
							break;

					case 3: //goStraight
							map[x][y] = undefined;
							if(y <= 0) y += 2;
							y--;
							if(map[x][y] !== undefined){
								y += 2;
								if(y <= 0) y += 2;
							}
							MovePrey.bornAnAnimal(sex, x, y, type);
							preys.shift();
							map[x][y] = preys[thisIter];
							flag++;
							break;

					case 4: //goRight
							map[x][y] = undefined;
							if(x >= 69) x -= 2;
							x++;
							if(map[x][y] !== undefined){
								x -= 2;
								if(x >= 69) x -= 2;
							}
							MovePrey.bornAnAnimal(sex, x, y, type);
							preys.shift();
							map[x][y] = preys[thisIter];
							flag++;
							break;
				}
			}
		}
	}
}