var matrix = [];
var side = 15;
var grassArr = [];
var geArr = [];
var predatorArr = [];
var hunterArr = [];
var meatArr = [];
var n = 50;
var m = 50;
function setup() {
    for (var y = 0; y < n; y++) {
        matrix[y] = [];
        for (var x = 0; x < m; x++) {
            matrix[y][x] = 0;
        }
    }
    var grassNumber = 300;
    var geNumber = 150;
    var predatorNumber = 130;
    var meatNumber = 10;
    var hunterNumber = 30;
    while (grassNumber > 0) {
        y = int(random(0, n));
        x = int(random(0, m));
        var rect = matrix[y][x];
        if (rect == 0) {
            matrix[y][x] = 1;
            grassNumber--;
        }

    }
    while (meatNumber > 0) {
        y = int(random(0, n));
        x = int(random(0, m));
        var rect = matrix[y][x];
        if (rect == 0) {
            matrix[y][x] = 5;
            meatNumber--;
        }

    }
    while (hunterNumber > 0) {
        y = int(random(0, n));
        x = int(random(0, m));
        var rect = matrix[y][x];
        if (rect == 0) {
            matrix[y][x] = 4;
            hunterNumber--;
        }

    }
    while (geNumber > 0) {
        y = int(random(0, n));
        x = int(random(0, m));
        var rect = matrix[y][x];
        if (rect == 0) {
            matrix[y][x] = 2;
            geNumber--;
        }

    }
    while (predatorNumber > 0) {
        y = int(random(0, n));
        x = int(random(0, m));
        var rect = matrix[y][x];
        if (rect == 0) {
            matrix[y][x] = 3;
            predatorNumber--;
        }

    }
    for (var y = 0; y < n; y++) {
        for (var x = 0; x < m; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2);
                geArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 3);
                predatorArr.push(pr);
            }
            else if (matrix[y][x] == 4) {
                var hunter = new Hunter(x, y, 4);
                hunterArr.push(hunter);
            }
            else if (matrix[y][x] == 5) {
                var meat = new Meat(x, y, 5);
                meatArr.push(meat);

                setInterval(function () {
                    let i = 0;
                    if (meatArr[i]) {
                        meatArr[i].poxel();
                        i++;
                    }
                }, 4000);

            }

        }
    }
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
}


function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("#ffd39b");
            }
            else if (matrix[y][x] == 5) {
                fill("#ff89df");
            }
            rect(x * side, y * side, side, side);




        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in geArr) {
        geArr[i].move();
        geArr[i].eat();
        geArr[i].mul();
        geArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].eat();
        predatorArr[i].eatMeat2();
        predatorArr[i].mul();
        predatorArr[i].die();
    }
    for (var i in hunterArr) {
        hunterArr[i].move();
        hunterArr[i].eatPred();
        hunterArr[i].eatMeat();
        hunterArr[i].eatGrassEater();
        hunterArr[i].mul();
        hunterArr[i].die();
    }


}



