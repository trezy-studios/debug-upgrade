/** @typedef {import('pixi.js').ISpritesheetData} ISpritesheetData */
/** @typedef {import('pixi.js').Spritesheet} Spritesheet */
/**
 * @typedef {object} Resourcepack
 * @property {object} meta Metadata describing the resourcepack.
 * @property {string} meta.id The ID of the resourcepack.
 * @property {string} meta.name The human-readable name of the resourcepack.
 * @property {string} meta.robotsData The path to the spritesheet JSON file for the resourcepack's robot sprites.
 * @property {string} meta.robotsImage The path to the spritesheet image file for the resourcepack's robot sprites.
 * @property {{ [key: string]: import('./TileData.js').TileData }} meta.tiles Metadata for the individual tiles within this resourcepack.
 * @property {string} meta.tilesData The path to the spritesheet JSON file for the resourcepack's tile sprites.
 * @property {string} meta.tilesImage The path to the spritesheet image file for the resourcepack's tile sprites.
 * @property {'resourcepacks'} meta.type The type of JSON data this file represents.
 * @property {string} meta.version The version of the resourcepack.
 * @property {ISpritesheetData} robots Spritesheet data for the resourcepack's robot sprites.
 * @property {ISpritesheetData} tiles Spritesheet data for the resourcepack's tile sprites.
 * @property {Spritesheet} tilesSpritesheet Spritesheet for the resourcepack's tile sprites.
 */
export const Resourcepack = {}
