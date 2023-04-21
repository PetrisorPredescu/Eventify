import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword } from "./Firebase";

const UserSignInModal = ({ userModal, setUserModal, nav }) => {
	const navigate = useNavigate();

	const [errors, setErrors] = useState("");
	const [values, setValues] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors("");
		console.log("Sign up processing...");
		try {
			const loginAttempt = await logInWithEmailAndPassword(
				values.email,
				values.password,
			);
			//if successfull sign in
			console.log("Sign In Successfull. Redirecting..");
			setUserModal(false);
			navigate("/Events");
		} catch (err) {
			console.log(err.message);
			if (err.message == "Firebase: Error (auth/user-not-found).")
				return setErrors("User is not found.");
			if (err.message == "Firebase: Error (auth/internal-error).")
				return setErrors("Login fields are not valid.");
			if (err.message == "Firebase: Error (auth/wrong-password).")
				return setErrors("Login fields are not valid.");
			if (err.message == "Firebase: Error (auth/invalid-email).")
				return setErrors("Login fields are not valid.");
			if (err.message == "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).")
				return setErrors("Account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.");
		}
	};

	if (userModal)
		return (
			<div className="modal2BG fadein">
				<div className="modal2Container">
					<button
						className="closingButtonX"
						onClick={() => setUserModal(false)}>
						Close
					</button>

					<form onSubmit={handleSubmit}>
						<p className="btn" style={{ marginBottom: "2rem" }}>
							Sign In
						</p>

						<label>Email*</label>
						<input
							className="btn btn-secondary bg-secondary"
							style={{ textAlign: "start" }}
							type="text"
							name="email"
							value={values.email}
							onChange={handleChange}
							required
						/>

						<label>Password*</label>
						<input
							className="btn btn-secondary bg-secondary"
							style={{ textAlign: "start" }}
							type="password"
							name="password"
							value={values.password}
							onChange={handleChange}
							required
						/>

						{errors && (
							<p
								className="fadein"
								style={{ marginTop: "1rem", textAlign: "center", maxWidth:"282px" }}>
								{errors}
							</p>
						)}

						<button className="btn btn-primary" style={{ marginTop: "2rem" }}>
							Sign In
						</button>
					</form>
				</div>
			</div>
		);
};

export default UserSignInModal;
