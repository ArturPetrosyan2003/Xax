var side = 15;
var socket = io();
var clientWeather = 'spring';
let col;
let btn;
var spaceNumber = 0;
let p1;

function setup() {
    frameRate(5);
    createCanvas(50 * side, 50 * side);
    background('#acacac');
    socket.on('matrix', drawMatrix);
    socket.on('exanak', drawWeather);
    socket.on('info', drawInfo);
    col = document.getElementById('col');
    btn = document.getElementById('btn').addEventListener('click', Emit);
    function Emit() {
        socket.emit('refresh');
        document.getElementById('btn').blur();
    }
}




socket.on('exanak', function (w) {
    clientWeather = w;
    console.log(clientWeather);
});

function drawWeather(w) {
    var p = document.getElementById('exanakiP');
    var weather = w;
    if (weather == 'spring') {
        p.innerText = 'Weather: Spring';
    }
    else if (weather == 'summer') {
        p.innerText = 'Weather: Summer';
    }
    else if (weather == 'autumn') {
        p.innerText = 'Weather: Autumn';
    }
    else if (weather == 'winter') {
        p.innerText = 'Weather: Winter';
    }

}

function drawInfo(i){
    p1 = document.getElementById('info1');
    var p2 = document.getElementById('info2');
    var p3 = document.getElementById('info3');
    var p4 = document.getElementById('info4');
    var p5 = document.getElementById('info5');
    var p6 = document.getElementById('info6');
    var info = i;
    p1.innerText = 'Grass Number:' + info.num1;
    p2.innerText = 'Grass Eater Number:' + info.num2;
    p3.innerText = 'Predator Number:' + info.num3;
    p4.innerText = 'Hunter Number:' + info.num4;
    p5.innerText = 'Meat Number:' + info.num5;
    p6.innerText = 'Space Clicks:' + info.num6;
}

function drawMatrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                if (clientWeather == 'summer') {
                    fill("green");
                    col.style.background = 'green';
                    p1.style.background = 'green';
                }
                else if (clientWeather == 'autumn') {
                    fill("#ffd400");
                    col.style.background = '#ffd400';
                    p1.style.background = '#ffd400';
                }
                else if (clientWeather == 'winter') {
                    fill('white');
                    col.style.background = 'white';
                    p1.style.background = 'white';
                }
                else if (clientWeather == 'spring') {
                    fill('#49ff35');
                    col.style.background = '#49ff35';
                    p1.style.background = '#49ff35';
                }
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
            else if (matrix[y][x] == 50) {
                fill("aqua");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

function keyPressed() {
    if (keyCode === 32) {
        spaceNumber++;
        socket.emit('clear', spaceNumber);
        console.log(30);
    }
}








