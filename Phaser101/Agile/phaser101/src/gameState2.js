class gameState2 extends Phaser.Scene
{
    constructor()
    {
        //Calling the scene's constructor
        super({key:"gameState2"});
    }

    preload()
    {
        //Load assets in memory
        this.cameras.main.setBackgroundColor('AAA');
        this.load.image('grass','assets/sprites/grass.png');
        this.load.image('bird','assets/sprites/bird.png');
        this.load.spritesheet('link','assets/sprites/link.png',{frameWidth:120,frameHeight:130});
    };

    create()
    {
        this.grass = this.add.tileSprite(0,0,config.width,config.height,'grass').setOrigin(0);

        this.link = this.add.sprite(config.width/2,config.height/2,'link').setScale(1);

        this.loadAnimationRich();

        this.cursores = this.input.keyboard.createCursorKeys();
        this.tecla1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

        this.teclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.teclaB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

        this.moverLink = true;

        this.velocidad = 3;

        this.anims.create({
            key: 'abajo',
            frames: this.anims.generateFrameNumbers('link',
                { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'izquierda',
            frames: this.anims.generateFrameNumbers('link',
                { start: 10, end: 19 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'arriba',
            frames: this.anims.generateFrameNumbers('link',
                { start: 20, end: 29 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'derecha',
            frames: this.anims.generateFrameNumbers('link',
                { start: 30, end: 39 }),
            frameRate: 10,
            repeat: -1
        });

        this.direccion = 'abajo';
        this.link.anims.play('abajo');
    };

    loadAnimationRich()
    {
        this.anims.create(
        {
            key:'walk',
            frames:this.anims.generateFrameNumbers('link',{start:0,end:2}),
            repeat:-1,
            frameRate:20,
            yoyo:true,
        }
        );
    }

    update()
    {

        if (Phaser.Input.Keyboard.JustDown(this.teclaA)) { this.moverLink = true; }

        if (Phaser.Input.Keyboard.JustDown(this.teclaB)) { this.moverLink = false; }

        if (this.tecla1.isDown) { this.scene.start('gameState'); }

        let dx = 0;
        let dy = 0;

        if (this.cursores.left.isDown) dx = -1;
        else if (this.cursores.right.isDown) dx = 1;

        if (this.cursores.up.isDown) dy = -1;
        else if (this.cursores.down.isDown) dy = 1;

        if (dx < 0) this.direccion = 'izquierda';
        else if (dx > 0) this.direccion = 'derecha';
        else if (dy < 0) this.direccion = 'arriba';
        else if (dy > 0) this.direccion = 'abajo';

        if (dx !== 0 || dy !== 0)
        {
            if (!this.link.anims.currentAnim ||
                this.link.anims.currentAnim.key !== this.direccion)
            {
                this.link.anims.play(this.direccion);
            }

            const longitud = Math.sqrt(dx * dx + dy * dy);
            dx = dx / longitud;
            dy = dy / longitud;

            if (this.moverLink)
            {
                this.link.x += dx * this.velocidad;
                this.link.y += dy * this.velocidad;
            }
            else
            {
                this.grass.tilePositionX += dx * this.velocidad;
                this.grass.tilePositionY += dy * this.velocidad;
            }
        }
        else
        {
            this.link.anims.stop();
        }

        if (this.moverLink)
        {
            this.link.x = Phaser.Math.Clamp(
                this.link.x, 0, config.width
            );

            this.link.y = Phaser.Math.Clamp(
                this.link.y, 0, config.height
            );
        }
    }
}