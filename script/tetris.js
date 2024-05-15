var canvas = document.getElementById('demo');

var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

function createScene() {

    const scene = new BABYLON.Scene(engine);
    scene.enablePhysics(new BABYLON.Vector3(0, 0, -9.81), new BABYLON.CannonJSPlugin(true, 10));

    const light = new BABYLON.HemisphericLight('light_main', new BABYLON.Vector3(0, 2, 0), scene);
    light.intensity = 0.4;

    const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 300, 70), scene);
    camera.rotation = new BABYLON.Vector3(1.5, 0, 0)

    const bottom = BABYLON.MeshBuilder.CreateBox("bottom", { width: 100, height: 50, depth: 1 }, scene);
    bottom.position = new BABYLON.Vector3(0, 15, 0);

    scene.enablePhysics(new BABYLON.Vector3(0, 0, -9.81), new BABYLON.CannonJSPlugin());
    bottom.physicsImpostor = new BABYLON.PhysicsImpostor(bottom, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);

    return scene;
}


var scene = createScene();

const shapes = {
    base: (name) => {
        const center = BABYLON.MeshBuilder.CreateBox("shape_" + name, { width: 10, height: 10, depth: 10 }, null);
        const cube1 = BABYLON.MeshBuilder.CreateBox("cube1_" + name, { width: 10, height: 10, depth: 10 }, null);
        const cube2 = BABYLON.MeshBuilder.CreateBox("cube2_" + name, { width: 10, height: 10, depth: 10 }, null);
        const cube3 = BABYLON.MeshBuilder.CreateBox("cube3_" + name, { width: 10, height: 10, depth: 10 }, null);
        return [center, cube1, cube2, cube3];
    },
    //cc
    //pc
    o: (id) => {
        const base = shapes.base("o_" + id);
        base[0].position = new BABYLON.Vector3(0, 0, 0);
        base[1].position = new BABYLON.Vector3(10, 0, 0);
        base[2].position = new BABYLON.Vector3(0, 0, 10);
        base[3].position = new BABYLON.Vector3(10, 0, 10);
        shape = BABYLON.Mesh.MergeMeshes(base);
        shape.setPivotPoint(new BABYLON.Vector3(10, 0, 10));
        var mat = new BABYLON.StandardMaterial(shape.name, scene);
        mat.diffuseColor = new BABYLON.Color3(250 / 255, 255 / 255, 0);
        shape.material = mat;
        return shape;
    },
    //c
    //p
    //c
    //c
    i: (id) => {
        const base = shapes.base("i_" + id);
        base[0].position = new BABYLON.Vector3(0, 0, 0);
        base[1].position = new BABYLON.Vector3(0, 0, 10);
        base[2].position = new BABYLON.Vector3(0, 0, -10);
        base[3].position = new BABYLON.Vector3(0, 0, -20);
        shape = BABYLON.Mesh.MergeMeshes(base);
        shape.setPivotPoint(new BABYLON.Vector3(0, 0, 0));
        var mat = new BABYLON.StandardMaterial(shape.name, scene);
        mat.diffuseColor = new BABYLON.Color3(0, 228 / 255, 255 / 255);
        shape.material = mat;
        return shape;
    },
    // cc
    //cp
    s: (id) => {
        const base = shapes.base("s_" + id);
        base[0].position = new BABYLON.Vector3(0, 0, 0);
        base[1].position = new BABYLON.Vector3(-10, 0, 0);
        base[2].position = new BABYLON.Vector3(0, 0, 10);
        base[3].position = new BABYLON.Vector3(10, 0, 10);
        shape = BABYLON.Mesh.MergeMeshes(base);
        shape.setPivotPoint(new BABYLON.Vector3(5, 0, 5));
        var mat = new BABYLON.StandardMaterial(shape.name, scene);
        mat.diffuseColor = new BABYLON.Color3(246 / 255, 0, 0);
        shape.material = mat;
        return shape;
    },
    //cc
    // pc
    z: (id) => {
        const base = shapes.base("z_" + id);
        base[0].position = new BABYLON.Vector3(0, 0, 0);
        base[1].position = new BABYLON.Vector3(0, 0, 10);
        base[2].position = new BABYLON.Vector3(10, 0, 0);
        base[3].position = new BABYLON.Vector3(-10, 0, 10);
        shape = BABYLON.Mesh.MergeMeshes(base);
        shape.setPivotPoint(new BABYLON.Vector3(5, 0, 5));
        var mat = new BABYLON.StandardMaterial(shape.name, scene);
        mat.diffuseColor = new BABYLON.Color3(105 / 255, 182 / 255, 37 / 255);
        shape.material = mat;
        return shape;
    },
    // c
    // p
    // cc
    l: (id) => {
        const base = shapes.base("l_" + id);
        base[0].position = new BABYLON.Vector3(0, 0, 0);
        base[1].position = new BABYLON.Vector3(0, 0, 10);
        base[2].position = new BABYLON.Vector3(0, 0, -10);
        base[3].position = new BABYLON.Vector3(10, 0, -10);
        shape = BABYLON.Mesh.MergeMeshes(base);
        shape.setPivotPoint(new BABYLON.Vector3(5, 0, 5));
        var mat = new BABYLON.StandardMaterial(shape.name, scene);
        mat.diffuseColor = new BABYLON.Color3(250 / 255, 139 / 255, 0);
        shape.material = mat;
        return shape;
    },
    //  c
    //  p
    // cc
    j: (id) => {
        const base = shapes.base("j_" + id);
        base[0].position = new BABYLON.Vector3(0, 0, 0);
        base[1].position = new BABYLON.Vector3(0, 0, -10);
        base[2].position = new BABYLON.Vector3(-10, 0, -10);
        base[3].position = new BABYLON.Vector3(0, 0, 10);
        shape = BABYLON.Mesh.MergeMeshes(base);
        shape.setPivotPoint(new BABYLON.Vector3(5, 0, 5));
        var mat = new BABYLON.StandardMaterial(shape.name, scene);
        mat.diffuseColor = new BABYLON.Color3(255 / 255, 81 / 255, 188 / 255);
        shape.material = mat;
        return shape;
    },
    // c
    //cpc
    t: (id) => {
        const base = shapes.base("t_" + id);
        base[0].position = new BABYLON.Vector3(0, 0, 0);
        base[1].position = new BABYLON.Vector3(-10, 0, 0);
        base[2].position = new BABYLON.Vector3(10, 0, 0);
        base[3].position = new BABYLON.Vector3(0, 0, 10);
        shape = BABYLON.Mesh.MergeMeshes(base);
        shape.setPivotPoint(new BABYLON.Vector3(5, 0, 5));
        var mat = new BABYLON.StandardMaterial(shape.name, scene);
        mat.diffuseColor = new BABYLON.Color3(159 / 255, 0, 150 / 255);
        shape.material = mat;
        return shape;
    }

}
var nextShape = Object.keys(shapes)[Math.floor(Math.random() * (Object.keys(shapes).length - 1)) + 1];
var currentPiece = null;
var nextID = 0;

