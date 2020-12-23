import World from './World.js';
import WorldInfo from './WorldInfo.js';

//Initializing Config
const config = {
    parent: 'phaser',
    type: Phaser.AUTO,
    pixelArt: true,
    activePointers: 4,
    physics: {
        default: 'arcade'
    },
    scale: {
       // mode: Phaser.Scale.FIT,
        parent: 'phaser',
        width: WorldInfo.width,
        height: WorldInfo.height
    },
    //canvasStyle: 'padding: 0; margin: auto; display: block; position: absolute; top: 0; bottom: 0; left: 0; right: 0;',
    dom: {
        createContainer: true
    },

    scene: [World]

};

const game = new Phaser.Game(config);