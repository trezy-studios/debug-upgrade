// Local imports
import { store } from '../store.js'





/**
 * Traverses back through the stack to the last time the requested scene was open.
 *
 * @param {import('../../data/SCENES.js').SCENES} scene The key of the scene to return to.
 */
export function backToScene(scene) {
	if (!scene) {
		throw new Error('scene name is required')
	}

	store.set(previousState => {
		const { sceneHistory } = previousState

		const reversedSceneHistory = [...sceneHistory].reverse()

		const reversedSceneIndex = reversedSceneHistory.indexOf(scene)

		if (reversedSceneIndex === -1) {
			throw new Error(`Scene (${scene}) doesn't exist in scene history.`)
		}

		const sceneIndex = sceneHistory.length - 1 - reversedSceneIndex

		const newSceneHistory = sceneHistory.slice(0, sceneIndex)
		newSceneHistory.push(scene)

		return {
			sceneHistory: newSceneHistory,
		}
	})
}
