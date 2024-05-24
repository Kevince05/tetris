import * as BABYLON from "@babylonjs/core";

class Tetris {

    private readonly pieces: { [key: string]: { shape: [{ x: number, y: number }, { x: number, y: number }, { x: number, y: number }, { x: number, y: number }], color: { r: number, g: number, b: number } } } = {
        'o': {
            shape: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }],
            color: {
                r: 0.996078431372549,
                g: 0.9725490196078431,
                b: 0.2980392156862745
            },//rgba(254,248,76,255)
        },
        'i': {
            shape: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
            color: {
                r: 0.3176470588235294,
                g: 0.8823529411764706,
                b: 0.9882352941176471
            },//rgba(81,225,252,255)
        },
        's': {
            shape: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
            color: {
                r: 0.9137254901960784,
                g: 0.23921568627450981,
                b: 0.11764705882352941
            },//rgba(233,61,30,255)
        },
        'z': {
            shape: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 }],
            color: {
                r: 0.4745098039215686,
                g: 0.6823529411764706,
                b: 0.23921568627450981
            },//rgba(121,174,61,255)
        },
        'l': {
            shape: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }],
            color: {
                r: 0.9647058823529412,
                g: 0.5725490196078431,
                b: 0.18823529411764706
            },//rgba(246,146,48,255)
        },
        'j': {
            shape: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
            color: {
                r: 0.9450980392156862,
                g: 0.43137254901960786,
                b: 0.7254901960784313
            },//rgba(241,110,185,255)
        },
        't': {
            shape: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
            color: {
                r: 0.5803921568627451,
                g: 0.21176470588235294,
                b: 0.5725490196078431
            },//rgba(148,54,146,255)
        }
    }

    private points: number = 0;//points
    private map: [[{ r: number, g: number, b: number }]];//2D array of colors ranging from 0.0-1.0
    private readonly mapX: number = 10;
    private readonly mapY: number = 20;
    private readonly mapY_pad: number = 5;
    private currentPiece: { shape: [{ x: number, y: number }, { x: number, y: number }, { x: number, y: number }, { x: number, y: number }], color: { r: number, g: number, b: number } }; //map coordinates of the active piece
    private nextPiece: { shape: [{ x: number, y: number }, { x: number, y: number }, { x: number, y: number }, { x: number, y: number }], color: { r: number, g: number, b: number } }; //relative coordinates of the next piece 
    private rnd_key: string = "";
    private updateIntervalID: NodeJS.Timeout;
    private scene: BABYLON.Scene;
    public running: boolean = false;

    constructor(engine: BABYLON.Engine) {
        this.scene = new BABYLON.Scene(engine);

        const light = new BABYLON.SpotLight("light", new BABYLON.Vector3(50, 300, 200), new BABYLON.Vector3(0, -1, -1), Math.PI / 2, 0.1, this.scene);

        const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(50, 300, 70), this.scene);
        camera.rotation = new BABYLON.Vector3(1.5, 0, 0)

        const bottom = BABYLON.MeshBuilder.CreateBox("bottom", { width: 110, height: 50, depth: 1 }, this.scene);
        bottom.position = new BABYLON.Vector3(45, 15, -5);

        //set background color to a shade similar to the login form
        var login = document.getElementById('loginCol');
        if (login !== null) {
            var color = login.style.backgroundColor;
            var colors = color.split(',');
            var r = parseFloat(colors[0].substring(color.indexOf('(') + 1));
            var g = parseFloat(colors[1])
            var b = parseFloat(colors[2])
            this.scene.clearColor = new BABYLON.Color4(r / 255, g / 255, b / 255, 0.5);
        }

        engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    private init(): void {
        //init currentPiece and generate nextPiece
        this.currentPiece = { shape: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }], color: { r: 0, g: 0, b: 0 } };
        this.nextPiece = this.pieces[Object.keys(this.pieces)[Math.floor(Math.random() * Object.keys(this.pieces).length)]];
        //init map --> fills with (0,0,0)
        this.map = [{}] as [[{ r: number, g: number, b: number }]];
        for (let i = 0; i < this.mapY + this.mapY_pad; i++) {
            this.map[i] = [{}] as [{ r: number, g: number, b: number }];
            for (let j = 0; j < this.mapX; j++) {
                this.map[i][j] = { r: 0, g: 0, b: 0 };
            }
        }

        //int 3d this.scene
        for (let i = 0; i < this.mapY; i++) {
            for (let j = 0; j < this.mapX; j++) {
                var block = BABYLON.MeshBuilder.CreateBox(`block_${j}_${i}`, { width: 10, height: 10, depth: 10 }, this.scene);
                block.position = new BABYLON.Vector3(j * 10, 0, i * 10);
                var mat = new BABYLON.StandardMaterial(`block_${j}_${i}_mat`, this.scene);
                mat.alpha = 0;
                block.material = mat;
            }
        }
        this.points = 0;
    }
    //add piece to map in the padding zone
    private addPiece(): void {
        this.currentPiece = JSON.parse(JSON.stringify(this.nextPiece));//deep clone nextPiece to currentPiece
        this.rnd_key = Object.keys(this.pieces)[Math.floor(Math.random() * Object.keys(this.pieces).length)];
        this.nextPiece = JSON.parse(JSON.stringify(this.pieces[this.rnd_key]));
        this.currentPiece.shape.forEach((cube) => {
            cube.x = cube.x + this.mapX / 2 - 1;
            cube.y = cube.y + this.mapY
            this.map[cube.y][cube.x] = this.currentPiece.color;
        });
    }

    private updateGravity(): void {
        var move = true;
        this.currentPiece.shape.forEach(cube => {
            if (cube.y - 1 < 0) {
                move = false;
            } else if (this.map[cube.y - 1][cube.x].r + this.map[cube.y - 1][cube.x].g + this.map[cube.y - 1][cube.x].b !== 0 &&
                this.currentPiece.shape.filter(c => c.x === cube.x && c.y === cube.y - 1).length === 0
            ) {
                move = false;
            }
        });

        if (move) {
            this.currentPiece.shape.forEach(cube => {
                this.map[cube.y][cube.x] = { r: 0, g: 0, b: 0 };
                cube.y--;
                this.map[cube.y][cube.x] = this.currentPiece.color;
            });
            this.updateScene();
        } else {
            this.addPiece();
        }
    }

    private checkGame(): void {
        this.map.forEach((row, i) => {
            if (i === this.mapY) {//doable bc of padding space over the map
                row.forEach((cube, j) => {
                    if (cube.r + cube.g + cube.b !== 0 && this.currentPiece.shape.filter(c => c.x === j && c.y === i).length === 0) {
                        this.stop();
                    }
                });
            }
        });
    }

    private move(direction: boolean): void {
        var move = true;
        this.currentPiece.shape.forEach(cube => {
            if (cube.x + (direction ? 1 : -1) < 0 || cube.x + (direction ? 1 : -1) >= this.mapX) {
                move = false;
            }
        });
        if (move) {
            var cubes: { x: number, y: number }[] = (!direction ? this.currentPiece.shape : this.currentPiece.shape.reverse());//rigira come un calzino in base alla dir, per cambiare l'ordine di parse
            this.currentPiece.shape.forEach(cube => {
                this.map[cube.y][cube.x] = { r: 0, g: 0, b: 0 };
                cube.x += (direction ? 1 : -1);
                this.map[cube.y][cube.x] = this.currentPiece.color;
            });
            this.updateScene();
        }
    }

    private updateScene() {
        for (let i = 0; i < this.mapY; i++) {
            for (let j = 0; j < this.mapX; j++) {
                var mat = this.scene.getMeshByName(`block_${j}_${i}`)!.material as BABYLON.StandardMaterial;
                mat.alpha = this.map[i][j].r + this.map[i][j].g + this.map[i][j].b !== 0 ? 0.9 : 0
                mat.diffuseColor = new BABYLON.Color3(this.map[i][j].r, this.map[i][j].g, this.map[i][j].b);;
                mat.specularColor = mat.diffuseColor;
            }
        }
    }

    public attachInput(): void {
        window.onkeydown = (e) => {
            switch (e.key) {
                case "ArrowRight":
                    this.move(true);
                    break;
                case "ArrowLeft":
                    this.move(false);
                    break;
                case "ArrowDown":
                    this.updateGravity();
                    break;
            }
        }
    }

    public stop(): void {
        clearInterval(this.updateIntervalID);
        this.init();
        this.running = false;
        //document.onkeydown = null;
    }

    public start(): void {
        this.stop();// in case of restart
        this.addPiece();
        this.updateIntervalID = setInterval(() => {
            this.updateGravity();
            this.checkGame();
        }, 1000);
        this.running = true;
    }
}

export { BABYLON, Tetris };