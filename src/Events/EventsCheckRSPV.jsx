import React, { useState, useEffect } from "react";
import {
	checkIfUserHasRSPVed,
	addUserFromEvent,
	removeUserFromEvent,
} from "../Config/Firebase";

const EventsCheckRSPV = ({ u, e }) => {
	const [hasRSPVed, setHasRSPVed] = useState(false);
	const [participants, setParticipants] = useState("");

	useEffect(() => {
		async function checkRSPV() {
			const userHasRSPVed = await checkIfUserHasRSPVed(u, e.uid);
			setHasRSPVed(userHasRSPVed);
		}
		checkRSPV();
		setParticipants(e.participants.length);
	}, [u, e.uid, e.participants.length]);

	const handleRSPV = async () => {
		const tempParticipants = hasRSPVed
		  ? await removeUserFromEvent(u, e.uid)
		  : await addUserFromEvent(u, e.uid);
		setHasRSPVed(!hasRSPVed);
		setParticipants(tempParticipants.length);
	  };
	  
	return (
		<>
		  <p>{participants} Participants</p>
		  <button
			className="btn btn-Eprimary"
			onClick={handleRSPV}
		  >
			{hasRSPVed ? "-Cancel" : "+RSPV"}
		  </button>
		</>
	  );
};

export default EventsCheckRSPV;
