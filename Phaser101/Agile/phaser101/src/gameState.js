class gameState extends Phaser.Scene
{
    constructor()
    {
        //Calling the scene's constructor
        super({key:"gameState"});
    }
    preload()
    {
        //Load assets in memory
        this.cameras.main.setBackgroundColor('AAA');
        this.load.image('bg','assets/sprites/bg.jpg');
        this.load.image('bird','assets/sprites/bird.png');
    };
    create()
    {
        //Draw assets in screen
        this.add.image(0,0,'bg').setOrigin(0);
        this.add.image(config.width/2,config.height/2,'bird').setScale(0.15);
    };
    update(){};
}