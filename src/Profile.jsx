import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ nav }) => {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("handleSubmit");
	};

	useEffect(() => {
		if (!nav) navigate("/");
	}, []);

	return (
		<div className="fadein">
			<form onSubmit={handleSubmit}>
				<div>
					<p className="btn" style={{ marginBottom: "2rem" }}>
						Profile
					</p>

					<label>Name*</label>
					<input
						className="btn btn-secondary bg-element"
						style={{ textAlign: "start" }}
						type="text"
						name="name"
						required
					/>

					<label>Email*</label>
					<input
						className="btn btn-secondary bg-element"
						style={{ textAlign: "start" }}
						type="text"
						name="email"
						required
					/>

					<label>Password*</label>
					<input
						className="btn btn-secondary bg-element"
						style={{ textAlign: "start" }}
						type="text"
						name="password"
						required
					/>

					<button
						className="btn btn-primary"
						style={{ marginTop: "2rem" }}
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default Profile;
