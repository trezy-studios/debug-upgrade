// Module imports
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'





// Constants
const VARIANTS = {
	hidden: {
		opacity: 0,
		y: -100,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
}





/**
 * Renders a panel header.
 *
 * @component
 * @param {object} props All props.
 * @param {import('react').ReactNode} [props.children] The component's children.
 */
export function PanelHeader({
	children = null,
}) {
	return (
		<motion.div
			animate={'visible'}
			exit={'hidden'}
			initial={'hidden'}
			variants={VARIANTS}>
			{children}
		</motion.div>
	)
}

PanelHeader.propTypes = {
	children: PropTypes.node,
}
