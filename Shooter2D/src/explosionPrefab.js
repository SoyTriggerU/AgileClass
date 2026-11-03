class explosionPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _spriteTag)
    {//instanciar el objeto
        super(_scene, _posX, _posY, _spriteTag)
        _scene.add.existing(this);

        this.anims.play("explosionAnim", true);
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.setActive(false);
        }, _scene);
    }
}