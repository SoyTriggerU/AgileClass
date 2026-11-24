//Cargamos el Intellisense
/// <reference path="./types/phaser.d.ts" />

//Importamos la configuración del motor
import {buildConfig} from './core/config.js';
//Importamos las escenas
import { Level1 } from './scenes/Level1.js';

const game = new Phaser.Game(
    buildConfig({
        scenes:[
            //Boot, //Escena de precarga
            //Menu,
            Level1 //,
            //Hud   //lanzar en paralelo la escena de UI
        ]
    })
);