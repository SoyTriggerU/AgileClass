import { HERO, LEVEL_SIZE } from "../core/constants.js";

export class Level1 extends Phaser.Scene
{
    constructor()
    {
        super({key:'Level1'});
    }
    
    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor('#F00');
        
        this.load.setPath('assets/sprites/backgrounds');
        this.load.image('bg','bg_green_tile.png');

        this.load.setPath('assets/sprites/spritesheets');
        this.load.spritesheet('entry','entry.png',
            {frameWidth:32,frameHeight:40});
        this.load.spritesheet('hero','hero.png',
            {frameWidth:32,frameHeight:32});

        this.load.setPath('assets/tiled/tilesets');
        this.load.image('tileset_walls','tileset_walls.png'); //mantener nombre del TILED
        this.load.image('tileset_moss','tileset_moss.png'); //mantener nombre del TILED

        this.load.setPath('assets/tiled/maps');
        this.load.tilemapTiledJSON('level1','level1.json');


    }

    create()
    { //Pinta assets en pantalla
        //Pintamos el fondo
        this.add.tileSprite(0,0,LEVEL_SIZE.LEVEL1_WIDTH, LEVEL_SIZE.LEVEL1_HEIGHT,'bg').setOrigin(0); 
        //Pintamos el nivel
        //Cargo el JSON
        //Paso 1: Cargo el JSON
        this.map = this.make.tilemap({key:'level1'});
        //Paso 2: Cargo los tilesets
        //Cargo los tilesets
        // IMPORTANTE: el primer argumento debe coincidir con el "Nombre del tileset" en Tiled.
        // El segundo argumento es la 'key' del asset cargado con this.load.image(...), que cambiamos
        // por el tileset_objects del paso previo
        // Si coinciden, puedo dejar sólo 1
        const ts_walls = this.map.addTilesetImage('tileset_walls');
        const ts_moss = this.map.addTilesetImage('tileset_moss');
        //Paso 3: Pinto las CAPAS/LAYERS
        this.walls = this.map.createLayer('level1_layer_walls', ts_walls)
        this.map.createLayer('level1_layer_moss_up', ts_moss)
        this.map.createLayer('level1_layer_moss_left', ts_moss)
        this.map.createLayer('level1_layer_moss_right', ts_moss)
        this.map.createLayer('level1_layer_moss_down', ts_moss)

        this.walls.setCollisionByExclusion([-1]);

        this.entry = this.add.sprite(65,268,'entry');

        this.hero = this.physics.add.sprite(65,100,'hero');

        this.cameras.main.startFollow(this.hero);
        this.cameras.main.setBounds(0,0,LEVEL_SIZE.LEVEL1_WIDTH,LEVEL_SIZE.LEVEL1_HEIGHT)

        this.anims.create({
            key: 'hero-idle',
            frames: [{ key: 'hero', frame: 0 }],
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'hero-run',
            frames: this.anims.generateFrameNumbers('hero', { start: 2, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hero-jump',
            frames: [{ key: 'hero', frame: 6 }],
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'hero-crouch',
            frames: [{ key: 'hero', frame: 1 }],
            frameRate: 1,
            repeat: -1
        });
        this.isJumping = false;
        this.isSliding = false;
        this.isCrouching = false;
        this.runParticleTimer = 0;

        const particleTexture = this.add.graphics();
        particleTexture.fillStyle(0xe4d79c, 1);
        particleTexture.fillRect(0, 0, 4, 4);
        particleTexture.generateTexture('heroParticle', 4, 4);
        particleTexture.destroy();

        const projectileTexture = this.add.graphics();
        projectileTexture.fillStyle(0xff9a1f, 1);
        projectileTexture.fillCircle(4, 4, 4);
        projectileTexture.generateTexture('heroProjectile', 8, 8);
        projectileTexture.destroy();

        const explosionTexture = this.add.graphics();
        explosionTexture.fillStyle(0xff7100, 1);
        explosionTexture.fillRect(0, 0, 4, 4);
        explosionTexture.generateTexture('projectileParticle', 4, 4);
        explosionTexture.destroy();

        this.physics.add.collider(this.hero,this.walls);
        this.projectiles = this.physics.add.group();
        this.physics.add.collider(
            this.projectiles,
            this.walls,
            this.handleProjectileWallCollision,
            undefined,
            this
        );

        this.input.on('pointerdown', (pointer) =>
        {
            if (pointer.leftButtonDown() && this.isCrouching)
            {
                this.fireProjectile(pointer);
            }
        });

        this.keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            crouch: Phaser.Input.Keyboard.KeyCodes.S,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

    }

    update(time, delta)
    { //Actualiza assets en pantalla
        const isGrounded = this.hero.body.blocked.down || this.hero.body.touching.down;
        const crouchPressed = this.keys.crouch.isDown && isGrounded && !this.isJumping;

        if (Phaser.Input.Keyboard.JustDown(this.keys.crouch) && crouchPressed && this.hero.body.velocity.x !== 0)
        {
            this.isSliding = true;
            this.hero.setFlipX(this.hero.body.velocity.x < 0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.jump) && isGrounded)
        {
            this.hero.setVelocityY(HERO.JUMP_FORCE);
            this.isJumping = true;
            this.isSliding = false;
            this.jumpDirection = this.hero.flipX ? -1 : 1;
        }

        if (this.isSliding && isGrounded && !this.isJumping)
        {
            const horizontalVelocity = this.hero.body.velocity.x;
            const remainingSpeed = Math.max(
                0,
                Math.abs(horizontalVelocity) - HERO.SLIDE_DECEL * delta / 1000
            );
            this.hero.setVelocityX(Math.sign(horizontalVelocity) * remainingSpeed);

            if (remainingSpeed === 0)
            {
                this.isSliding = false;
            }
        }
        else if (crouchPressed)
        {
            this.hero.setVelocityX(0);
        }
        else
        {
            this.hero.setVelocityX(0);

            if (this.keys.left.isDown)
            {
                this.hero.setVelocityX(-HERO.SPEED);
                this.hero.setFlipX(true);
            }
            else if (this.keys.right.isDown)
            {
                this.hero.setVelocityX(HERO.SPEED);
                this.hero.setFlipX(false);
            }
        }

        const isCrouching = crouchPressed || this.isSliding;
        this.isCrouching = isCrouching;
        const isMoving = this.hero.body.velocity.x !== 0;

        if (isGrounded && isMoving && !this.isJumping)
        {
            this.runParticleTimer += delta;
            if (this.runParticleTimer >= 70)
            {
                this.runParticleTimer %= 70;
                this.spawnDust(1, false);
            }
        }
        else
        {
            this.runParticleTimer = 0;
        }

        if (this.isJumping)
        {
            if (isGrounded && this.hero.body.velocity.y >= 0)
            {
                this.isJumping = false;
                this.hero.setRotation(0);
                this.spawnDust(18, true);
            }
            else
            {
                this.hero.rotation += this.jumpDirection * HERO.SPIN_SPEED * Math.PI / 180 * delta / 1000;
            }
        }

        if (this.isJumping)
        {
            this.hero.anims.play('hero-jump', true);
        }
        else if (isCrouching)
        {
            this.hero.anims.play('hero-crouch', true);
        }
        else if (isGrounded && isMoving)
        {
            this.hero.anims.play('hero-run', true);
        }
        else
        {
            this.hero.anims.play('hero-idle', true);
        }
    }

    spawnDust(count, burst)
    {
        const moveDirection = Math.sign(this.hero.body.velocity.x);

        for (let index = 0; index < count; index++)
        {
            const originX = this.hero.x + (burst ? 0 : Phaser.Math.Between(-8, 8));
            const originY = this.hero.body.bottom - (burst ? 0 : Phaser.Math.Between(0, 4));
            const particle = this.add.image(originX, originY, 'heroParticle');

            let targetX;
            let targetY;
            let duration;
            let delay = 0;

            if (burst)
            {
                const angle = Math.PI + Math.PI * index / (count - 1);
                const distance = Phaser.Math.Between(20, 54);
                targetX = originX + Math.cos(angle) * distance;
                targetY = originY + Math.sin(angle) * distance;
                duration = Phaser.Math.Between(320, 480);
                delay = Phaser.Math.Between(0, 25);
                particle.setScale(Phaser.Math.Between(12, 20) / 10);
            }
            else
            {
                targetX = originX + Phaser.Math.Between(-25, 25) - moveDirection * 25;
                targetY = originY - Phaser.Math.Between(10, 35);
                duration = Phaser.Math.Between(220, 320);
            }

            this.tweens.add({
                targets: particle,
                x: targetX,
                y: targetY,
                alpha: 0,
                scale: 0,
                duration,
                delay,
                ease: 'Quad.Out',
                onComplete: () => particle.destroy()
            });
        }
    }

    fireProjectile(pointer)
    {
        if (!this.isCrouching)
        {
            return;
        }

        const facingLeft = pointer.worldX < this.hero.x;
        this.hero.setFlipX(facingLeft);
        const muzzleX = this.hero.x + (facingLeft ? -12 : 12);
        const muzzleY = this.hero.y + 4;
        const angle = Phaser.Math.Angle.Between(
            muzzleX,
            muzzleY,
            pointer.worldX,
            pointer.worldY
        );
        const originX = muzzleX + Math.cos(angle) * 3;
        const originY = muzzleY + Math.sin(angle) * 3;
        const projectile = this.projectiles.create(originX, originY, 'heroProjectile');

        projectile.setRotation(angle);
        projectile.body.setAllowGravity(false);
        projectile.body.setCircle(4);
        projectile.setVelocity(
            Math.cos(angle) * HERO.PROJECTILE_SPEED,
            Math.sin(angle) * HERO.PROJECTILE_SPEED
        );

        this.time.delayedCall(1800, () =>
        {
            if (projectile.active)
            {
                projectile.destroy();
            }
        });
    }

    handleProjectileWallCollision(projectile)
    {
        if (!projectile.active)
        {
            return;
        }

        const { x, y } = projectile;
        projectile.destroy();
        this.createProjectileExplosion(x, y);
    }

    createProjectileExplosion(x, y)
    {
        const flash = this.add.circle(x, y, 5, 0xffb52e, 0.9);
        this.tweens.add({
            targets: flash,
            scale: 3,
            alpha: 0,
            duration: 180,
            ease: 'Quad.Out',
            onComplete: () => flash.destroy()
        });

        const particleCount = 16;
        const colors = [0xff4d00, 0xff7800, 0xffb52e];

        for (let index = 0; index < particleCount; index++)
        {
            const angle = Math.PI * 2 * index / particleCount;
            const distance = Phaser.Math.Between(18, 46);
            const particle = this.add.image(x, y, 'projectileParticle')
                .setTint(colors[Phaser.Math.Between(0, colors.length - 1)])
                .setScale(Phaser.Math.Between(12, 24) / 10);

            this.tweens.add({
                targets: particle,
                x: x + Math.cos(angle) * distance,
                y: y + Math.sin(angle) * distance,
                alpha: 0,
                scale: 0,
                duration: Phaser.Math.Between(260, 440),
                ease: 'Cubic.Out',
                onComplete: () => particle.destroy()
            });
        }
    }
}