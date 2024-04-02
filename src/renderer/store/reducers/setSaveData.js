// Local imports
import { store } from '../store.js'





/**
 * Hook for loading assets.
 *
 * @param {import('../../../types/SaveData.js').SaveData} saveData The save daa to be stored.
 */
export function setSaveData(saveData) {
	store.set(() => ({
		mostRecentSaveID: saveData.id,
		saveData,
	}))
}
