"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tetris = void 0;
var events_1 = require("events");
var Tetris = /** @class */ (function () {
    function Tetris() {
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
                shape: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 }],
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
        this.poitns = 0; //points
        this.mapX = 10;
        this.mapY = 20;
        this.mapY_pad = 5;
        this.rnd_key = "";
        this.updateEvent = new events_1.EventEmitter();
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
        this.currentPiece = JSON.parse(JSON.stringify(this.nextPiece)); //deep clone nextPiece to currentPiece
        this.rnd_key = Object.keys(this.pieces)[Math.floor(Math.random() * Object.keys(this.pieces).length)];
        console.log("pieces", this.pieces);
        console.log("currentPiece", this.currentPiece);
        this.nextPiece = JSON.parse(JSON.stringify(this.pieces[this.rnd_key]));
        console.log("nextPiece", this.rnd_key);
        this.currentPiece.shape.forEach(function (cube) {
            cube.x = cube.x + _this.mapX / 2 - 1;
            cube.y = cube.y + _this.mapY;
            console.log(_this.currentPiece, cube);
            _this.map[cube.y][cube.x] = _this.currentPiece.color;
        });
    };
    Tetris.prototype.updateGravity = function () {
        var _this = this;
        var move = true;
        this.currentPiece.shape.forEach(function (cube) {
            if (cube.y - 1 < 0) {
                move = false;
            }
            else if (_this.map[cube.y - 1][cube.x].r + _this.map[cube.y - 1][cube.x].g + _this.map[cube.y - 1][cube.x].b !== 0 &&
                _this.currentPiece.shape.filter(function (c) { return c.x === cube.x && c.y === cube.y - 1; }).length === 0) {
                move = false;
            }
        });
        if (move) {
            this.currentPiece.shape.forEach(function (cube) {
                var _a;
                _a = [_this.map[cube.y - 1][cube.x], _this.map[cube.y][cube.x]], _this.map[cube.y][cube.x] = _a[0], _this.map[cube.y - 1][cube.x] = _a[1];
                cube.y--;
            });
            this.updateEvent.emit("mapUpdate");
        }
        else {
            this.addPiece();
        }
    };
    Tetris.prototype.checkGame = function () {
        var _this = this;
        this.map.forEach(function (row, i) {
            if (i === _this.mapY) { //doable bc of padding space over the map
                row.forEach(function (cube, j) {
                    if (cube.r + cube.g + cube.b !== 0 && _this.currentPiece.shape.filter(function (c) { return c.x === j && c.y === i; }).length === 0) {
                        _this.stop();
                    }
                });
            }
        });
    };
    Tetris.prototype.move = function (direction) {
        var _this = this;
        var move = true;
        this.currentPiece.shape.forEach(function (cube) {
            if (cube.x + (direction ? 1 : -1) < 0 || cube.x + (direction ? 1 : -1) >= _this.mapX) {
                move = false;
            }
        });
        if (move) {
            var cubes = (!direction ? this.currentPiece.shape : this.currentPiece.shape.reverse()); //rigira come un calzino in base alla dir, per cambiare l'ordine di parse
            this.currentPiece.shape.forEach(function (cube) {
                var _a;
                _a = [_this.map[cube.y][cube.x + (direction ? 1 : -1)], _this.map[cube.y][cube.x]], _this.map[cube.y][cube.x] = _a[0], _this.map[cube.y][cube.x + (direction ? 1 : -1)] = _a[1];
                cube.x += (direction ? 1 : -1);
            });
            this.updateEvent.emit("mapUpdate");
        }
    };
    Tetris.prototype.getMap = function () {
        return this.map;
    };
    Tetris.prototype.stop = function () {
        clearInterval(this.updateIntervalID);
        //document.onkeydown = null;
    };
    Tetris.prototype.start = function () {
        var _this = this;
        this.poitns = 0;
        this.addPiece();
        //document.onkeydown = (e) => {
        //    switch (e.key) {
        //        case "ArrowRight":
        //            this.move(true);
        //            break;
        //        case "ArrowLeft":
        //            this.move(false);
        //            break;
        //        case "ArrowDown":
        //            this.updateGravity();
        //            break;
        //    }
        //
        //}
        this.updateIntervalID = setInterval(function () {
            _this.updateGravity();
            _this.checkGame();
        }, 50);
    };
    return Tetris;
}());
exports.Tetris = Tetris;