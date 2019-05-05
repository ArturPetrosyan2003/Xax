class Hunter extends LivingCreatore{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
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
        return super.chooseCell(character);
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