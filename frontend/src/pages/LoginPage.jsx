import { useState } from "react";
import { motion as Motion } from 'framer-motion';
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
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
					Welcome Back
				</h2>

				<form onSubmit={handleLogin}>
					<Input
						icon={Mail}
						type="email"
						placeholder="Email Address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Input
						icon={Lock}
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<div className="flex items-center mb-6">
						<Link
							to="/forgot-password"
							className="text-sm font-bold text-black underline decoration-4 decoration-black"
						>
							Forgot password?
						</Link>
					</div>

					{error && (
						<p className="text-red-600 font-bold border-2 border-black inline-block px-2 mb-4">
							{error}
						</p>
					)}

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
						disabled={isLoading}
					>
						{isLoading ? (
							<Loader className="w-6 h-6 animate-spin mx-auto" />
						) : (
							"Login"
						)}
					</Motion.button>
				</form>

				<div className="mt-6 flex justify-center">
					<p className="text-black font-bold">
						Don't have an account?{" "}
						<Link
							to="/signup"
							className="underline decoration-4 decoration-black"
						>
							Sign up
						</Link>
					</p>
				</div>
			</Motion.div>
	
	);
};

export default LoginPage;
