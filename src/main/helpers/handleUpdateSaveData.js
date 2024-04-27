// Module imports
import fs from 'node:fs/promises'
import path from 'node:path'





// Local imports
import { getAppDataPath } from './getAppDataPath.js'





/**
 * Updates a save file.
 *
 * @param {*} _
 * @param {import('../../types/SaveData.js').SaveData} saveData The updates save data.
 */
export async function handleUpdateSaveData(_, saveData) {
	saveData.updatedAt = Date.now()

	const appDirectory = getAppDataPath()
	const saveDataPath = path.resolve(appDirectory, 'saves', saveData.id)

	// eslint-disable-next-line security/detect-non-literal-fs-filename
	await fs.writeFile(saveDataPath, JSON.stringify(saveData), 'utf8')
}
