import * as BABYLON from "@babylonjs/core";
import {Tetris} from "./logicalTetris";

function createScene(canvas : HTMLCanvasElement): BABYLON.Scene {
    const engine = new BABYLON.Engine(canvas, true);

    const scene = new BABYLON.Scene(engine);
    scene.enablePhysics(new BABYLON.Vector3(0, 0, -9.81), new BABYLON.CannonJSPlugin(true, 10));

    const light = new BABYLON.HemisphericLight('light_main', new BABYLON.Vector3(0, 2, 0), scene);
    light.intensity = 0.8;

    const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 300, 70), scene);
    camera.rotation = new BABYLON.Vector3(1.5, 0, 0)

    const bottom = BABYLON.MeshBuilder.CreateBox("bottom", { width: 100, height: 50, depth: 1 }, scene);
    bottom.position = new BABYLON.Vector3(0, 15, 0);

    return scene;
}

//set background color to a shade similar to the login form
var scene = createScene(document.getElementById('renderCanvas') as HTMLCanvasElement);
var color = document.getElementById('loginCol')!.style.backgroundColor;
var colors = color.split(',');
var r = parseFloat(colors[0].substring(color.indexOf('(') + 1));
var g = parseFloat(colors[1])
var b = parseFloat(colors[2])
scene.clearColor = new BABYLON.Color4(r, g, b, 1);

var game = new Tetris();

game.updateEvent.on('mapUpdate', () => {
    
});
