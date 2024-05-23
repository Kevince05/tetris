"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BABYLON = require("babylonjs");
var logicalTetris_1 = require("./logicalTetris");
function createScene(canvas) {
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    scene.enablePhysics(new BABYLON.Vector3(0, 0, -9.81), new BABYLON.CannonJSPlugin(true, 10));
    var light = new BABYLON.HemisphericLight('light_main', new BABYLON.Vector3(0, 2, 0), scene);
    light.intensity = 0.8;
    var camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 300, 70), scene);
    camera.rotation = new BABYLON.Vector3(1.5, 0, 0);
    var bottom = BABYLON.MeshBuilder.CreateBox("bottom", { width: 100, height: 50, depth: 1 }, scene);
    bottom.position = new BABYLON.Vector3(0, 15, 0);
    return scene;
}
//set background color to a shade similar to the login form
var scene = createScene(document.getElementById('renderCanvas'));
var color = document.getElementById('loginCol').style.backgroundColor;
var colors = color.split(',');
var r = parseFloat(colors[0].substring(color.indexOf('(') + 1));
var g = parseFloat(colors[1]);
var b = parseFloat(colors[2]);
scene.clearColor = new BABYLON.Color4(r, g, b, 1);
var game = new logicalTetris_1.Tetris();
game.updateEvent.on('mapUpdate', function () {
});
