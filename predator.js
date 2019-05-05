class Predator extends LivingCreatore{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
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
