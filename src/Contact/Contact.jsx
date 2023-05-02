import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../Config/Firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

import AdminContact from "../AdminContact/AdminContact.jsx";

const Contact = ({ nav }) => {
	const navigate = useNavigate();
	const ref = useRef();
	if (!auth.currentUser) return navigate("/");
	const [err, setErr] = useState("");

	useEffect(() => {
		if (!nav || !auth) {
			navigate("/");
			return;
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErr("");
		let regexEmail =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (!e.target[0].value) {
			return setErr("Name required.");
		} else if (e.target[0].value.length < 3) {
			return setErr("Name too short.");
		}
		if (!e.target[1].value) {
			return setErr("Email required.");
		} else if (!regexEmail.test(e.target[1].value)) {
			return setErr("Email invalid.");
		}
		if (!e.target[2].value) {
			return setErr("Message required.");
		} else if (e.target[2].value < 3) {
			return setErr("Message too short.");
		}

		if (err == "") console.log("Sending message...");
		try {
			const userRef = collection(db, "contact");
			await setDoc(doc(userRef), {
				uid: crypto.randomUUID(),
				name: e.target[0].value,
				email: e.target[1].value,
				message: e.target[2].value,
				date: new Date(),
			});
			ref.current.value=""
			console.log("Message sent!");
			setErr("Message sent!");
		} catch (error) {
			console.log(error);
			setErr(error.message);
		}
	};

	if (!nav) return;

	if (auth.currentUser.email === "admin@eventify.com") {
		return <AdminContact />;
	}

	return (
		<div className="fadein">
			<form onSubmit={handleSubmit}>
				<div>
					<p className="btn" style={{ marginBottom: "2rem" }}>
						Contact Form
					</p>

					<label>Name*</label>
					<input
						className="btn btn-secondary bg-element"
						style={{ textAlign: "start" }}
						type="text"
						name="name"
						defaultValue={auth.currentUser.displayName}
						required
					/>

					<label>Email*</label>
					<input
						className="btn btn-secondary bg-element"
						style={{ textAlign: "start" }}
						type="text"
						name="email"
						defaultValue={auth.currentUser.email}
						required
					/>

					<label>Message*</label>
					<textarea
						ref={ref}
						className="btn btn-secondary bg-element"
						style={{ textAlign: "start", marginBottom: "2rem" }}
						name="message"
						defaultValue=""
						rows="6"
						cols="22"
						required
						type="text"></textarea>

					{err.length > 0 && <p>{err}</p>}

					<button className="btn btn-primary" style={{ marginTop: "2rem" }}>
						Send
					</button>
				</div>
			</form>
		</div>
	);
};

export default Contact;
