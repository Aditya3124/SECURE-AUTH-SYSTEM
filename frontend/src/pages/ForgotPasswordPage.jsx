import { motion as Motion } from 'framer-motion';
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isLoading, forgotPassword } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
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
					Forgot Password
				</h2>

				{!isSubmitted ? (
					<form onSubmit={handleSubmit}>
						<p className="text-black mb-6 text-center font-bold">
							Enter your email address and we'll send you a link to reset your password.
						</p>
						<Input
							icon={Mail}
							type="email"
							placeholder="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<Motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="
								w-full py-3 px-4
								bg-yellow-300
								border-2 border-black
								shadow-[4px_4px_0px_0px_black]
								text-black font-extrabold
								hover:bg-yellow-400
								transition-all duration-200
							"
							type="submit"
						>
							{isLoading ? (
								<Loader className="size-6 animate-spin mx-auto" />
							) : (
								"Send Reset Link"
							)}
						</Motion.button>
					</form>
				) : (
					<div className="text-center">
						<Motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
							className="w-16 h-16 bg-yellow-400 border-2 border-black shadow-[4px_4px_0px_0px_black] flex items-center justify-center mx-auto mb-4"
						>
							<Mail className="h-8 w-8 text-black" />
						</Motion.div>
						<p className="text-black mb-6 font-bold">
							If an account exists for {email}, you will receive a password reset link shortly.
						</p>
					</div>
				)}

				<div className="mt-6 flex justify-center">
					<Link
						to={"/login"}
						className="text-black font-bold underline decoration-4 decoration-black flex items-center"
					>
						<ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
					</Link>
				</div>
			</Motion.div>
	
	);
};

export default ForgotPasswordPage;
