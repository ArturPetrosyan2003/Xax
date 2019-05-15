var livingCreator = require('./livingCreator.js');

module.exports = class Meat extends livingCreator{
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