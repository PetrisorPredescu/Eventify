import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "./Firebase";

const UserSignUpModal = ({ userModal2, setUserModal2, nav }) => {
	const navigate = useNavigate();

	const [errors, setErrors] = useState("");
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async(e) => {
		e.preventDefault();
		setErrors("")

		let regexEmail =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if (!values.name) {
			return setErrors("Name required.")
		} else if (values.name.length < 3) {
			return setErrors("Name too short.")
		}
		if (!values.email) {
			return setErrors("Email required.")
		} else if (!regexEmail.test(values.email)) {
			return setErrors("Email invalid.")
		}
		if (!values.password) {
			return setErrors("Password required.")
		} else if (values.password.length < 3) {
			return setErrors("Password too short.")
		}
		if (values.password !== e.target[3].value) {
			return setErrors("Passwords do not match.")
		} 


		const regMe = await registerWithEmailAndPassword(values.name, values.email, values.password);
		if (regMe != "Success") setErrors(regMe);
		//if successfull sign up
		console.log("Sign Up Successfull. Redirecting..");
		setUserModal2(false);
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
							value={values.name}
							onChange={handleChange}
							name="name"
							required
						/>

						<label>Email*</label>
						<input
							className="btn btn-secondary bg-secondary"
							style={{ textAlign: "start" }}
							type="text"
							value={values.email}
							onChange={handleChange}
							name="email"
							required
						/>

						<label>Password*</label>
						<input
							className="btn btn-secondary bg-secondary"
							style={{ textAlign: "start" }}
							type="password"
							value={values.password}
							onChange={handleChange}
							name="password"
							required
						/>

						<label>Repeat Password*</label>
						<input
							className="btn btn-secondary bg-secondary"
							style={{ textAlign: "start" }}
							type="password"
							defaultValue={""}
							name="password2"
							required
						/>

						{errors && <p className="fadein" style={{marginTop:"1rem"}}>{errors}</p>}

						<button className="btn btn-primary" style={{ marginTop: "2rem" }}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		);
};

export default UserSignUpModal;
