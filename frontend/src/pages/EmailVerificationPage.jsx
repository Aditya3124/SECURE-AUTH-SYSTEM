import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from 'framer-motion';
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);
	const navigate = useNavigate();

	const { error, isLoading, verifyEmail } = useAuthStore();

	const handleChange = (index, value) => {
		const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			const verificationCode = code.join("");
			try {
				await verifyEmail(verificationCode);
				navigate("/");
				toast.success("Email verified successfully");
			} catch (error) {
				console.log(error);
			}
		},
		[code, verifyEmail, navigate]
	);

	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [code, handleSubmit]);

	return (
	
			<Motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="
					bg-white
					border-4 border-black
					shadow-[8px_8px_0px_0px_black]
					p-8
					w-full max-w-md
				"
			>
				<h2 className="text-4xl font-extrabold mb-6 text-center text-black">
					Verify Your Email
				</h2>

				<p className="text-center text-black font-bold mb-6">
					Enter the 6-digit code sent to your email address.
				</p>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="flex justify-between gap-2">
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type="text"
								maxLength="1"
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className="
									w-12 h-12
									text-center text-2xl font-extrabold
									bg-yellow-300
									border-2 border-black
									shadow-[4px_4px_0px_0px_black]
									focus:outline-none focus:ring-2 focus:ring-black
								"
							/>
						))}
					</div>

					{error && (
						<p className="text-red-600 font-bold border-2 border-black inline-block px-2 mt-2">
							{error}
						</p>
					)}

					<Motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type="submit"
						disabled={isLoading || code.some((digit) => !digit)}
						className="
							w-full py-3 px-4
							bg-yellow-300
							border-2 border-black
							shadow-[4px_4px_0px_0px_black]
							text-black font-extrabold
							hover:bg-yellow-400
							transition-all duration-200
							disabled:opacity-50
						"
					>
						{isLoading ? "Verifying..." : "Verify Email"}
					</Motion.button>
				</form>
			</Motion.div>
	
	);
};

export default EmailVerificationPage;
