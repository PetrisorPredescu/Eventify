import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../Config/Firebase";
import {
	collection,
	query,
	where,
	updateDoc,
	getDocs,
	setDoc,
	doc,
} from "firebase/firestore";
import {
	getAuth,
	updateProfile,
	updateEmail,
	updatePassword,
} from "firebase/auth";

const Profile = ({ nav }) => {
	const navigate = useNavigate();
	const [err, setErr] = useState("");

	useEffect(() => {
		if (!nav) {
			navigate("/");
			return;
		}
	},[])

	const handleSubmit = async (e) => {
		e.preventDefault();
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
			return setErr("Password required.")
		} else if (e.target[2].value.length < 6) {
			return setErr("Password too short.")
		}

		if(err == "")
		
		console.log("Processing request...");
		try {
			const q = await query(
				collection(db, "users"),
				where("uid", "==", auth.currentUser.uid),
			);
			const docx = await getDocs(q);

			const docRef = await doc(db, "users", docx.docs[0].id);
			await updateDoc(docRef, {
				name: e.target[0].value,
				email: e.target[1].value,
			});

			if (auth.currentUser) {
				await updateProfile(auth.currentUser, {
					displayName: e.target[0].value,
				});
				await updateEmail(auth.currentUser, e.target[1].value);
				await updatePassword(auth.currentUser, e.target[2].value);
				console.log("Account updated!");
				setErr("Account updated!")
			} else {
				console.log("User is not authenticated");
				setErr("User is not authenticated")
			}

		} catch (error) {
			console.log(error);
			setErr(error.message)
		}
	};

	if(nav)
	return (
		<div className="fadein" key={crypto.randomUUID()}>
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

					<label>Password*</label>
					<input
						className="btn btn-secondary bg-element"
						style={{ textAlign: "start", marginBottom:"2rem" }}
						type="text"
						name="password"
						required
					/>

					{err.length > 0 && <p className="fadein">{err}</p>}
					<button className="btn btn-primary" style={{ marginTop: "2rem" }}>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default Profile;
