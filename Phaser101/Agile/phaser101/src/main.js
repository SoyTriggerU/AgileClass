var config =
{
    type:Phaser.AUTO,
    width:500,
    height:750,
    scene:[gameState], //Array with levels and/or screens
    render: {pixelArt:true}
}

var gamePrefs =
{
    heroSpeed:5,
}

var game = new Phaser.Game(config);