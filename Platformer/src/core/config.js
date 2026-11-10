import { GAME_SIZE, PHYSICS, RENDER } from "./constants.js";

export function buildConfig({ scenes = [] } = {}) {
    return {
        type: Phaser.AUTO,
        width: GAME_SIZE.WIDTH,
        height: GAME_SIZE.HEIGHT,
        scenes,
        render: RENDER,
        physics: 
        {
            default: PHYSICS.TYPE,
            arcade: 
            {
                gravity: { y: PHYSICS.GRAVITY },
                debug: PHYSICS.DEBUG,
            },
        }
    };
}