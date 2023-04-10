import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Contact = ({ navState }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!navState) navigate("/");
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("handleSubmit");
	};

	return (
		<div className="fadein">
			<form onSubmit={handleSubmit}>
				<div>
					<p className="btn" style={{marginBottom:"2rem"}}>Contact Form</p>

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

					<label>Message*</label>
					<textarea
						className="btn btn-secondary bg-element"
						style={{ textAlign: "start" }}
						name="message"
						defaultValue=""
						rows="6"
						cols="22"
						required
						type="text"
					></textarea>

					<button className="btn btn-primary" style={{marginTop:"2rem"}}>Send</button>
				</div>
			</form>
		</div>
	);
};

export default Contact;
