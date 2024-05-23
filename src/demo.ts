import * as BABYLON from "@babylonjs/core";
import { Tetris } from "./logicalTetris";

const engine = new BABYLON.Engine(document.getElementById('renderCanvas') as HTMLCanvasElement, true);

function createScene(): BABYLON.Scene {

    const scene = new BABYLON.Scene(engine);

    const light = new BABYLON.SpotLight("light", new BABYLON.Vector3(50, 300, 200), new BABYLON.Vector3(0, -1, -1), Math.PI / 2, 0.1, scene);

    const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(50, 300, 70), scene);
    camera.rotation = new BABYLON.Vector3(1.5, 0, 0)

    const bottom = BABYLON.MeshBuilder.CreateBox("bottom", { width: 110, height: 50, depth: 1 }, scene);
    bottom.position = new BABYLON.Vector3(45, 15, -5);

    return scene;
}

//set background color to a shade similar to the login form
const scene = createScene();
engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener('resize', () => {
    engine.resize();
});

var color = document.getElementById('loginCol')!.style.backgroundColor;
var colors = color.split(',');
var r = parseFloat(colors[0].substring(color.indexOf('(') + 1));
var g = parseFloat(colors[1])
var b = parseFloat(colors[2])
scene.clearColor = new BABYLON.Color4(r / 255, g / 255, b / 255, 0.5);

var game = new Tetris();

var gameData = game.getGameData();

for (let i = 0; i < gameData.map.sizeZ; i++) {
    for (let j = 0; j < gameData.map.sizeX; j++) {
        var block = BABYLON.MeshBuilder.CreateBox(`block_${j}_${i}`, { width: 10, height: 10, depth: 10 }, scene);
        block.position = new BABYLON.Vector3(j * 10, 0, i * 10);
        var mat = new BABYLON.StandardMaterial(`block_${j}_${i}_mat`, scene);
        mat.alpha = 0;
        block.material = mat;
    }
}

game.updateEvent.on('mapUpdate', () => {
    gameData = game.getGameData();
    for (let i = 0; i < gameData.map.sizeZ; i++) {
        for (let j = 0; j < gameData.map.sizeX; j++) {
            var mat = scene.getMeshByName(`block_${j}_${i}`)!.material as BABYLON.StandardMaterial;
            mat.alpha = gameData.map.data[i][j].r + gameData.map.data[i][j].g + gameData.map.data[i][j].b !== 0 ? 0.9 : 0
            mat.diffuseColor = new BABYLON.Color3(gameData.map.data[i][j].r, gameData.map.data[i][j].g, gameData.map.data[i][j].b);;
            mat.specularColor = mat.diffuseColor;
        }
    }
});

game.start();
game.attachInput();
