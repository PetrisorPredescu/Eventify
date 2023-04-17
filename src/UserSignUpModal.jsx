import React from "react";

const UserSignUpModal = ({ userModal2, setUserModal2 }) => {
	const handleSubmit = (e) => {
		console.log(e);
	};

    const handleSignUp = (e) => {
        e.preventDefault()
        console.log("Sign up processing...");
    }
    

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

						<button className="btn btn-primary" style={{ marginTop: "2rem" }} onClick={handleSignUp}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		)
};

export default UserSignUpModal;
