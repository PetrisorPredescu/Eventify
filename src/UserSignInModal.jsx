import React from "react";
import { useNavigate } from "react-router-dom";

const UserSignInModal = ({ userModal, setUserModal, nav }) => {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Sign up processing...");

		//if successfull sign in
		console.log("Sign In Successfull. Redirecting..");
		setUserModal(false)
		nav(true);
		navigate("/Events");
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
							required
						/>

						<label>Password*</label>
						<input
							className="btn btn-secondary bg-secondary"
							style={{ textAlign: "start" }}
							type="text"
							name="password"
							required
						/>

						<button className="btn btn-primary" style={{ marginTop: "2rem" }}>
							Sign In
						</button>
					</form>
				</div>
			</div>
		)
};

export default UserSignInModal;
