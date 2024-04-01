// Module imports
import fs from 'node:fs/promises'
import path from 'node:path'





// Local imports
import { getAppDataPath } from './getAppDataPath.js'





/**
 * Creates all necessary directories on the local machine.
 *
 * @returns {Promise<import('../../types/SaveData.js').SaveData[]>} The new save's data.
 */
export async function handleGetAllSaves() {
	const appDirectory = getAppDataPath()
	const saveDataPath = path.resolve(appDirectory, 'saves')

	// eslint-disable-next-line security/detect-non-literal-fs-filename
	const allSaveFiles = await fs.readdir(saveDataPath)
	const saves = []

	for (const saveFile of allSaveFiles) {
		const saveFilePath = path.resolve(saveDataPath, saveFile)

		const [
			fileStats,
			saveFileData,
		] = await Promise.all([
			// eslint-disable-next-line security/detect-non-literal-fs-filename
			fs.stat(saveFilePath),
			// eslint-disable-next-line security/detect-non-literal-fs-filename
			fs.readFile(saveFilePath, 'utf8'),
		])

		const parsedSaveFileData = JSON.parse(saveFileData)
		parsedSaveFileData.size = fileStats.size
		saves.push(parsedSaveFileData)
	}

	return saves
}
