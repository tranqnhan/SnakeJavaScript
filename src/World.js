import { Block } from './Block.js';
import { Snake } from './Snake.js';
import WorldInfo from './WorldInfo.js';

class World extends Phaser.Scene {
    constructor() {
        super({ key: 'world' });
        this.frameTime = 0;

        this.cellsWide = WorldInfo.width / WorldInfo.cellSize;
        this.cellsTall = WorldInfo.height / WorldInfo.cellSize;

        //Number of squares;
        (this.map = []).length = this.cellsWide * this.cellsTall; 
        this.map.fill(WorldInfo.noneCell);
    }

    create() {
        //this.add.grid(WorldInfo.width / 2, WorldInfo.height / 2, WorldInfo.width, WorldInfo.height, WorldInfo.cellSize, WorldInfo.cellSize); 
        this.snake = new Snake(this);
        this.food = new Block(this, 0, 0, 0xd62424);
        this.spawnFood();
        //this.input.keyboard.on('keydown-P', (event) => { this.record = !this.record });
    }

    update(time, delta) {
        if (!this.snake.death) {
            this.frameTime += delta;
            if (this.frameTime >= 400) {
                this.frameTime = this.frameTime - 400;
                this.snake.update(this);
                this.updateMap();
                this.updateSquare();
            }
        }
    }

    updateMap() {
        this.map.fill(WorldInfo.noneCell);

        if (this.food != null) {
            const index = this.food.cellY * this.cellsWide + this.food.cellX;
            this.map[index] = WorldInfo.foodCell;
        }

        for (var i = 1; i < this.snake.blocks.length; i++) {
            const block = this.snake.blocks[i];
            const index = block.cellY * this.cellsWide + block.cellX;
            this.map[index] = WorldInfo.snakeCell;
        }
    }

    updateSquare() {
        if (this.snake.blocks[0].equals(this.food)) {
            this.snake.grow();
            this.spawnFood();
        }

        const headX = this.snake.blocks[0].cellX;
        const headY = this.snake.blocks[0].cellY;

        if (headX < 0 || headY < 0 || headX > this.cellsWide - 1 || headY > this.cellsTall - 1) {
            this.snake.die();
        } else {
            const index = headY * this.cellsWide + headX;
            if (this.map[index] === WorldInfo.snakeCell) {
                this.snake.die();
            }
        }
    }

    spawnFood() {
        const emptySpaces = this.map.length - this.snake.length;
        const foodSpace = this.randomIntFromInterval(0, emptySpaces);
        //console.log(foodSpace);
        var spaceCount = 0;
        for (var i = 0; i < this.map.length; i++) {
            if (this.map[i] === WorldInfo.noneCell) {
                spaceCount++;
                if (spaceCount === foodSpace) {
                    this.map[i] = WorldInfo.foodCell;
                    const cellY = Math.floor(foodSpace / this.cellsWide);
                    const cellX = foodSpace - cellY * this.cellsWide;
                    this.food.goto(cellX, cellY);  
                }
            }
        }
    }

    randomIntFromInterval(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // printMap() {
    //     var c = "";
    //     var d = 0;
    //     console.log(this.snake.head.cellX + " " + this.snake.head.cellY);
    //     for (var i = 0; i < this.cellsWide; i++) {
    //         var c = "";
    //         for (var v = 0; v < this.cellsTall; v++) {
    //             c += this.map[d];
    //             d++;
    //         }
    //         console.log(c);
    //     }
    //     console.log("----------------------------------------");
    // }
}

export default new World();