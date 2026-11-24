import { GAME_SIZE,PHYSICS,RENDER } from "./constants.js";

/**
 * Define y devuelve el objeto de configuración con el que instanciaremos el motor de Phaser.
 *
 * Esta función centraliza toda la configuración general del juego (tamaño, escala,
 * renderizado, físicas, etc.) utilizando las constantes definidas en core/constants.js.
 *
 * Recibe como parámetro un objeto que puede incluir un array de escenas.
 * De esta manera, la configuración se mantiene genérica y reutilizable:
 * distintas inicializaciones del juego pueden inyectar diferentes conjuntos de escenas
 * sin modificar este archivo.
 *
 * @param {object} [options={}] - Objeto de opciones para la configuración.
 * @param {Phaser.Scene[]} [options.scenes=[]] - Array de clases de escena a registrar.
 * @returns {Phaser.Types.Core.GameConfig} Configuración lista para pasar a new Phaser.Game().
 */
export function buildConfig ({scenes=[]} = {})
{
    console.log('GAME_SIZE',GAME_SIZE);
    return{
        type: Phaser.AUTO,
        width: GAME_SIZE.WIDTH,
        height: GAME_SIZE.HEIGHT,
        scene: scenes,             //ERROR: habíamos puesto "scenes" y no "scene" y no funcionaba
        render: RENDER,
        physics:{
            default: PHYSICS.TYPE,
            arcade:{
                gravity: {y: PHYSICS.GRAVITY},
                debug: PHYSICS.DEBUG
            }
        }
    };
}