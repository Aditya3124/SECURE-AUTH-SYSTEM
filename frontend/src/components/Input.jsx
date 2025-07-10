const Input = ({ icon: Icon, ...props }) => {
	return (
		<div className='relative mb-6'>
			{Icon && (
				<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
					<Icon className='size-5 text-black' />
				</div>
			)}
			<input
				{...props}
				className='
					w-full
					pl-10 pr-3 py-2
					bg-[#FDFFB8]
					text-black
					rounded-none
					border-4 border-black
					shadow-[4px_4px_0px_#000]
					placeholder-gray-700
					focus:outline-none
					focus:border-black
					focus:shadow-[2px_2px_0px_#000]
					transition duration-200
				'
			/>
		</div>
	);
};
export default Input;
