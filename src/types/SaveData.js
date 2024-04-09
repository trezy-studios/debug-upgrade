/**
 * @typedef {{
 *  lvl01: boolean,
 *  lvl02: boolean,
 *  lvl03: boolean,
 *  lvl04: boolean,
 *  lvl05: boolean,
 *  lvl06: boolean,
 *  lvl07: boolean,
 *  lvl08: boolean,
 *  lvl09: boolean,
 *  lvl10: boolean,
 *  lvl11: boolean,
 *  lvl12: boolean,
 *  lvl13: boolean,
 *  lvl14: boolean,
 *  lvl15: boolean,
 *  lvl16: boolean,
 *  lvl17: boolean,
 *  lvl18: boolean,
 *  lvl19: boolean,
 *  lvl20: boolean,
 *  lvl21: boolean,
 *  lvl22: boolean,
 *  lvl23: boolean,
 *  lvl24: boolean,
 *  lvl25: boolean,
 *  lvl26: boolean,
 *  lvl27: boolean,
 *  lvl28: boolean,
 *  lvl29: boolean,
 *  lvl30: boolean,
 *  section02Boss: boolean,
 *  section03Boss: boolean,
 *  section04Boss: boolean,
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
