class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key: "gameState"});
    }

    preload()
    {
        this.cameras.main.setBackgroundColor("113");

        this.load.setPath("assets/sprites");

        this.load.image("bg1", "background_back.png");
        this.load.image("bg2", "background_frontal.png");
        this.load.image("bullet", "spr_bullet_0.png");
        this.load.spritesheet("nave", "naveAnim.png", {frameWidth:16, frameHeight:24});
        
    }

    create()
    {
        this.bg1 = this.add.tileSprite(0, 0, config.width, config.height, "bg1").setOrigin(0);
        this.bg2 = this.add.tileSprite(0, 0, config.width, config.height, "bg2").setOrigin(0);
        this.nave = this.physics.add.sprite(config.width/2, config.height*0.95,'nave').setScale(1);

        this.nave.body.setCollideWorldBounds(true);

        this.loadAnimations();
        
        this.loadPools();

        this.nave.anims.play("idle", true);

        this.cursores = this.input.keyboard.createCursorKeys();

        this.cursores.space.on
        (
            "up", 
            function() 
            {
                this.createBullet();
            },
            this //contexto del this dentro de la funcion pasa a ser el de la escena
        );
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
    }

    createBullet()
    {
        //1. Miro si creo una bala o la reciclo
        var _bullet = this.bulletPool.getFirst(false);

        if(!_bullet)
        {
            //No hay bala a reciclar, ergo, creo una nueva
            console.log('He creado una bala')
            //_bullet = this.add.sprite(this.nave.x, this.nave.body.top, "bullet");
            //Instanciamos el prefab
            _bullet = new bulletPrefab(this, this.nave.x, this.nave.body.top);
            this.bulletPool.add(_bullet);
        }
        else
        {
            //Existe al menos una bala en la pool disponible y la reciclo
            console.log('He reciclado una bala')
            _bullet.setActive(true);
            _bullet.body.reset(this.nave.x, this.nave.body.top);
        }

        //2. Tengo la bala, da igual de donde venga, le doy velocidad
        //Lo quitamos de aqui y me lo llevo al prefab
        _bullet.body.setVelocityY(gamePrefs.BULLET_SPEED);

        //3.Ejecuto un sonido de disparo
        //Lo quito de aqui que aun no lo he puesto y me lo llevo al prefab


        //this.bullet = this.physics.add.sprite(this.nave.x, this.nave.body.top, "bullet");
        //this.bullet.body.setVelocityY(gamePrefs.BULLET_SPEED);
    }

    loadAnimations()
    {
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers('nave', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers('nave', {start: 2, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers('nave', {start: 4, end: 5}),
            frameRate: 10,
            repeat: -1
        });
    }

    update()
    {
        this.bg1.tilePositionY -= 2;
        this.bg2.tilePositionY -= 0.5;

        if(this.cursores.left.isDown) 
        { 
            //this.nave.x -= gamePrefs.NAVE_SPEED; 
            this.nave.body.velocity.x -= gamePrefs.NAVE_SPEED;
            //this.nave.body.setVelocityX(-gamePrefs.NAVE_SPEED);
            this.nave.anims.play("left", true);
        }
        else if(this.cursores.right.isDown) 
        { 
            //this.nave.x += gamePrefs.NAVE_SPEED; 
            this.nave.body.velocity.x += gamePrefs.NAVE_SPEED;
            //this.nave.body.setVelocityX(gamePrefs.NAVE_SPEED);
            this.nave.anims.play("right", true);
        }
        else
        {
            this.nave.anims.play("idle", true);
            //this.nave.body.setVelocityX(0);
        }

        if(this.cursores.space.isUp)
        {
            //this.createBullet();
        }
    }
}