import { Block } from './Block.js';
import { Snake } from './Snake.js';
import WorldInfo from './WorldInfo.js';

class World extends Phaser.Scene {
    constructor() {
        super({ key: 'world' });
        this.frameTime = 0;

        this.cellsWide = WorldInfo.width / WorldInfo.cellSize;
        this.cellsTall = WorldInfo.height / WorldInfo.cellSize;

        this.mapSize = this.cellsWide * this.cellsTall;

        this.emptyCells = [];
        for (var i = 0; i < this.mapSize; i++) {
            this.emptyCells.push(i);
        } 
    }

    create() {
        this.snake = new Snake(this);
        this.food = new Block(this, 0, 0, 0xd62424);
        this.spawnFood();
    }

    update() {
        if (!this.snake.death) {
            this.snake.update(this);
            this.updateSquare();
        }
    }

    updateSquare() {
        if (this.snake.head.equals(this.food)) {
            this.snake.grow();
            this.spawnFood();
        }

        const headX = this.snake.head.cellX;
        const headY = this.snake.head.cellY;

        if (headX < 0 || headY < 0 || headX > this.cellsWide - 1 || headY > this.cellsTall - 1) {
            this.snake.die();
        } else {
            if (this.snake.isHeadOverlapBody()) {
                this.snake.die();
            }
        }
    }

    removeEmptyCell(cellX, cellY) {
        const space = cellY * this.cellsWide + cellX;
        this.emptyCells.splice(this.emptyCells.indexOf(space), 1);
        // console.log(this.emptyCells.length + " empty spaces left!");
        // console.log("--- " + space + " removed");
    }

    addEmptyCell(cellX, cellY) {
        const space = cellY * this.cellsWide + cellX;
        this.emptyCells.push(space);
        // console.log("+++ " + space + " addded");
    }

    spawnFood() {
        const emptySpaces = this.mapSize - this.snake.length;
        var foodSpace = this.emptyCells[this.randomIntFromInterval(0, emptySpaces)];
        var cellY = Math.floor(foodSpace / this.cellsWide);
        var cellX = foodSpace - cellY * this.cellsWide;

        this.food.goto(cellX, cellY);
    }

    randomIntFromInterval(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export default new World();