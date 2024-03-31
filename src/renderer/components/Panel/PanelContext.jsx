// Module imports
import {
	createContext,
	useContext,
	useMemo,
	useState,
} from 'react'
import PropTypes from 'prop-types'





export const PanelContext = createContext({
	isLoading: false,
})





/**
 * Provides context to a panel's child components.
 *
 * @component
 */
export function PanelContextProvider(props) {
	const { children } = props

	const [isLoading, setIsLoading] = useState(false)

	const providerState = useMemo(() => {
		return {
			isLoading,
			setIsLoading,
		}
	}, [
		isLoading,
		setIsLoading,
	])

	return (
		<PanelContext.Provider value={providerState}>
			{children}
		</PanelContext.Provider>
	)
}

PanelContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

// eslint-disable-next-line jsdoc/require-jsdoc
export const usePanelContext = () => useContext(PanelContext)
