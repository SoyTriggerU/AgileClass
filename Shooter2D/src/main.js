var gamePrefs = 
{
    NAVE_SPEED: 2,
    BULLET_SPEED: -100,
    MAX_VIDAS: 4,
    MAX_VIDAS_ENEMY: 2,
    ENEMY_SPEED: 20,
    ENEMY_BULLET_SPEED: 80,
}

var config = 
{
    type: Phaser.AUTO,
    width: 128,
    height: 256,
    scene: [gameState],
    render: 
    { 
        pixelArt: true 
    }, 
    physics:
    {
        default: "arcade",
        arcade:
        {
            gravity: { y: 0 },
            debug: false
        }
    }
}


var juego = new Phaser.Game(config);