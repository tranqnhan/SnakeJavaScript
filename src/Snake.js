import { Block } from './Block.js';
import WorldInfo from './WorldInfo.js';

export class Snake {
    constructor(scene) {
        this.xDir = 0;
        this.yDir = 0;

        this.queueXDir = 0;
        this.queueYDir = 0;

        const head = new Block(scene, 5, 2, 0x3BB143);
        this.blocks = [head];
        this.length = 4;
        this.death = false;

        //console.log("Snake created!");
        //WASD D62424
        scene.input.keyboard.on('keydown-W', (event) => { this.queueDirection(0, -1); });
        scene.input.keyboard.on('keydown-A', (event) => { this.queueDirection(-1, 0); });
        scene.input.keyboard.on('keydown-S', (event) => { this.queueDirection(0, 1); });
        scene.input.keyboard.on('keydown-D', (event) => { this.queueDirection(1, 0); });
    }


    queueDirection(x, y) {
        this.queueXDir = x;
        this.queueYDir = y;
    }

    changeDirection(x, y) {
        if (x / -1 != this.xDir) {
            this.xDir = x;   
        }
        if (y / -1 != this.yDir) {
            this.yDir = y;
        }
    }

    grow() {
        this.length += 1;
    }

    die() {
        this.death = true;
    }

    update(scene) {

        this.changeDirection(this.queueXDir, this.queueYDir);

        if (!(this.xDir == 0 && this.yDir == 0)) {
            // If the number of blocks != length, add new block
            if (this.blocks.length < this.length) {
                const curLength = this.blocks.length;
                const lastBlock = this.blocks[curLength - 1];
                this.blocks.push(new Block(scene, lastBlock.cellX, lastBlock.cellY, 0x3BB143));
            }

            // Move the blocks position to the block position infront
            for (var i = this.blocks.length - 1; i > 0; i--) {
                const nextBlock = this.blocks[i - 1];
                this.blocks[i].goto(nextBlock.cellX, nextBlock.cellY);
            }


            this.blocks[0].move(this.xDir, this.yDir);
        }
    }
}