// Local imports
import { executePromiseWithMinimumDuration } from '../../helpers/executePromiseWithMinimumDuration.js'
import { IPCBridge } from '../../helpers/IPCBridge.js'
import { store } from '../store.js'





/**
 * Saves the current save data to disk.
 */
export async function persistSaveData() {
	const { saveData } = store.state

	store.set(() => ({ isSaving: true }))

	await executePromiseWithMinimumDuration(IPCBridge.updateSaveData(saveData), 1000)

	store.set(() => ({ isSaving: false }))
}
