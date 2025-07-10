import { motion as Motion } from 'framer-motion';
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordMeter from "../components/PasswordMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};
  
	return (
		<Motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="
				max-w-md w-full mx-auto
				bg-white
				border-4 border-black
				shadow-[8px_8px_0px_0px_black]
				p-8
			"
		>
			<h2 className="text-4xl font-extrabold mb-8 text-black text-center">
				Create Account
			</h2>

			<form onSubmit={handleSignUp}>
				<Input
					icon={User}
					type="text"
					placeholder="Full Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
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

				{error && (
					<p className="text-red-600 font-bold mt-3 border-2 border-black inline-block px-2">
						{error}
					</p>
				)}

				<PasswordMeter password={password} />

				<Motion.button
					type="submit"
					disabled={isLoading}
					className="
						mt-6 w-full py-3 px-4
						bg-yellow-300
						border-2 border-black
						shadow-[4px_4px_0px_0px_black]
						text-black font-extrabold
						hover:bg-yellow-400
						transition-all duration-200
					"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					{isLoading ? (
						<Loader className="animate-spin mx-auto" size={24} />
					) : (
						"Sign Up"
					)}
				</Motion.button>
			</form>

			<div className="mt-6 flex justify-center">
				<p className="text-black font-bold">
					Already have an account?{" "}
					<Link to="/login" className="underline decoration-4 decoration-black">
						Login
					</Link>
				</p>
			</div>
		</Motion.div>
	);
};

export default SignUpPage;
