class enemyPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _spriteTag='enemy')
    {//instanciar el objeto
        super(_scene, _posX, _posY, _spriteTag)
        _scene.add.existing(this);

        this.setOrigin(0,1);
        this.health=gamePrefs.MAX_VIDAS_ENEMY;
        this.anims.play("idleEnemy", true);
        console.log(this);
    }

    preUpdate(time,delta)
    {
        if(this.y > config.height+this.height)
        {
            this.setActive(false);
        }
        super.preUpdate(time,delta);
    }
}