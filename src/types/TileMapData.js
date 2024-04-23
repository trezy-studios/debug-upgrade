/** @typedef {import('./CoordinateString.js').CoordinateString} CoordinateString */
/** @typedef {import('./Dimensions.js').Dimensions} Dimensions */
/** @typedef {import('./LayerMap.js').LayerMap} LayerMap */
/** @typedef {import('./TileConfig.js').TileConfig} TileConfig */
/** @typedef {import('./Tilestack.js').Tilestack} Tilestack */
/** @typedef {import('../renderer/game/TileMap.js').TileMap} TileMap */
/** @typedef {import('../renderer/game/Vector2.js').Vector2} Vector2 */
/** @typedef {import('./Vector2Object.js').Vector2Object} Vector2Object */

/**
 * @typedef {object} TileMapData
 * @property {Vector2Object[]} [destinations] An array of destinations that, if reached, will result in a victory condition.
 * @property {(Vector2Object | Vector2)[]} [destinations] An array of destinations that, if reached, will result in a victory condition.
 * @property {Dimensions} [dimensions] The size of the map (in tiles).
 * @property {LayerMap[]} [layers] An array of layers of tiles.
 * @property {TileMapData[]} [queue] A queue of tilesets.
 * @property {Vector2Object} [startingPosition] The position at which the robot will start.
 * @property {Tilestack} [tilestacks] Tilestacks for each occupied coordinate within the map.
 */
export const TileMapData = {}
