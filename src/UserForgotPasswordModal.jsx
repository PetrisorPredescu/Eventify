import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordReset } from "./Firebase";

const UserForgotPasswordModal = ({ userModal3, setUserModal3, nav }) => {
	const navigate = useNavigate();

	const [errors, setErrors] = useState("");
	const [values, setValues] = useState({
		email: "",
	});

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
	};

	if (userModal3)
		return (
			<div className="modal2BG fadein">
				<div className="modal2Container">
					<button
						className="closingButtonX"
						onClick={() => setUserModal3(false)}>
						Close
					</button>

					<form onSubmit={handleSubmit}>
						<p className="btn" style={{ marginBottom: "2rem" }}>
							Forgot Password
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

						{errors && (
							<p
								className="fadein"
								style={{ marginTop: "1rem", textAlign: "center", maxWidth:"282px" }}>
								{errors}
							</p>
						)}

						<button className="btn btn-primary" style={{ marginTop: "2rem" }} onClick={() => sendPasswordReset(values.email)}>
							Send
						</button>
					</form>
				</div>
			</div>
		);
};

export default UserForgotPasswordModal;
