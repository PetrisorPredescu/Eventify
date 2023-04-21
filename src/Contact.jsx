import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./Firebase";
import {  collection, getDocs, setDoc, doc } from "firebase/firestore";

const Contact = ({ nav }) => {
	const navigate = useNavigate();
	const [err, setErr] = useState("")

	useEffect(() => {
		if (!nav) navigate("/");
	}, []);

	const handleSubmit = async(e) => {
		e.preventDefault()
		setErr("")
		let regexEmail =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (!e.target[0].value) {
			return setErr("Name required.")
		} else if (e.target[0].value.length < 3) {
			return setErr("Name too short.")
		}
		if (!e.target[1].value) {
			return setErr("Email required.")
		} else if (!regexEmail.test(e.target[1].value)) {
			return setErr("Email invalid.")
		}
		if (!e.target[2].value) {
			return setErr("Message required.")
		} else if (e.target[2].value < 3) {
			return setErr("Message too short.")
		}

		if(err == "")
		console.log("Sending message...");
		try {
			const userRef = collection(db, "messages");
			await setDoc(doc(userRef), {
				uid: crypto.randomUUID(),
				name: e.target[0].value,
				email: e.target[1].value,
				message: e.target[2].value,
				date: new Date()
			})
			console.log("Message sent!");
			setErr("Message sent!")
		} catch (error) {
			console.log(error);
			setErr(error.message)
		}
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

					{err.length > 0 && <p>{err}</p>}

					<button className="btn btn-primary" style={{marginTop:"2rem"}}>Send</button>
				</div>
			</form>
		</div>
	);
};

export default Contact;
