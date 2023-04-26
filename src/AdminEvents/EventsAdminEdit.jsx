import React, { useState, useEffect } from "react";
import {
	checkIfUserHasRSPVed,
	removeUserFromEvent,
	addUserFromEvent,
	adminUpdateEvent,
	adminDeleteEvent,
} from "../Firebase.jsx";
import ReactDOM from "react-dom";
import { Timestamp } from "firebase/firestore";

const EventsAdminEdit = ({ modalState, setModalState, data, user }) => {
	if (!modalState) return;

	const dateObj = new Date(data.date.seconds * 1000);
	const year = dateObj.getFullYear();
	const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
	const day = ("0" + dateObj.getDate()).slice(-2);
	const hours = ("0" + dateObj.getHours()).slice(-2);
	const minutes = ("0" + dateObj.getMinutes()).slice(-2);
	const formattedDatez = `${year}-${month}-${day}T${hours}:${minutes}`;

	const [eventName, setEventName] = useState(data.name);
	const [dataType, setDataType] = useState(data.type);
	const [formatedDate, setFormatedDate] = useState(formattedDatez);
	const [textareaDescription, setTextareaDescription] = useState(
		data.description,
	);

	const borderColor =
		dataType == "Online"
			? "--event1"
			: dataType == "Outdoor"
			? "--event2"
			: "--event3";

	const handleDeleteEvent = async () => {
		try {
			const query = await adminDeleteEvent(data.uid);
			console.log("Event has been deleted.");
			setModalState(false);
		} catch (error) {
			console.log("Deleting event error.");
			console.log("err", error.message);
		}
	};
	const handleUpdateEvent = async () => {
		let updatedEvent = {
			name: eventName,
			date: Timestamp.fromDate(new Date(formatedDate)),
			description: textareaDescription,
			participants: data.participants,
			type: dataType,
			uid: data.uid,
		};

		// console.log(data);
		// console.log(updatedEvent);
		try {
			const query = await adminUpdateEvent(updatedEvent);
			console.log("Event has been updated.");
			setModalState(false);
		} catch (error) {
			console.log("Updating event error.");
			console.log("err", error.message);
		}
	};

	if (modalState)
		return (
			<div className="modalBG opac x3">
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
						onClick={handleUpdateEvent}>
						Update
					</button>
					<button
						className="btn btn-secondary"
						style={{
							flexBasis: "unset",
							marginTop: "1rem",
							backgroundColor: "orangered",
						}}
						onClick={handleDeleteEvent}>
						Cancel Event
					</button>
				</div>
			</div>
		);
};

export default EventsAdminEdit;
