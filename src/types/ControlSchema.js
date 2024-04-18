/**
 * @typedef ControlSchema
 * @property {import('../renderer/data/ACTIONS.js').ACTIONS} label The control label.
 * @property {object} mappings Mappings for this control.
 * @property {object} mappings.keyboard Keyboard mappings for this control.
 * @property {string[]} mappings.keyboard.primary The primary keyboard mappings for this control.
 * @property {string[]} mappings.keyboard.secondary The secondary keyboard mappings for this control.
 * @property {number} repeatFrequency How frequently this control can fire (in milliseconds).
 */
export const ControlSchema = {}
