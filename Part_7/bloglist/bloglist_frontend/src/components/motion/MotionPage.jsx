import { motion } from 'framer-motion'

export const MotionPage = ({ children }) => {
	return (
		<motion.div
			initial={{ x: 100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -100, opacity: 0 }}
			transition={{ duration: 0.2, ease: 'easeIn' }}>
			{children}
		</motion.div>
	)
}
