class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 2 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }

}


class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var vandakner = random(this.chooseCell(0));

        if (vandakner) {
            this.energy--;
            var newX = vandakner[0];
            var newY = vandakner[1];

            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }

    }
    eat() {


        var xoter = random(this.chooseCell(1));
        if (xoter) {
            this.energy += 3;
            var newX = xoter[0];
            var newY = xoter[1];

            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;

        }

    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 15 && newCell) {
            var ge = new GrassEater(newCell[0], newCell[1], this.index);
            geArr.push(ge);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in geArr) {
                if (this.x == geArr[i].x && this.y == geArr[i].y) {
                    geArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}


class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {

        var vandakner = random(this.chooseCell(0));
        if (vandakner) {
            this.energy--;
            var newX = vandakner[0];
            var newY = vandakner[1];

            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }

    }
    eat() {
        var xotakerner = random(this.chooseCell(2));
        if (xotakerner) {
            this.energy += 3;
            var newX = xotakerner[0];
            var newY = xotakerner[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            for (var i in geArr) {
                if (newX == geArr[i].x && newY == geArr[i].y) {
                    geArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;

        }

    }

    eatMeat2() {
        var meat = random(this.chooseCell(5));
        if (meat) {
            this.energy += 3;

            var newX = meat[0];
            var newY = meat[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            for (var i in meatArr) {
                if (newX == meatArr[i].x && newY == meatArr[i].y) {
                    meatArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;

        }

    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 12 && newCell) {
            var ge = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(ge);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 8;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}



class Hunter {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],

            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 1, this.y + 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]

        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {

        var vandakner = random(this.chooseCell(0));
        if (vandakner) {
            this.energy--;

            var newX = vandakner[0];
            var newY = vandakner[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            this.x = newX;
            this.y = newY;
        }

    }
    eatPred() {
        var pred = random(this.chooseCell(3));
        if (pred) {

            var newX = pred[0];
            var newY = pred[1];

            matrix[newY][newX] = 5;
            var meat = new Meat(newX, newY, 5);
            meatArr.push(meat);

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }


        }
    }
    eatGrassEater() {
        var ge = random(this.chooseCell(2));
        if (ge) {
            var newX = ge[0];
            var newY = ge[1];


            matrix[newY][newX] = 5;

            var meat = new Meat(newX, newY, 5);
            meatArr.push(meat);
            for (var i in geArr) {
                if (newX == geArr[i].x && newY == geArr[i].y) {
                    geArr.splice(i, 1);
                    break;
                }
            }
        }
    }
    eatMeat() {
        var meat = random(this.chooseCell(5));
        if (meat) {
            var newX = meat[0];
            var newY = meat[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in meatArr) {
                if (newX == meatArr[i].x && newY == meatArr[i].y) {
                    meatArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy += 2;
        }
    }
    mul() {
        var vandakner = random(this.chooseCell(0));
        if (vandakner && this.energy >= 100) {
            var hunter = new Hunter(vandakner[0], vandakner[1], this.index);
            hunterArr.push(hunter);
            matrix[vandakner[1]][vandakner[0]] = 4;
            this.energy = 8;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in hunterArr) {
                if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                    hunterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}



class Meat {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
    }

    poxel() {
        matrix[this.y][this.x] = 2;

        var ge = new GrassEater(this.x, this.y, this.index);
        geArr.push(ge);

        for (var i in meatArr) {
            if (this.x == meatArr[i].x && this.y == meatArr[i].y) {
                meatArr.splice(i, 1);
                break;
            }
        }
    }
}