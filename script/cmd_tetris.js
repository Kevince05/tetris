class Map {
    constructor(updateDelta) {
        this.width = 10;
        this.height = 20 + 4;//padding for smooth shape adding
        this.updateDelta = updateDelta;
        this.map = [];
        this.shapes = {//ready to 
            o: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
            ],
            i: [
                [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 0, 0, 0, 0, 0]
            ],
            l: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 3, 0, 0, 0, 0]
            ],
            j: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
                [0, 0, 0, 0, 4, 4, 0, 0, 0, 0]
            ],
            t: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
                [0, 0, 0, 5, 5, 5, 0, 0, 0, 0]
            ],
            z: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 6, 6, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 6, 6, 0, 0, 0, 0]
            ],
            s: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
                [0, 0, 0, 7, 7, 0, 0, 0, 0, 0]
            ],
        };
        this.currentShape = null;
        this.nextShape = null;
        this.gameLoop = null;
    }

    init() {
        for (let i = 0; i < this.height; i++) {
            this.map.push([]);
            for (let j = 0; j < this.width; j++) {
                this.map[i].push({ val: 0, fixed: true });
            }
        }
        this.currentShape = Object.keys(this.shapes)[Math.floor(Math.random() * Object.keys(this.shapes).length)];
        this.nextShape = Object.keys(this.shapes)[Math.floor(Math.random() * Object.keys(this.shapes).length)];
    }

    draw() {
        console.clear();
        this.map.forEach((row) => {
            console.log(row.map((cell) => cell.val).join(''));
        });
    }

    updateGravity() {
        for (let i = this.height - 2; i >= 0; i--) {
            for(let j = 0; j < this.width; j++){
                if(!this.map[i][j].fixed && this.map[i + 1][j].val == 0){
                    [this.map[i][j], this.map[i + 1][j]] = [this.map[i + 1][j], this.map[i][j]];
                }   
            }
        }
    }
    checkCollision() {
        for (let i = this.height - 2; i >= 0; i--) {
            for (let j = 0; j < this.width; j++) {
                if (!this.map[i][j].fixed && this.map[i + 1][j].fixed) {
                    return true;
                }
            }
        }
        return false;
    }

    addShape() {
        let shape = this.shapes[this.currentShape]
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                this.map[i][j] = { val: shape[i][j], fixed: shape[i][j] == 0 };
            }
        }
    }

    start() {
        this.init();
        this.addShape();
        this.gameLoop = setInterval(() => {
            this.updateGravity();
            if(this.checkCollision()){
                this.updateGravity();
            }else{
                this.addShape();
                this.currentShape = this.nextShape;
                this.nextShape = this.shapes[Object.keys(this.shapes)[Math.floor(Math.random() * Object.keys(this.shapes).length)]];
            }
            this.draw();
        }, this.updateDelta);
    }
}

const map = new Map(500);

map.start();