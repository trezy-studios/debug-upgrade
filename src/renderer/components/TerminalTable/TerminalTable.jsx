// Module imports
import PropTypes from 'prop-types'





// Local imports
import styles from './TerminalTable.module.scss'





/**
 *
 * @component
 * @param {object} props All props.
 * @param {string[]} props.headings Table headings.
 * @param {string[][]} props.rows An array of table rows.
 */
export function TerminalTable({
	headings,
	rows,
}) {
	return (
		<table className={styles['table']}>
			<thead>
				<tr>
					{headings.map((heading, headingIndex) => (
						<th
							key={headingIndex}
							scope={'col'}>
							{heading}
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{rows.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{row.map((cell, cellIndex) => (
							<td key={cellIndex}>
								{cell}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}

TerminalTable.propTypes = {
	headings: PropTypes.arrayOf(PropTypes.string).isRequired,
	rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
}
