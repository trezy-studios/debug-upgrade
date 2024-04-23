/**
 * @typedef {object} OverworldBlockConnections
 * @property {boolean} [bottom] Whether the block is connected to conduit at the bottom.
 * @property {boolean} [left] Whether the block is connected to conduit at the left.
 * @property {boolean} [right] Whether the block is connected to conduit at the right.
 * @property {boolean} [top] Whether the block is connected to conduit at the top.
 */

/**
 * @typedef {object} OverworldBlock
 * @property {string} name The name of the block.
 * @property {string} [section] The name of the section to which this block belongs.
 * @property {string[]} [prerequisite] A list of block names which must be completed before this block is available.
 * @property {OverworldBlockConnections} [connections] A mapping of conduit-connected sides.
 * @property {string[]} links A list of block names to which this block will be linked.
 * @property {'boss' | 'junction' | 'level' | 'lock' | 'router'} type The type of this block.
 * @property {{
 * 	x: number,
 * 	y: number,
 * }} position The coordinates of this block.
 */
export const OverworldBlock = {}
