var side = 15;
var socket = io();
var clientWeather = 'spring';

function setup() {
    frameRate(5);
    createCanvas(50 * side, 50 * side);
    background('#acacac');
    socket.on('matrix', drawMatrix);
    socket.on('exanak', drawWeather);
}

socket.on('exanak', function(w){
    clientWeather = w;
    console.log(clientWeather);
});

function drawWeather(w){
    var p = document.getElementById('exanakiP');
    var weather = w;
    if(weather == 'spring'){
        p.innerText = 'Spring';
    }
    else if(weather == 'summer'){
        p.innerText = 'Summer';
    }
    else if(weather == 'autumn'){
        p.innerText = 'Autumn';
    }
    else if(weather == 'winter'){
        p.innerText = 'Winter';
    }

}

function drawMatrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                if(clientWeather == 'summer'){
                    fill("green");
                }
                else if(clientWeather == 'autumn'){
                    fill("#ffd400");
                }
                else if(clientWeather == 'winter'){
                    fill('white');
                }
                else if(clientWeather == 'spring'){
                    fill('#49ff35');
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

function keyPressed(){
    if(keyCode === 32){
        socket.emit('clear');
        console.log(30);
    }
    else if(keyCode === 38){
        socket.emit('set');
        console.log(50);
    }
}





   
    

