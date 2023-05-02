import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth, grabContactData, adminDeleteEmail } from "../Config/Firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

const AdminContact = () => {
	if (auth.currentUser.email !== "admin@eventify.com") return;

	const [messages, setMessages] = useState([]);

	async function fetchContactData() {
		let contactData = await grabContactData();
		setMessages(contactData);
	}

	useEffect(() => {
		fetchContactData();
	}, []);

	const handleAdminDeleteEmail = async (emailID) => {
		try {
			const query = await adminDeleteEmail(emailID);
			console.log("Email has been deleted.");
            fetchContactData()
		} catch (error) {
			console.log("Deleting email error.");
			console.log("err", error.message);
		}
	};

	return (
		<div>
			{messages.map((msg, index) => {
				return (
					<div
					key={index}
						className="bg-element fadein"
						style={{
							margin: "10px 0",
							padding: "10px",
							opacity: "0",
							animationDelay: `${index * 0.1}s`,
						}}>
						<div title="Details" style={{ margin: "10px 0" }}>
							<p style={{ textAlign: "end" }}>
								{new Date(msg.date.seconds * 1000).toLocaleString()}
							</p>
							<p>
								<span
									style={{ fontStyle: "italic", textDecoration: "underline" }}>
									&lt;{msg.email}&gt;
								</span>{" "}
								{msg.name}
							</p>
						</div>

						<div
							title="Actions"
							style={{
								display: "flex",
								gap: "10px",
								justifyContent: "flex-end",
							}}>
							<button style={{ padding: "1px 14px" }}>
								<a
									title="Reply"
									href={`mailto:${msg.email}`}
									style={{ margin: "0", padding: "0" }}>
									Reply
								</a>
							</button>
							<button
								style={{ padding: "1px 14px" }}
								onClick={() => handleAdminDeleteEmail(msg.uid)}>
								Delete
							</button>
						</div>

						<p>{msg.message}</p>
					</div>
				);
			})}
		</div>
	);
};

export default AdminContact;
