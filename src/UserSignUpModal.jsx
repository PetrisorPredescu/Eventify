import React from "react";
import { useNavigate } from "react-router-dom";

const UserSignUpModal = ({ userModal2, setUserModal2,nav }) => {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
        e.preventDefault()

		
		//if successfull sign up
		console.log("Sign Up Successfull. Redirecting..");
		setUserModal2(false)
		nav(true);
		navigate("/Events");
	};
    

	if (userModal2)
		return (
			<div className="modal2BG fadein">
				<div className="modal2Container">
					<button
						className="closingButtonX"
						onClick={() => setUserModal2(false)}>
						Close
					</button>

					<form onSubmit={handleSubmit}>
						<p className="btn" style={{ marginBottom: "2rem" }}>
							Sign Up
						</p>

						<label>Name*</label>
						<input
							className="btn btn-secondary bg-secondary"
							style={{ textAlign: "start" }}
							type="text"
							name="name"
							required
						/>

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

						<label>Repeat Password*</label>
						<input
							className="btn btn-secondary bg-secondary"
							style={{ textAlign: "start" }}
							type="text"
							name="password"
							required
						/>

						<button className="btn btn-primary" style={{ marginTop: "2rem" }}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		)
};

export default UserSignUpModal;
