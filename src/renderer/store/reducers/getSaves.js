// Local imports
import { IPCBridge } from '../../helpers/IPCBridge.js'





/**
 * Retrieves data for all saves.
 *
 * @param {string[]} [saveIDs] An array of IDs to load save data for.
 * @returns {Promise<import('../../../types/SaveData.js').SaveData[]>} An array of data from all saves.
 */
export function getSaves(saveIDs) {
	return IPCBridge.getSaves(saveIDs)
}
