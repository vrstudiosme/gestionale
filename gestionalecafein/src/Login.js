import React, { useEffect, useState } from "react";
import axios from "axios";

export const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState("");
	const [flashMessage, setflashMessage] = useState(null);
	const logi = () => {
		axios
			.post("http://localhost:8081/auth/login", {
				username: username,
				password: password,
			})
			.then((response) => {
				console.log(response);
				if (response.data.message) {
					setLoginStatus(response.data.message);
				} else {
					if (response.data[0].verifica === "True") {
						window.location.assign("./Home");
					}
				}
			})
			.catch((err) => {
				setflashMessage(
					<div className="bg-red-600 p-3 text-white rounded-md">
						{err.response.data.message}
					</div>
				);
				console.log(err.response.data.message);
			});
	};
	function hideFlashMessage() {
		setflashMessage(null);
	}

	useEffect(() => {
		// Automatically hide the flash message after 30 seconds
		const timer = setTimeout(hideFlashMessage, 3000);
		return () => clearTimeout(timer);
	}, [flashMessage]);

	return (
		<div
			style={{
				backgroundImage: "url(/images/bg.png)",
				position: "fixed",
				minWidth: "100%",
				minHeight: "100%",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="Square p-4">
				<h1
					style={{
						fontFamily: "sans-serif",
						fontSize: 22,
					}}
					className="m-2"
				>
					Gestionale Cafe IN
				</h1>
				{flashMessage && flashMessage}

				<div className="flex flex-row grid grid-cols-12 ">
					<p
						style={{ fontFamily: "monospace", fontSize: 18 }}
						className="col-span-5"
					>
						Username
					</p>
					<input
						type="text"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						className="form-control p-2 rounded-md   border-b border-b-2 border-green-600 focus:border-green-600 focus:outline-none col-span-7 outline-none"
					/>
				</div>
				<div className="flex flex-row grid grid-cols-12 mt-4">
					<p
						style={{ fontFamily: "monospace", fontSize: 18 }}
						className="col-span-5"
					>
						Password
					</p>
					<input
						type="password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						className="form-control p-2 rounded-md  border-b border-b-2 border-green-600 focus:border-green-600 focus:outline-none col-span-7 outline-none"
					/>
				</div>
				<br></br>
				<label className="err">{String(loginStatus)}</label>
				<button
					className="mt-4 rounded-md bg-blue-400 p-2 "
					onClick={() => logi()}
				>
					Accedi
				</button>
			</div>
		</div>
	);
};
