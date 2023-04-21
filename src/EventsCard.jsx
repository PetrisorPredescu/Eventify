// import React, { useState, useEffect } from "react";
// import InfoModal from "./InfoModal.jsx";
// import {
// 	checkIfUserHasRSPVed,
// 	removeUserFromEvent,
// 	addUserFromEvent,
// } from "./Firebase.jsx";

// const EventsCard = ({ data, user }) => {
// 	const [rspved, setRspved] = useState(false);
// 	console.log("||");
// 	const getInfo = (id) => {
// 		console.log(data, user,id);
// 		// setModalState(true);
// 		// setModalStateData(data);
// 	};

// 	useEffect(() => {
// 		async function check() {
// 			setRspved(await checkIfUserHasRSPVed(user, data.uid));
// 		}
// 		check();
// 	}, [rspved]);

// 	const handleAddRSPV = async () => {
// 		const tempParticipants = await addUserFromEvent(user, data.uid);
// 		console.log(tempParticipants);
// 		data.participants = tempParticipants;
// 		setRspved(!rspved);
// 	};

// 	const handleRemoveRSPV = async () => {
// 		const tempParticipants = await removeUserFromEvent(user, data.uid);
// 		console.log(tempParticipants);
// 		data.participants = tempParticipants;
// 		setRspved(!rspved);
// 	};

// 	const borderColor =
// 		data.type == "Online"
// 			? "--event1"
// 			: data.type == "Outdoor"
// 			? "--event2"
// 			: "--event3";
// 	return (
// 		<div
// 			className="EventCard"
// 			style={{
// 				transition: ".5s",
// 				maxWidth: "300px",
// 				borderTop: `2px solid var(${borderColor})`,
// 				animationDelay: "1s",
// 			}}>
// 			<p style={{ fontSize: "larger", fontWeight: "bold" }}>{data.name}</p>
// 			<div className="tags" style={{ display: "flex", gap: "10px" }}>
// 				<p
// 					style={{
// 						backgroundColor: `var(${borderColor})`,
// 						borderRadius: "20px",
// 						padding: "4px",
// 						color: "black",
// 					}}>
// 					{data.type}
// 				</p>
// 				<p style={{ padding: "4px" }}>{data.category}</p>
// 			</div>
// 			<p>{data.participants.length} Participants</p>
// 			<div>
// 				<button
// 					className="btn btn-Esecondary"
// 					onClick={() => getInfo(data.uid)}>
// 					Info
// 				</button>
// 				{rspved ? (
// 					<button className="btn btn-Eprimary" onClick={handleRemoveRSPV}>
// 						-Cancel
// 					</button>
// 				) : (
// 					<button className="btn btn-Eprimary" onClick={handleAddRSPV}>
// 						+RSPV
// 					</button>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default EventsCard;
