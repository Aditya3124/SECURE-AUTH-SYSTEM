import { useState } from "react";
import { motion as Motion } from 'framer-motion';
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading, message } = useAuthStore();

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		}
	};

	return (
		
			<Motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="
					max-w-md w-full
					bg-white
					border-4 border-black
					shadow-[8px_8px_0px_0px_black]
					p-8
				"
			>
				<h2 className="text-4xl font-extrabold mb-6 text-center text-black">
					Reset Password
				</h2>

				{error && (
					<p className="text-red-600 font-bold border-2 border-black inline-block px-2 mb-4">
						{error}
					</p>
				)}
				{message && (
					<p className="text-green-600 font-bold border-2 border-black inline-block px-2 mb-4">
						{message}
					</p>
				)}

				<form onSubmit={handleSubmit}>
					<Input
						icon={Lock}
						type="password"
						placeholder="New Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<Input
						icon={Lock}
						type="password"
						placeholder="Confirm New Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					<Motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="
							mt-4 w-full py-3 px-4
							bg-yellow-300
							border-2 border-black
							shadow-[4px_4px_0px_0px_black]
							text-black font-extrabold
							hover:bg-yellow-400
							transition-all duration-200
						"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? "Resetting..." : "Set New Password"}
					</Motion.button>
				</form>
			</Motion.div>

	);
};

export default ResetPasswordPage;
