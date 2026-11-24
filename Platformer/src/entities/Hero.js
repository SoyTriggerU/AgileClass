import { HERO } from "../core/constants.js";

export class Hero extends Phaser.Physics.Arcade.Sprite
{
	constructor(_scene,_posX,_posY)
	{
		super(_scene,_posX,_posY,'hero');
		_scene.add.existing(this);
		_scene.physics.world.enable(this);

		_scene.anims.create(
			{
				key: 'run_hero',
				frames:_scene.anims.generateFrameNumbers('hero', {start:2, end:5}),
				frameRate: 10,
				repeat: -1
			});

		this.cursors = _scene.input.keyboard.createCursorKeys();
		_scene.physics.add.collider(this,_scene.walls);
	}

	update()
	{
		if(this.cursors.left.isDown)
		{ //ME MUEVO A LA IZQUIERDA
			this.body.setVelocityX(-HERO.SPEED); // ← negativo a la izquierda
			this.setFlipX(true);
			this.anims.play('run_hero', true)
		}else
		if(this.cursors.right.isDown)
		{ //ME MUEVO A LA DERECHA
			this.body.setVelocityX(HERO.SPEED);
			this.setFlipX(false);
			this.anims.play('run_hero', true)
		}else
		{
			this.body.setVelocityX(0);
			this.anims.stop();
			this.setFrame(0);
		}

		if(this.cursors.space.isDown
		   //&& this.body.blocked.down)
		   && this.body.onFloor()
		   && Phaser.Input.Keyboard.DownDuration(this.cursors.space,250))
		{
			this.body.setVelocityY(HERO.JUMP_FORCE);
		}
	}
}
