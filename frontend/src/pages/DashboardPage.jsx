import { motion as Motion } from 'framer-motion';
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";

const DashboardPage = () => {
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};

	return (
			<Motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.5 }}
				className="
					w-full max-w-md mx-auto p-8
					bg-white border-4 border-black
					shadow-[8px_8px_0px_0px_black]
				"
			>
				<h2 className="text-4xl font-extrabold mb-6 text-center text-black">
					Dashboard
				</h2>

				<div className="space-y-6">
					<Motion.div
						className="
							p-4 bg-yellow-300 border-2 border-black
							shadow-[4px_4px_0px_0px_black]
						"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						<h3 className="text-xl font-bold text-black mb-3">Profile Information</h3>
						<p className="text-black font-semibold">Name: {user.name}</p>
						<p className="text-black font-semibold">Email: {user.email}</p>
					</Motion.div>

					<Motion.div
						className="
							p-4 bg-yellow-300 border-2 border-black
							shadow-[4px_4px_0px_0px_black]
						"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
					>
						<h3 className="text-xl font-bold text-black mb-3">Account Activity</h3>
						<p className="text-black font-semibold">
							<span className="font-extrabold">Joined:</span> {new Date(user.createdAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
						<p className="text-black font-semibold">
							<span className="font-extrabold">Last Login:</span> {formatDate(user.lastLogin)}
						</p>
					</Motion.div>
				</div>

				<Motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className="mt-6"
				>
					<Motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleLogout}
						className="
							w-full py-3 px-4
							bg-yellow-400 border-2 border-black
							shadow-[4px_4px_0px_0px_black]
							text-black font-extrabold
							hover:bg-yellow-500 transition-all duration-200
						"
					>
						Logout
					</Motion.button>
				</Motion.div>
			</Motion.div>
	
	);
};

export default DashboardPage;
