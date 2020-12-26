import World from './World.js';
import Leaderboard from './Leaderboard.js';
import WorldInfo from './WorldInfo.js';

//Initializing Config
const config = {
    parent: 'game',
    type: Phaser.AUTO,
    pixelArt: true,
    activePointers: 4,
    physics: {
        default: 'arcade'
    },
    scale: {
       // mode: Phaser.Scale.FIT,
        parent: 'game',
        width: WorldInfo.width,
        height: WorldInfo.height
    },
    dom: {
        createContainer: true
    },
    scene: [World, Leaderboard]

};

const game = new Phaser.Game(config);

export { game };