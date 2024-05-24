import {BABYLON, Tetris} from "./Tetris";

const engine = new BABYLON.Engine(document.getElementById('renderCanvas') as HTMLCanvasElement, true);
const game = new Tetris(engine);

window.addEventListener('resize', () => {
    engine.resize();
});

game.start();