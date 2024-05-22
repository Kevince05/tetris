var Tetris = /** @class */ (function () {
    function Tetris(display) {
        this.pieces = {
            'o': {
                shape: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
                color: { r: 1, g: 1, b: 0 }, //rgba(254,248,76,255)
            },
            'i': {
                shape: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
                color: { r: 0, g: 1, b: 1 }, //rgba(81,225,252,255)
            },
            's': {
                shape: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
                color: { r: 0, g: 1, b: 0 }, //rgba(233,61,30,255)
            },
            'z': {
                shape: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
                color: { r: 1, g: 0, b: 0 }, //rgba(121,174,61,255)
            },
            'l': {
                shape: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }],
                color: { r: 1, g: 0.5, b: 0 }, //rgba(246,146,48,255)
            },
            'j': {
                shape: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
                color: { r: 0, g: 0, b: 1 }, //rgba(241,110,185,255)
            },
            't': {
                shape: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
                color: { r: 1, g: 0, b: 1 }, //rgba(148,54,146,255)
            }
        };
        this.mapX = 10;
        this.mapY = 20;
        this.mapY_pad = 4;
        this.display = display;
        //init currentPiece and generate nextPiece
        this.currentPiece = { shape: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }], color: { r: 0, g: 0, b: 0 } };
        this.nextPiece = this.pieces[Object.keys(this.pieces)[Math.floor(Math.random() * Object.keys(this.pieces).length)]];
        //init map --> fills with (0,0,0)
        this.map = [{}];
        for (var i = 0; i < this.mapY + this.mapY_pad; i++) {
            this.map[i] = [{}];
            for (var j = 0; j < this.mapX; j++) {
                this.map[i][j] = { r: 0, g: 0, b: 0 };
            }
        }
    }
    //add piece to map in the padding zone
    Tetris.prototype.addPiece = function () {
        var _this = this;
        this.currentPiece = this.nextPiece;
        this.nextPiece = this.pieces[Object.keys(this.pieces)[Math.floor(Math.random() * Object.keys(this.pieces).length)]];
        this.currentPiece.shape.forEach(function (cube) {
            cube.x = cube.x + _this.mapX / 2 - 1;
            cube.y = cube.y + _this.mapY;
            _this.map[cube.y][cube.x] = _this.currentPiece.color;
        });
    };
    Tetris.prototype.show = function () {
        var out = "";
        for (var i = this.mapY + this.mapY_pad - 1; i >= 0; i--) {
            for (var j = 0; j < this.mapX; j++) {
                out += (this.map[i][j].r + this.map[i][j].g + this.map[i][j].b > 0) ? "1" : "0";
            }
            out += "<br>";
        }
        this.display.innerHTML = out;
    };
    Tetris.prototype.update = function () {
        var _this = this;
        var move = true;
        this.currentPiece.shape.forEach(function (cube) {
            //check if there is something below
            //check if this something is the currentPiece himself
            move = (_this.map[cube.y - 1][cube.x].r !== 0 ||
                _this.map[cube.y - 1][cube.x].g !== 0 ||
                _this.map[cube.y - 1][cube.x].b !== 0) && ;
            console.log(move);
            if (move) {
                _this.currentPiece.shape.forEach(function (cube) {
                    _this.map[cube.y][cube.x] = { r: 0, g: 0, b: 0 };
                    cube.y--;
                    _this.map[cube.y][cube.x] = _this.currentPiece.color;
                });
            }
        });
    };
    Tetris.prototype.start = function () {
        var _this = this;
        this.addPiece();
        this.show();
        setInterval(function () {
            _this.update();
            _this.show();
        }, 500);
    };
    return Tetris;
}());
var game = new Tetris(document.getElementById("debug"));
game.start();
