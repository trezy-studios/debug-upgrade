// Module imports
import fs from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'





// Local imports
import { getAppDataPath } from './getAppDataPath.js'
import packageData from '../../../package.json'





/**
 * Creates all necessary directories on the local machine.
 *
 * @returns {Promise<import('../../types/SaveData.js').SaveData>} The new save's data.
 */
export async function handleCreateSave() {
	const appDirectory = getAppDataPath()
	const createdAt = Date.now()

	const saveData = {
		id: randomUUID(),
		createdAt,
		updatedAt: createdAt,
		version: packageData.version,

		campaign: {
			lvl01: false,
			lvl02: false,
			lvl03: false,
			lvl04: false,
			lvl05: false,
			lvl06: false,
			lvl07: false,
			lvl08: false,
			lvl09: false,
			lvl10: false,
			lvl11: false,
			lvl12: false,
			lvl13: false,
			lvl14: false,
			lvl15: false,
			lvl16: false,
			lvl17: false,
			lvl18: false,
			lvl19: false,
			lvl20: false,
			lvl21: false,
			lvl22: false,
			lvl23: false,
			lvl24: false,
			lvl25: false,
			lvl26: false,
			lvl27: false,
			lvl28: false,
			lvl29: false,
			lvl30: false,
			section02Boss: false,
			section03Boss: false,
			section04Boss: false,
		},
		upgrades: {},
	}

	const saveDataPath = path.resolve(appDirectory, 'saves', saveData.id)

	// eslint-disable-next-line security/detect-non-literal-fs-filename
	await fs.writeFile(saveDataPath, JSON.stringify(saveData), 'utf8')

	return saveData
}
