var canvas = document.getElementById('demo');

var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

var scene = createScene();

var color = document.getElementById('loginCol').style.backgroundColor;
colors = color.split(',');
r = parseFloat(colors[0].substring(color.indexOf('(') + 1));
g = parseFloat(colors[1])
b = parseFloat(colors[2])
scene.clearColor = new BABYLON.Color3(r / 255, g / 255, b / 255);

scene.activeCamera.useAutoRotationBehavior = true;

const xSlide = new BABYLON.Animation("xSlide", "position.x", engine.getFps(), BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
const ySlide = new BABYLON.Animation("ySlide", "position.y", engine.getFps(), BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
const zSlide = new BABYLON.Animation("zSlide", "position.z", engine.getFps(), BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
const keyFrames = [{
        frame: 0,
        value: 0,
    },
    {
        frame: engine.getFps(),
        value: 5,
    },
    {
        frame: 2 * engine.getFps(),
        value: 10,
    }
];

xSlide.setKeys(keyFrames);




engine.runRenderLoop(function() {
    scene.render();
});
// the canvas/window resize event handler
window.addEventListener('resize', function() {
    engine.resize();
});