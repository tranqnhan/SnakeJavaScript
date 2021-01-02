class Test {
    controlSnake(snake) {
        // Initial direction
        if (snake.xDir === 0 && snake.yDir === 0) {
            snake.queueDirection(1, 0);
        }
        //If heading down and on maximum right -> go left 
        else if (snake.yDir === 1) {
            if (snake.head.cellX === 39) {
                snake.queueDirection(-1, 0);
            } else {
                snake.queueDirection(1, 0);
            }
        }
        //If heading right but reach maximum right -> go down
        //or 
        //If heading left and on maximum left -> go down
        else if (snake.xDir != 0 && (snake.head.cellX === 39 || snake.head.cellX === 0)) {
            snake.queueDirection(0, 1);
        }
    }
}

export default new Test();