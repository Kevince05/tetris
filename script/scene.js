var createScene = function() {

    var scene = new BABYLON.Scene(engine);

    var light = new BABYLON.HemisphericLight('light_main', new BABYLON.Vector3(0, 2, 0), scene);

    var meshes = BABYLON.SceneLoader.ImportMesh(null, 'assets/', 'scene.glb', scene);

    var camera = new BABYLON.ArcRotateCamera('camera_main', -0.4455, 1.0890, 64.9261, new BABYLON.Vector3(-10.010, -8.475, -8.950), scene);

    return scene;
}