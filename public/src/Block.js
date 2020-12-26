import WorldInfo from './WorldInfo.js';

export class Block {
    constructor(scene, cellX, cellY, color) {
        this.block = scene.add.rectangle(
            (cellX + .5) * WorldInfo.cellSize,
            (cellY + .5) * WorldInfo.cellSize,
            WorldInfo.cellSize, WorldInfo.cellSize, color );
        this.cellX = cellX;
        this.cellY = cellY;
    }

    move(xDir, yDir) {
        this.block.x += xDir * WorldInfo.cellSize;
        this.block.y += yDir * WorldInfo.cellSize;
        this.cellX += xDir;
        this.cellY += yDir;
    }

    goto(cellX, cellY) {
        this.cellX = cellX;
        this.cellY = cellY;
        this.block.setPosition((cellX + .5) * WorldInfo.cellSize, (cellY + .5) * WorldInfo.cellSize);
    }

    equals(block) {
        return block.cellX === this.cellX && block.cellY === this.cellY;
    }
}