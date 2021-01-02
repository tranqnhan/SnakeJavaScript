import { Block } from './Block.js';
import { gameOver, updateLength } from './HTMLUpdate.js';

export class Snake {
    constructor(scene) {
        this.xDir = 0;
        this.yDir = 0;

        this.queueXDir = 0;
        this.queueYDir = 0;

        this.head = new Block(scene, 1, 1, 0x3BB143);
        scene.removeEmptyCell(this.head.cellX, this.head.cellY);

        this.blocks = [];
        this.length = 1;
        this.death = false;

        updateLength(this.length);

        //console.log("Snake created!");
        //WASD
        scene.input.keyboard.on('keydown-W', (event) => { this.queueDirection(0, -1); });
        scene.input.keyboard.on('keydown-A', (event) => { this.queueDirection(-1, 0); });
        scene.input.keyboard.on('keydown-S', (event) => { this.queueDirection(0, 1); });
        scene.input.keyboard.on('keydown-D', (event) => { this.queueDirection(1, 0); });

        //Arrow Keys
        scene.input.keyboard.on('keydown-UP', (event) => { this.queueDirection(0, -1); });
        scene.input.keyboard.on('keydown-LEFT', (event) => { this.queueDirection(-1, 0); });
        scene.input.keyboard.on('keydown-DOWN', (event) => { this.queueDirection(0, 1); });
        scene.input.keyboard.on('keydown-RIGHT', (event) => { this.queueDirection(1, 0); });

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
        updateLength(this.length);
    }

    die() {
        this.death = true;
        gameOver(this.length);
    }

    isHeadOverlapBody() {
        for (var i = 1; i < this.blocks.length; i++) {
            if (this.blocks[0].equals(this.blocks[i])) {
                return true;
            }
        }
        return false;
    }

    update(scene) {
        this.changeDirection(this.queueXDir, this.queueYDir);

        if (!(this.xDir == 0 && this.yDir == 0)) {
            scene.addEmptyCell(this.head.cellX, this.head.cellY);
            // If the number of blocks != length, add new block
            if (this.blocks.length < this.length - 1) {
                const newBlock = new Block(scene, this.head.cellX, this.head.cellY, 0x3BB143);
                this.blocks.unshift(newBlock);
                scene.removeEmptyCell(newBlock.cellX, newBlock.cellY);
            }
            else if (this.blocks.length > 0) {
                const lastBlock = this.blocks.pop();
                scene.addEmptyCell(lastBlock.cellX, lastBlock.cellY);
                lastBlock.goto(this.head.cellX, this.head.cellY);
                scene.removeEmptyCell(this.head.cellX, this.head.cellY);
                this.blocks.unshift(lastBlock);
            }
            this.head.move(this.xDir, this.yDir);
            scene.removeEmptyCell(this.head.cellX, this.head.cellY);
        }
    }
}