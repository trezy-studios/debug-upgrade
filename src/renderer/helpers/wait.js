/**
 * Waits for a specified amount of time.
 *
 * @param {number} waitLength The amount of time (in milliseconds) to wait.
 */
export async function wait(waitLength) {
	await new Promise(resolve => {
		setTimeout(resolve, waitLength)
	})
}
