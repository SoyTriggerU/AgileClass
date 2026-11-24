import {ENEMY} from '../../core/constants.js';

export class Slime extends Phaser.Physics.Arcade.Sprite
{
	constructor(_scene,_posX,_posY,_texture='slime')
	{ //Instanciar el objeto
		super(_scene,_posX,_posY,_texture);
		//AÑadir el objeto a la escena y habilitar físicas
		_scene.add.existing(this);
		_scene.physics.world.enable(this);

		//Fisicas basicas (ajustadas a la mecánica/IA del enemigo)
		this.body.setAllowGravity(true);
		this.body.setCollideWorldBounds(false);

		//Cargamos las animaciones
		this.anims.play('run_'+_texture,true);

		//Estado inicial
		this.health = 1;
		this.direction = 1; //1 -> derecha, -1 -> izquierda
		this.body.setVelocityX(ENEMY.SPEED*this.direction);

		//Definir las colisiones
		this.setColliders();
	}

	setColliders()
	{
		if(this.scene.walls)
		{
			this.scene.physics.add.collider
			(
				this,
				this.scene.walls
			)
		}
	}

	preUpdate(time,delta)
	{
		super.preUpdate(time,delta);

		if(this.body.blocked.left || this.body.blocked.right)
		{
			this.direction*=-1;
			this.flipX = !this.flipX;
			this.body.setVelocityX(ENEMY.SPEED*this.direction);
		}
	}
}
