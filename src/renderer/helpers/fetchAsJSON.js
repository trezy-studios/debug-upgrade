/**
 * Fetches a JSON file and parses it automatically.
 *
 * @param {string} url The URL being requested.
 * @param {RequestInit} [options] Options to be passed to the fetch call.
 * @returns {Promise<object>} The contents of the requested JSON file.
 */
export async function fetchAsJSON(url, options) {
	const response = await fetch(url, options)
	return response.json()
}
