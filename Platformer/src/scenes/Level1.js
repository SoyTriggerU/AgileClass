import { LEVEL_SIZE } from "../core/constants.js";
import { Hero } from "../entities/Hero.js";
import { Jumper } from "../entities/enemies/Jumper.js";
import { Slime } from "../entities/enemies/slime.js";

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
        this.load.spritesheet('slime','slime.png',
        {frameWidth:32,frameHeight:32});
        this.load.spritesheet('jumper','jumper.png',
        {frameWidth:32,frameHeight:32});

        this.load.setPath('assets/tiled/tilesets');
        this.load.image('tileset_walls','tileset_walls.png'); //mantener nombre del TILED
        this.load.image('tileset_moss','tileset_moss.png');   //mantener nombre del TILED


        this.load.setPath('assets/tiled/maps');
        this.load.tilemapTiledJSON('level1','level1.json');


    }
    create()
    { //Pinta assets en pantalla
        //Pintamos el fondo
        this.add.tileSprite(0,0,LEVEL_SIZE.LEVEL1_WIDTH, LEVEL_SIZE.LEVEL1_HEIGHT,'bg').setOrigin(0); 
        //Pintamos el nivel
        //Paso 1: Cargo el JSON
        this.map = this.make.tilemap({key:'level1'});
        //Paso 2: Cargo los tilesets
        // IMPORTANTE: el primer argumento debe coincidir con el "Nombre del tileset" en Tiled.
        // El segundo argumento es la 'key' del asset cargado con this.load.image(...), que cambiamos
        // por el tileset_object del paso previo
        // Si coinciden, puedo dejar sólo 1
        const ts_walls = this.map.addTilesetImage('tileset_walls');
        const ts_moss = this.map.addTilesetImage('tileset_moss');
        //Paso 3:Pinto las CAPAS/LAYERS
        this.walls = this.map.createLayer('level1_layer_walls',ts_walls);
        this.map.createLayer('level1_layer_moss_up',ts_moss);
        this.map.createLayer('level1_layer_moss_left',ts_moss);
        this.map.createLayer('level1_layer_moss_right',ts_moss);
        this.map.createLayer('level1_layer_moss_down',ts_moss);

        //Defino con qué se colisiona en la layer_walls
        //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
        //Ponemos -1, ya que phaser lo interpreta como un 0 en el json
        //this.map.setCollisionBetween(1,11,true,true,'level1_layer_walls'); //Funciona pero no siempre será facil un intervalo
        this.walls.setCollisionByExclusion([-1]);

        this.loadAnimations();

        //this.entry = this.physics.add.sprite(65,268,'entry');
        //this.entry.body.setAllowGravity(false); //No le afecta la gravedad 
        //this.entry.body.setImmovable(true);     //No le afectan fuerzas externas
        this.entry = this.add.sprite(65,268,'entry');
        
        this.hero = new Hero(this,65,100);
        this.jumper = new Jumper(this, 240, 304);
        this.slime = new Slime(this, 320, 304);

        //this.physics.add.collider(this.hero,this.entry);

        //Hacemos que la cámara siga al personaje
        //this.cameras.main.startFollow(this.hero);
        //this.cameras.main.setBounds(0,0,LEVEL_SIZE.LEVEL1_WIDTH,LEVEL_SIZE.LEVEL1_HEIGHT);
        this.cameras.main.startFollow(this.hero).setBounds(0,0,
            LEVEL_SIZE.LEVEL1_WIDTH,LEVEL_SIZE.LEVEL1_HEIGHT);

    }

    loadAnimations()
    {
        this.anims.create(
            {
                key: 'run_jumper',
                frames:this.anims.generateFrameNumbers('jumper', {start:0, end:3}),
                frameRate: 10,
                repeat: -1
            });    

        this.anims.create(
            {
                key: 'run_slime',
                frames:this.anims.generateFrameNumbers('slime', {start:0, end:3}),
                frameRate: 10,
                repeat: -1
            });  
    }

    update()
    { //Actualiza assets en pantalla
        this.hero.update();
    }
}