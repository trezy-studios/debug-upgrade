// Local imports
import { CenterPanel } from '../CenterPanel/CenterPanel.jsx'
import { LeftPanel } from '../LeftPanel/LeftPanel.jsx'
import { PanelsLayout } from '../PanelsLayout/PanelsLayout.jsx'
import { Scene } from '../Scene/Scene.jsx'





// Constants
const VARIANTS = {
	animate: {
		opacity: 1,
		transition: {
			duration: 0,
		},
	},

	exit: {
		opacity: 0,
	},

	initial: {
		opacity: 0,
	},
}





export function MainScene() {
	return (
		<Scene
			key={'main'}
			animate={'animate'}
			exit={'exit'}
			initial={'initial'}
			variants={VARIANTS}>
			<PanelsLayout>
				<LeftPanel />
				<CenterPanel />
			</PanelsLayout>
		</Scene>
	)
}
