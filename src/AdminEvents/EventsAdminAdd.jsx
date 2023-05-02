import React, { useState, useEffect } from "react";
import {
	checkIfUserHasRSPVed,
	removeUserFromEvent,
	addUserFromEvent,
	adminAddEvent
} from "../Config/Firebase.jsx";
import ReactDOM from "react-dom";
import { Timestamp } from "firebase/firestore";

const EventsAdminAdd = ({ modalState, setModalState, data, user }) => {
	if (!modalState) return;

	const now = new Date();
	const year = now.getFullYear();
	const month = ("0" + (now.getMonth() + 1)).slice(-2);
	const day = ("0" + now.getDate()).slice(-2);
	const hours = ("0" + now.getHours()).slice(-2);
	const minutes = ("0" + now.getMinutes()).slice(-2);
	const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}`;

	const [eventName, setEventName] = useState("");
	const [dataType, setDataType] = useState("Online");
	const [formatedDate, setFormatedDate] = useState(dateTimeString);
	const [textareaDescription, setTextareaDescription] = useState("");

	const borderColor =
		dataType == "Online"
			? "--event1"
			: dataType == "Outdoor"
			? "--event2"
			: "--event3";

	const handleAddEvent = async () => {
		let newEvent = {
			name: eventName,
			date: Timestamp.fromDate(new Date(formatedDate)),
			description: textareaDescription,
			participants: [],
			type: dataType,
			uid: crypto.randomUUID(),
		};

		try {
			const query = await adminAddEvent(newEvent);
			console.log("Event has been added.");
			setModalState(false);
		} catch (error) {
			console.log("Adding event error.");
			console.log("err", error.message);
		}
	};
	if (modalState)
		return (
			<div className="modalBG opac x2">
				<div
					className="modalContainer"
					style={{ gap: "0px", textAlign: "center" }}>
					<button
						className="closingButton"
						onClick={() => setModalState(false)}>
						Close
					</button>
					<p style={{ textAlign: "start", width: "80%" }}>Event Name</p>

					<input
						className="btn "
						style={{
							fontSize: "larger",
							fontWeight: "bold",
							width: "80%",
							padding: "10px",
						}}
						defaultValue={eventName}
						onChange={(e) => setEventName(e.target.value)}
					/>

					<p style={{ textAlign: "start", width: "80%" }}>Date</p>
					<p style={{ textAlign: "center" }}>
						<input
							className="btn"
							style={{ padding: "10px", width: "90%" }}
							type="datetime-local"
							name=""
							id=""
							defaultValue={formatedDate}
							onChange={(e) => setFormatedDate(e.target.value)}
						/>
					</p>
					<p style={{ textAlign: "start", width: "80%" }}>Type</p>
					<p
						style={{
							backgroundColor: `var(${borderColor})`,
							borderRadius: "20px",
							padding: "4px",
							color: "black",
							width: "80%",
							textAlign: "center",
						}}>
						<select
							className="type fadein"
							defaultValue={data.type}
							onChange={(e) => setDataType(e.target.value)}>
							<option value="Online">Online</option>
							<option value="Indoor">Indoor</option>
							<option value="Outdoor">Outdoor</option>
						</select>
					</p>

					<p style={{ textAlign: "start", width: "80%" }}>Description</p>
					<p>
						<textarea
							className="btn "
							style={{ margin: "8px", padding: "8px", width: "80%" }}
							name=""
							id=""
							cols="32"
							rows="10"
							defaultValue={textareaDescription}
							onChange={(e) =>
								setTextareaDescription(e.target.value)
							}></textarea>
					</p>
					<button
						className="btn btn-primary"
						style={{ flexBasis: "unset" }}
						onClick={handleAddEvent}>
						Add
					</button>
				</div>
			</div>
		);
};

export default EventsAdminAdd;
