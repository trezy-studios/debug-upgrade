/**
 * Retrieves the current scene from the history stack.
 *
 * @param {import('statery').IState} state The current global state.
 * @returns {import('../../data/SCENES.js').SCENES} The current scene.
 */
export function getCurrentScene(state) {
	return state.sceneHistory.at(-1)
}
