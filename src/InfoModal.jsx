import React, { useState, useEffect } from "react";
import {
	checkIfUserHasRSPVed,
	removeUserFromEvent,
	addUserFromEvent,
} from "./Firebase.jsx";
import ReactDOM from "react-dom";

const InfoModal = ({ modalState, setModalState, data, user }) => {
	if (!modalState) return;

	const borderColor =
		data.type == "Online"
			? "--event1"
			: data.type == "Outdoor"
			? "--event2"
			: "--event3";

	if (modalState)
		return (
			<div className="modalBG opac">
				<div className="modalContainer">
					<button
						className="closingButton"
						onClick={() => setModalState(false)}>
						Close
					</button>

					<p style={{ fontSize: "larger", fontWeight: "bold" }}>{data.name}</p>
					<p>{new Date(data.date.seconds * 1000).toLocaleString()}</p>
					<div className="tags" style={{ display: "flex", gap: "10px" }}>
						<p
							style={{
								backgroundColor: `var(${borderColor})`,
								borderRadius: "20px",
								padding: "4px",
								color: "black",
							}}>
							{data.type}
						</p>
					</div>
					
					<p>{data.description}</p>
				</div>
			</div>
		);
};

export default InfoModal;
