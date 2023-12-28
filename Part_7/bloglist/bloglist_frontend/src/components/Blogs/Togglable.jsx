import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { PrimaryButton, SecondaryButton } from '../style/Buttons'

import { motion, AnimatePresence } from 'framer-motion'

const TogglableDiv = styled.div`
	width: fit-content;
	margin: 0.5em 0;
	overflow: hidden;
`
const XButton = styled(SecondaryButton)`
	border-bottom: 0;
	border-radius: 5px 5px 0 0;
	padding: 0.4em 1em;
	&:hover {
		opacity: 0.9;
	}
`

const Togglable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false)

	const toggleVisibility = () => {
		setVisible(!visible)
	}
	useImperativeHandle(refs, () => {
		return {
			toggleVisibility,
		}
	})

	return (
		<TogglableDiv>
			<AnimatePresence mode="wait" initial={false}>
				{!visible && (
					<motion.div
						key="button"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { duration: 0.1 } }}
						exit={{ opacity: 0, transition: { duration: 0.1 } }}>
						<PrimaryButton onClick={toggleVisibility}>
							{props.buttonLabel}
						</PrimaryButton>
					</motion.div>
				)}
				{visible && (
					<motion.div
						key="content"
						initial={{ height: '31px' }}
						animate={{ height: 'auto' }}
						exit={{ height: '31px', opacity: 0 }}
						transition={{ duration: 0.2 }}>
						<XButton onClick={toggleVisibility}>
							<i className="fa-solid fa-x"></i>
						</XButton>
						{props.children}
					</motion.div>
				)}
			</AnimatePresence>
		</TogglableDiv>
	)
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
