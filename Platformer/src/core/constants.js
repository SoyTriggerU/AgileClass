/**
* Constantes globales del juego.
* No dependen de Phaser ni de instancias específicas.
* Son valores inmutables que describen el "mundo" del juego.
*/

export const GAME_SIZE = 
{
    WIDTH: 960,
    HEIGHT: 540
};

export const HERO = 
{
    SPEED: 200,
    JUMP_FORCE: -450,
    SPIN_SPEED: 360,
    SLIDE_DECEL: 600,
    PROJECTILE_SPEED: 520,
    MAX_LIVES: 7
};

export const LEVEL_SIZE = 
{
    LEVEL1_WIDTH: 1280,  // 40 * 32
    LEVEL1_HEIGHT: 800   // 25 * 32
};

export const PHYSICS = 
{
    TYPE:'arcade',
    GRAVITY: 1000,
    DEBUG: true
};

export const RENDER = 
{
    PIXEL_ART: true
};

export const SCALE = 
{
    MODE: 'FIT',
    AUTO_CENTER: 'CENTER_BOTH',
    ZOOM: 2
}