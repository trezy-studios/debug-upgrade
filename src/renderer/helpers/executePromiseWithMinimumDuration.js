/**
 * @callback PromiseFunction
 * @returns {Promise}
 */
/**
 * Executes a promise, preventing resolution until after the minimum duration has passed.
 *
 * @param {Promise | PromiseFunction} promise The promise to be executed.
 * @param {number} minimumDuration The minimum duration of the promise.
 * @returns {Promise<*>} The result of the executed promise.
 */
export function executePromiseWithMinimumDuration(promise, minimumDuration) {
	const startedAt = performance.now()

	return new Promise(resolve => {
		if (typeof promise === 'function') {
			promise = promise()
		}

		// eslint-disable-next-line promise/catch-or-return
		promise.then(result => {
			const remainingDuration = minimumDuration - (performance.now() - startedAt)

			// eslint-disable-next-line promise/always-return
			if (remainingDuration) {
				setTimeout(() => resolve(result), remainingDuration)
			} else {
				resolve(result)
			}
		})
	})
}
