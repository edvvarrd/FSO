import { motion } from 'framer-motion'

export const MotionSubPage = ({ children }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.2 } }}
			exit={{ opacity: 0, transition: { duration: 0.1 } }}
			transition={{ ease: 'easeIn' }}>
			{children}
		</motion.div>
	)
}