function nextPiece() {
    piece = shapes[nextShape](nextID);
    nextID += 1;
    console.log(piece + " - " + nextShape + "-" + nextID);
    piece.position = new BABYLON.Vector3(5, 20, 200);//y offset to not interfeer with newPiece generation
    piece.physicsImpostor = new BABYLON.PhysicsImpostor(piece, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0 }, scene);
    piece.physicsImpostor.registerOnPhysicsCollide(getAllImpostorsExcept(piece), () => {
        currentPiece.physicsImpostor.unregisterOnPhysicsCollide(getAllImpostorsExcept(currentPiece), nextPiece());
        nextPiece();
        //da sistemare: collisione con se stesso
        //da controllare: forma del collider (BoxCollider o MeshCollider)
    });
    currentPiece = piece;
    scene.addMesh(piece);
    nextShape = Object.keys(shapes)[Math.floor(Math.random() * (Object.keys(shapes).length - 1)) + 1];
    console.log("generated: " + nextShape + "-" + nextID);
}

function getAllImpostorsExcept(piece) {
    var ret = [];
    scene.meshes.forEach(mesh => {
        if ((mesh.name.includes("shape") || mesh.name.includes("bottom")) && mesh.name != piece.name) {
            ret.push(mesh.physicsImpostor);
        }
    });
    console.log("Colliders" + ret);
    return ret;

}

function start() {
    nextPiece();
}

function startDemo() {
    nextPiece();
}

var t1sCount = 0;
engine.runRenderLoop(function () {
    scene.render();
    t1sCount += 1 / engine.getFps();
    if (t1sCount >= 1) {
        console.log(currentPiece.position);
        t1sCount = 0;
    }
});

window.addEventListener('resize', function () {
    engine.resize();
});