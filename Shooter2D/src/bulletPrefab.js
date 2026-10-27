class bulletPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _spriteTag)
    {
        super(_scene, _posX, _posY, _spriteTag='bullet')
        _scene.add.existing(this);

        //this.body.setVelocityY(gamePrefs.BULLET_SPEED);

        //sonido
    }
    
    preUpdate()
    {
        if(this.y <= 0)
        {
            this.setActive(false);
        }
    }
}