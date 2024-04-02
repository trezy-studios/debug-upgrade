// Module imports
import fs from 'node:fs/promises'
import path from 'node:path'





// Local imports
import { getAppDataPath } from './getAppDataPath.js'





/**
 * Creates all necessary directories on the local machine.
 *
 * @param {*} _
 * @param {string[]} saveIDs An array of IDs for save files to be retrieved.
 * @returns {Promise<import('../../types/SaveData.js').SaveData[]>} The new save's data.
 */
export async function handleGetSaves(_, saveIDs) {
	const appDirectory = getAppDataPath()
	const saveDataPath = path.resolve(appDirectory, 'saves')
	const saves = []

	let saveFiles

	if (!saveIDs) {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		saveFiles = await fs.readdir(saveDataPath)
	} else {
		saveFiles = saveIDs.map(saveID => `${saveID}.json`)
	}

	for (const saveFile of saveFiles) {
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
