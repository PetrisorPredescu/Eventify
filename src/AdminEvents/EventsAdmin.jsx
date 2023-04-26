import React, { useEffect, useState } from "react";
import {
	query,
	collection,
	getDocs,
	getDoc,
	where,
	orderBy,
	doc,
	updateDoc,
} from "firebase/firestore";

import {
	auth,
	db,
	logout,
	checkIfUserHasRSPVed,
	removeUserFromEvent,
	addUserFromEvent,
} from "../Firebase";

const EventsAdmin = ({setModalState2}) => {
	if (!auth.currentUser) return;
	if (auth.currentUser.email !== "admin@eventify.com") return;
	return (
		<>
			<p className="bg-element"
				style={{
					textAlign: "center",
					margin: "1rem 0",
					borderRadius: "20px",
					padding: "4px",
				}}>
				Admin Actions
			</p>
			<div style={{
					display: "inline-flex",
					justifyContent: "center",
					gap: "2rem",
				}}>
				<button type="button" className="btn btn-primary" onClick={()=>setModalState2(true)}>
					+Event
				</button>
			</div>
		</>
	);
};

export default EventsAdmin;
