// Local imports
import { IPCBridge } from '../../helpers/IPCBridge.js'
import { setSaveData } from './setSaveData.js'





/**
 * Hook for loading assets.
 *
 * @returns {Promise<import('../../../types/SaveData.js').SaveData>} The newly created save data.
 */
export async function createSave() {
	const saveData = await IPCBridge.createSave()

	setSaveData(saveData)

	return saveData
}
