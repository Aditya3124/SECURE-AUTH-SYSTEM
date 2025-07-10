import { motion as Motion } from 'framer-motion';

const LoadingSpinner = () => {
	return (
		
			<Motion.div
				className="
					w-16 h-16 
					border-8 border-black border-t-yellow-400
					rounded-full
					shadow-[6px_6px_0px_0px_black]
				"
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
	);
};

export default LoadingSpinner;
