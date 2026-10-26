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
        //this.load.image('birdAnim','assets/sprites/birdAnim.png');
        this.load.spritesheet('birdAnim','assets/sprites/birdAnim.png',{frameWidth:17,frameHeight:12});
    };

    create()
    {
        //Draw assets in screen
        //this.add.image(0,0,'bg').setOrigin(0);
        this.bg = this.add.tileSprite(0,0,config.width,config.height,'bg').setOrigin(0);

        //this.bird = this.add.image(config.width/2,config.height/2,'bird').setScale(0.15);
        this.birdA = this.add.sprite(config.width/2,config.height/2,'birdAnim').setScale(5);

        this.loadAnimationRich();
        this.birdA.anims.play('fly',true);

        /*
        this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        */
       this.cursores = this.input.keyboard.createCursorKeys();
       this.input.keyboard.on('keydown-SPACE', () => { this.scene.start('gameState2'); });
       this.tecla2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    };

    loadAnimationRich()
    {
        this.anims.create(
        {
            key:'fly',
            frames:this.anims.generateFrameNumbers('birdAnim',{start:0,end:2}),
            repeat:-1,
            frameRate:5,
            yoyo:true,
        }
        );
    }

    update()
    {
        this.bg.tilePositionX += 2;
        //this.bird.angle += 1;

        if (this.tecla2.isDown) { this.scene.start('gameState2'); }

        //if(this.key_right.isDown)
        if (this.cursores.right.isDown) { this.birdA.x += gamePrefs.heroSpeed; }
        
        else
        //if(this.key_left.isDown)
        if (this.cursores.left.isDown) { this.birdA.x -= gamePrefs.heroSpeed; }
        
        else
        //if(this.key_up.isDown)
        if (this.cursores.up.isDown) { this.birdA.y -= gamePrefs.heroSpeed; }
        
        else
        //if(this.key_down.isDown)
        if (this.cursores.down.isDown) { this.birdA.y += gamePrefs.heroSpeed; }
    };
}