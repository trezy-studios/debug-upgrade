let testElement

if (!testElement) {
	testElement = document.createElement('div')
	testElement.style.visibility = 'hidden'
	document.body.appendChild(testElement)
}





/**
 * Retrieves the value of a CSS custom property.
 *
 * @param {string} propertyName The name of the property to be retrieved.
 * @returns {string | number} The computed value of the requested custom property.
 */
export function getCSSCustomPropertyValue(propertyName) {
	const targetElement = document.querySelector(':root')
	const targetComputedStyles = getComputedStyle(targetElement)
	const targetPropertyValue = targetComputedStyles.getPropertyValue(`--${propertyName.replace(/--/u, '')}`)

	testElement.style.color = targetPropertyValue
	testElement.style.flexShrink = targetPropertyValue

	const testComputedStyles = getComputedStyle(testElement)

	/** @type {string | number} */
	let result = testComputedStyles.color

	if (!testElement.style.color) {
		result = Number(testComputedStyles.flexShrink)
	}

	testElement.style.color = ''
	testElement.style.flexShrink = ''

	return result
}
