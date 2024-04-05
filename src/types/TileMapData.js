/**
 * @typedef {object} TileConfig
 * @property {string} resourcepackID The ID of the resourcepack this tile's sprite is from.
 * @property {string} tileID The ID of the tile sprite within its resourcepack.
 */

/**
 * @typedef {{ [key: string]: TileConfig }} LayerMap
 */

/**
 * @typedef {object} BaseTileMapData
 * @property {object} dimensions The size of the map (in tiles).
 * @property {number} dimensions.height The height (in tiles) of the map.
 * @property {number} dimensions.width The width (in tiles) of the map.
 * @property {LayerMap[]} tiles An array of layers of tiles.
 */

/**
 * @typedef {object} Destination
 * @property {number} x The cell index on the X axis.
 * @property {number} y The cell index on the Y axis.
 */

/**
 * @typedef {object} TileMapData
 * @mixes BaseTileMapData
 * @property {Destination[]} destinations An array of destinations that, if reached, will result in a victory condition.
 * @property {object} startingPosition The position at which the robot will start.
 * @property {number} startingPosition.x The cell index on the X axis.
 * @property {number} startingPosition.y The cell index on the Y axis.
 * @property {BaseTileMapData[]} queue A queue of tilesets.
 */
export const TileMapData = {}
