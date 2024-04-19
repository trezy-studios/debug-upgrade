/** @typedef {import('../renderer/game/TileMap.js').TileMap} TileMap */

/**
 * @typedef {object} Vector2Object
 * @property {number} x The position on the horizontal axis.
 * @property {number} y The position on the vertical axis.
 */

/**
 * @typedef {object} Dimensions
 * @property {number} height The height (in tiles) of the map.
 * @property {number} width The width (in tiles) of the map.
 */

/**
 * @typedef {object} TileConfig
 * @property {string} resourcepackID The ID of the resourcepack this tile's sprite is from.
 * @property {string} tileID The ID of the tile sprite within its resourcepack.
 */

/**
 * @typedef {{ [key: string]: TileConfig }} LayerMap
 */

/**
 * @typedef {Map<string, Set<TileConfig>>} Tilestack
 */

/**
 * @typedef {object} TileMapData
 * @property {Vector2Object[]} [destinations] An array of destinations that, if reached, will result in a victory condition.
 * @property {Dimensions} [dimensions] The size of the map (in tiles).
 * @property {LayerMap[]} [layers] An array of layers of tiles.
 * @property {TileMapData[]} [queue] A queue of tilesets.
 * @property {Vector2Object} [startingPosition] The position at which the robot will start.
 * @property {Tilestack} [tilestacks] Tilestacks for each occupied coordinate within the map.
 */
export const TileMapData = {}
