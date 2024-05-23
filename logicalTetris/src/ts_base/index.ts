class Tetris {

    private readonly pieces: { [key: string]: { shape: [{ x: number, y: number }, { x: number, y: number }, { x: number, y: number }, { x: number, y: number }], color: { r: number, g: number, b: number } } } = {
        'o': {
            shape: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
            color: { r: 1, g: 1, b: 0 },//rgba(254,248,76,255)
        },
        'i': {
            shape: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
            color: { r: 0, g: 1, b: 1 },//rgba(81,225,252,255)
        },
        's': {
            shape: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
            color: { r: 0, g: 1, b: 0 },//rgba(233,61,30,255)
        },
        'z': {
            shape: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 }],
            color: { r: 1, g: 0, b: 0 },//rgba(121,174,61,255)
        },
        'l': {
            shape: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }],
            color: { r: 1, g: 0.5, b: 0 },//rgba(246,146,48,255)
        },
        'j': {
            shape: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
            color: { r: 0, g: 0, b: 1 },//rgba(241,110,185,255)
        },
        't': {
            shape: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
            color: { r: 1, g: 0, b: 1 },//rgba(148,54,146,255)
        }
    }

    private readonly display: HTMLParagraphElement;//debug display
    private map: [[{ r: number, g: number, b: number }]];//2D array of colors ranging from 0.0-1.0
    private readonly mapX: number = 10;
    private readonly mapY: number = 20;
    private readonly mapY_pad: number = 5;
    private currentPiece: { shape: [{ x: number, y: number }, { x: number, y: number }, { x: number, y: number }, { x: number, y: number }], color: { r: number, g: number, b: number } }; //map coordinates of the active piece
    private nextPiece: { shape: [{ x: number, y: number }, { x: number, y: number }, { x: number, y: number }, { x: number, y: number }], color: { r: number, g: number, b: number } }; //relative coordinates of the next piece 
    private rnd_key: string = "";

    constructor(display: HTMLParagraphElement) {
        this.display = display;
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
    }

    //add piece to map in the padding zone
    private addPiece(): void {
        this.currentPiece = JSON.parse(JSON.stringify(this.nextPiece));//deep clone nextPiece to currentPiece
        this.rnd_key = Object.keys(this.pieces)[Math.floor(Math.random() * Object.keys(this.pieces).length)];
        console.log("pieces",this.pieces);        
        console.log("currentPiece",this.currentPiece);
        this.nextPiece = JSON.parse(JSON.stringify(this.pieces[this.rnd_key]));
        console.log("nextPiece",this.rnd_key);
        this.currentPiece.shape.forEach((cube) => {
            cube.x = cube.x + this.mapX / 2 - 1;
            cube.y = cube.y + this.mapY
            console.log(this.currentPiece, cube);
            this.map[cube.y][cube.x] = this.currentPiece.color;
        });
    }

    private show(): void {
        var out = "";
        for (let i = this.mapY + this.mapY_pad - 1; i >= 0; i--) {
            for (let j = 0; j < this.mapX; j++) {
                out += (this.map[i][j].r + this.map[i][j].g + this.map[i][j].b > 0) ? "1" : "0";
            }
            out += "<br>";
        }
        this.display.innerHTML = out;
    }

    private update(): void {
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
                [this.map[cube.y][cube.x], this.map[cube.y - 1][cube.x]] = [this.map[cube.y - 1][cube.x], this.map[cube.y][cube.x]]
                cube.y--;
            });
        } else {
            this.addPiece();
        }
    }

    public start(): void {
        this.addPiece();
        this.show();
        setInterval(() => {
            try {
                this.update();
                this.show();
            }
            catch (e) {
                console.log(e);
                stop();
            }
        }, 500);
    }
}


const game = new Tetris(document.getElementById("debug") as HTMLParagraphElement);
game.start();