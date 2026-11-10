import {LEVEL_SIZE} from "../core/constants.js";


export class Level1 extends Phaser.Scene
{
    constructor()
    {
        super({key:'Level1'});
    }

    preload()
    {
        //Carga assets en memoria
        this.cameras.main.setBackgroundColor('#666');
        this.load.setPath('assets/aprites/backgrounds');
        this.load.image('bg', 'bg_green_tile.png');
    }

    create()
    {
        //Pinta assets en pantalla
        this.add.tileSprite(0, 0, LEVEL_SIZE.LEVEL1_WIDTH, LEVEL_SIZE.LEVEL1_HEIGHT, 'bg').setOrigin(0, 0);
    }

    update()
    {
        //Actualiza assets en pantalla
    }
}