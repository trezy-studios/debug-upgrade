/**
 * @typedef {{
 *  lvl01: number | boolean,
 *  lvl02: number | boolean,
 *  lvl03: number | boolean,
 *  lvl04: number | boolean,
 *  lvl05: number | boolean,
 *  lvl06: number | boolean,
 *  lvl07: number | boolean,
 *  lvl08: number | boolean,
 *  lvl09: number | boolean,
 *  lvl10: number | boolean,
 *  lvl11: number | boolean,
 *  lvl12: number | boolean,
 *  lvl13: number | boolean,
 *  lvl14: number | boolean,
 *  lvl15: number | boolean,
 *  lvl16: number | boolean,
 *  lvl17: number | boolean,
 *  lvl18: number | boolean,
 *  lvl19: number | boolean,
 *  lvl20: number | boolean,
 *  lvl21: number | boolean,
 *  lvl22: number | boolean,
 *  lvl23: number | boolean,
 *  lvl24: number | boolean,
 *  lvl25: number | boolean,
 *  lvl26: number | boolean,
 *  lvl27: number | boolean,
 *  lvl28: number | boolean,
 *  lvl29: number | boolean,
 *  lvl30: number | boolean,
 *  section02Boss: number | boolean,
 *  section03Boss: number | boolean,
 *  section04Boss: number | boolean,
 * }} CampaignData
 */

/**
 * @typedef {{}} UpgradeData
 */

/**
 * @typedef {object} SaveData
 * @property {string} id A unique identifier for the save.
 * @property {number} createdAt A timestamp representing the time the save was created.
 * @property {CampaignData} campaign A mapping of campaign progress.
 * @property {string} lastLevelAccessed The ID of the last level that was loaded.
 * @property {number} [size] Size of the file in bytes.
 * @property {number} updatedAt A timestamp representing the last time the save was updated.
 * @property {UpgradeData} upgrades A mapping of upgrades that have been unlocked.
 */
export const SaveData = {}
