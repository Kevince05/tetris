import { BABYLON, Tetris } from "./Tetris";

const game = new Tetris(new BABYLON.Engine(document.getElementById('renderCanvas') as HTMLCanvasElement, true));

var btnStart = document.getElementById('startBtn');
var btnStop = document.getElementById('stopBtn');
btnStart.addEventListener('click', () => {
    if (!game.running) {
        console.log("start")
        game.start();
        game.attachInput();
        btnStart.innerHTML = "Restart";
        btnStop.style.display = "block";
    } else {
        console.log("restart")
        game.start();
    }
});

btnStop.addEventListener('click', () => {
    console.log("stop")
    game.stop();    
    btnStart.innerHTML = "Start";
    btnStop.style.display = "none";
});