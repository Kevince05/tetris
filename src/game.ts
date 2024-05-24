import {BABYLON, Tetris} from "./Tetris";

const game = new Tetris(new BABYLON.Engine(document.getElementById('renderCanvas') as HTMLCanvasElement, true));
game.start();
game.attachInput();