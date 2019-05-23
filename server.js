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
 weather = 'spring';


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
    grassNumber = 300;
    geNumber = 300;
    predatorNumber = 70;
    meatNumber = 10;
    hunterNumber = 30;
    spaceCount = 0;
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

function changeWeather(){
    if(weather == 'spring'){
        setTimeout(function(){
            weather = 'summer';
        }, 6000);
    }
    else if(weather == 'summer'){
        setTimeout(function(){
            weather = 'autumn';
        }, 6000);
    }
    else if(weather == 'autumn'){
        setTimeout(function(){
            weather = 'winter';
        }, 6000);
    }
    else if(weather == 'winter'){
        setTimeout(function(){
            weather = 'spring';
        }, 6000);
    }
    io.sockets.emit('exanak', weather);
}


//matrixi stexcum yst objectneri
for (var y = 0; y < n; y++) {
    for (var x = 0; x < m; x++) {

        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
            grassNumber++;
        }
        else if (matrix[y][x] == 2) {
            var ge = new GrassEater(x, y, 2);
            geArr.push(ge);
            geNumber++;
        }
        else if (matrix[y][x] == 3) {
            var pr = new Predator(x, y, 3);
            predatorArr.push(pr);
            predatorNumber++;
        }
        else if (matrix[y][x] == 4) {
            var hunter = new Hunter(x, y, 4);
            hunterArr.push(hunter);
            hunterNumber++;
        }
        else if (matrix[y][x] == 5) {
            var meat = new Meat(x, y, 5);
            meatArr.push(meat);
            meatNumber++;

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
        predatorArr[i].move1();
        predatorArr[i].move2();
        predatorArr[i].eat();
        predatorArr[i].eatMeat2();
        predatorArr[i].mul();
        predatorArr[i].die();
    }
    for (var i in hunterArr) {
        hunterArr[i].move1();
        hunterArr[i].move2();
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
        socket.on('clear', function(){
            for (var y = 0; y < matrix.length; y++) {
                for (var x = 0; x < matrix[y].length; x++) {
                    matrix[y][x] = 0;
                    matrix[5][10] = 50;
                    matrix[6][10] = 50;
                    matrix[7][10] = 50;
                    matrix[8][10] = 50;
                    matrix[9][10] = 50;
                    matrix[10][10] = 50;
                    matrix[11][10] = 50;
                    matrix[8][11] = 50;
                    matrix[8][12] = 50;
                    matrix[8][13] = 50;
                    matrix[8][14] = 50;
                    matrix[5][14] = 50;
                    matrix[6][14] = 50;
                    matrix[7][14] = 50;
                    matrix[8][14] = 50;
                    matrix[9][14] = 50;
                    matrix[10][14] = 50;
                    matrix[11][14] = 50;
                    matrix[5][17] = 50;
                    matrix[7][17] = 50;
                    matrix[8][17] = 50;
                    matrix[9][17] = 50;
                    matrix[10][17] = 50;
                    matrix[11][17] = 50;
                }
            }
            grassArr.length = 0;
            geArr.length = 0;
            hunterArr.length = 0;
            meatArr.length = 0;
            predatorArr.length = 0;
        });
        socket.on('refresh', function(){
            grassArr.length = 0;
            geArr.length = 0;
            hunterArr.length = 0;
            meatArr.length = 0;
            predatorArr.length = 0;
            matrix = genMatrix(n, m);
            for (var y = 0; y < n; y++) {
                for (var x = 0; x < m; x++) {
            
                    if (matrix[y][x] == 1) {
                        var gr = new Grass(x, y, 1);
                        grassArr.push(gr);
                        grassNumber++;
                    }
                    else if (matrix[y][x] == 2) {
                        var ge = new GrassEater(x, y, 2);
                        geArr.push(ge);
                        geNumber++;
                    }
                    else if (matrix[y][x] == 3) {
                        var pr = new Predator(x, y, 3);
                        predatorArr.push(pr);
                        predatorNumber++;
                    }
                    else if (matrix[y][x] == 4) {
                        var hunter = new Hunter(x, y, 4);
                        hunterArr.push(hunter);
                        hunterNumber++;
                    }
                    else if (matrix[y][x] == 5) {
                        var meat = new Meat(x, y, 5);
                        meatArr.push(meat);
                        meatNumber++;
            
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
        });
    });
}
//----------------------

var  obj = {'info': []};

function main(){
    var file = 'Statistics.json';
    obj.info.push({'Cnvac xoter': grassNumber, 'Cnvac Xotakerner': geNumber, 'Cnvac Gishatichner': predatorNumber, 'Cnvac Vorsordner': hunterNumber, 'Cnvac Mser': meatNumber, 'Space Number': spaceCount});
    fs.writeFileSync(file, JSON.stringify(obj,null,3));
    var data = {
    'num1': grassNumber,
    'num2': geNumber,
    'num3': predatorNumber,
    'num4': hunterNumber,
    'num5': meatNumber,
    'num6': spaceCount
    };
    io.on('connection', function (socket) {
        socket.emit('info', data);
    });
}

io.on('connection', function (socket) {
    socket.on('clear', function(s){
        spaceCount = s;
    });
});


setInterval(drawMatrix, 500);
setInterval(changeWeather, 6000);
setInterval(main, 3000);