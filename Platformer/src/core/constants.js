/**
 * Constantes globales del juego.
 * No dependen de Phaser ni de instancias específicas.
 * Son Valores inmutables qeu describen el "mundo" del juego.
 */

export const GAME_SIZE = 
{
    WIDTH: 960,
    HEIGHT: 540
};

export const LEVEL_SIZE =
{
    LEVEL1_WIDTH: 1280,     // 40 * 32
    LEVEL1_HEIGHT: 800      // 25 * 32
};

export const PHYSICS =
{
    TYPE: 'arcade',
    GRAVITY: 1000,
    DEBUG: true
};

export const RENDER =
{
    PIXEL_ART: true
};