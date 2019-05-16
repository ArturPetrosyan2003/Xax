//serveri stexcum
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static('.'));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log('port is running');
});
//----------------------


//popoxakanner
 Grass = require('./module/grass.js');
 GrassEater = require('./module/grassEater.js');
 Predator = require('./module/predator.js');
 Hunter = require('./module/hunter.js');
 Meat = require('./module/meat.js');



grassArr = [];
geArr = [];
predatorArr = [];
hunterArr = [];
meatArr = [];

n = 50;
m = 50;
//----------------------

Random = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
//matrixi generacum
function genMatrix(n, m) {
    var matrix = [];
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
        y = Math.floor(Math.random() * n);
        x = Math.floor(Math.random() * m);
        var rect = matrix[y][x];
        if (rect == 0) {
            matrix[y][x] = 1;
            grassNumber--;
        }

    }
    while (meatNumber > 0) {
        y = Math.floor(Math.random() * n);
        x = Math.floor(Math.random() * m);
        var rect = matrix[y][x];
        if (rect == 0) {
            matrix[y][x] = 5;
            meatNumber--;
        }

    }
    while (hunterNumber > 0) {
        y = Math.floor(Math.random() * n);
        x = Math.floor(Math.random() * m);
        var rect = matrix[y][x];
        if (rect == 0) {
            matrix[y][x] = 4;
            hunterNumber--;
        }

    }
    while (geNumber > 0) {
        y = Math.floor(Math.random() * n);
        x = Math.floor(Math.random() * m);
        var rect = matrix[y][x];
        if (rect == 0) {
            matrix[y][x] = 2;
            geNumber--;
        }

    }
    while (predatorNumber > 0) {
        y = Math.floor(Math.random() * n);
        x = Math.floor(Math.random() * m);
        var rect = matrix[y][x];
        if (rect == 0) {
            matrix[y][x] = 3;
            predatorNumber--;
        }

    }
    return matrix;
}
//----------------------


//matrixi haytararum
matrix = genMatrix(n, m);
//----------------------


//matrixi stexcum yst objectneri
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
//----------------------


//objectneri methodner
function drawMatrix() {
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
    //matrixi uxxarkum
    io.sockets.emit('matrix', matrix);
    //----------------------
    io.on('connection', function (socket) {
        socket.on('clear', function(data){
            geNumber = 0;
            geArr = [];
        });
    });
}
//----------------------

setInterval(drawMatrix, 500);