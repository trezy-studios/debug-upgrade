// Local imports
import { IPCBridge } from '../../helpers/IPCBridge.js'





/**
 * Retrieves data for all saves.
 *
 * @returns {Promise<import('../../../types/SaveData.js').SaveData[]>} An array of data from all saves.
 */
export function getAllSaves() {
	return IPCBridge.getAllSaves()
}
