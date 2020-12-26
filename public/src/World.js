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
    }

    create() {
        this.snake = new Snake(this);
        this.food = new Block(this, 0, 0, 0xd62424);
        this.spawnFood();
    }

    update(time, delta) {
        if (!this.snake.death) {
            this.frameTime += delta;
            if (this.frameTime >= 60) {
                this.frameTime = this.frameTime - 60;
                this.snake.update(this);
                this.updateSquare();
            }
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
            if (this.snake.isHeadOverlapBody()) {
                this.snake.die();
            }
        }
    }

    spawnFood() {
        const emptySpaces = this.mapSize - this.snake.length;
        var foodSpace = this.randomIntFromInterval(0, emptySpaces);
        var cellY = Math.floor(foodSpace / this.cellsWide);
        var cellX = foodSpace - cellY * this.cellsWide;

        //Naive implementation of food randomization.
        while (this.snake.isCellOverlapBody(cellX, cellY)) {
            foodSpace += 1;
            cellY = Math.floor(foodSpace / this.cellsWide);
            cellX = foodSpace - cellY * this.cellsWide;
        }

        this.food.goto(cellX, cellY);
    }

    randomIntFromInterval(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export default new World();