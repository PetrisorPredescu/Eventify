import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "../Config/Firebase";

import EventsCheckRSPV from "./EventsCheckRSPV.jsx";
import InfoModal from "./InfoModal.jsx";

import EventsAdminAdd from "../AdminEvents/EventsAdminAdd.jsx";
import EventsAdminEdit from "../AdminEvents/EventsAdminEdit.jsx";
import EventsAdmin from "../AdminEvents/EventsAdmin.jsx";

const Events = ({ nav }) => {
	const user = auth.currentUser;
	const [events, setEvents] = useState([]);
	const navigate = useNavigate();

	const [filterType, setFilterType] = useState("");
	const [filterTypeSortingOrder, setFilterTypeSortingOrder] = useState("desc");

	const [modalState, setModalState] = useState(false);
	const [modalData, setModalData] = useState([]);

	const [modalState2, setModalState2] = useState(false);
	const [modalState3, setModalState3] = useState(false);

	useEffect(() => {
		if (!nav) {
			navigate("/");
			return;
		}
		fetchEvents();
	}, [filterType, filterTypeSortingOrder, modalData, modalState2, modalState3]);

	function handleFilter(event) {
		if (event.target.className.startsWith("type")) {
			setFilterType(event.target.value);
		}
		if (event.target.className.startsWith("sort")) {
			setFilterTypeSortingOrder(event.target.value);
		}
	}

	async function fetchEvents() {
		console.log(`Fetching events in date order ${filterTypeSortingOrder}...`);
		const docs = await getDocs(
			query(collection(db, "events")),
			orderBy("date", filterTypeSortingOrder),
		);

		const results = await Promise.all(
			docs.docs.map(async (event) => {
				const loadedData = { ...event.data() };
				return loadedData;
			}),
		);
		const sortingOrder = filterTypeSortingOrder === "asc" ? -1 : 1;

		results.sort((a, b) => {
			const dateA = new Date(a.date.seconds);
			const dateB = new Date(b.date.seconds);
			if (dateA < dateB) {
				return sortingOrder;
			}
			if (dateA > dateB) {
				return -sortingOrder;
			}
			return 0;
		});

		setEvents(results);
	}

	const getInfo = (event) => {
		setModalData(event);
		setModalState(!modalState);
	};

	// admin use
	const handleAdminEditEvent = (event) => {
		setModalData(event);
		setModalState3(!modalState);
	};

	return (
		<div className="Events fadein">
			<EventsAdminAdd
				key={crypto.randomUUID()}
				modalState={modalState2}
				setModalState={setModalState2}
				data={modalData}
			/>
			<EventsAdminEdit
				key={crypto.randomUUID()}
				modalState={modalState3}
				setModalState={setModalState3}
				data={modalData}
			/>
			<InfoModal
				key={crypto.randomUUID()}
				modalState={modalState}
				setModalState={setModalState}
				data={modalData}
				user={user}
			/>

			<EventsAdmin setModalState2={setModalState2} key={crypto.randomUUID()} />
			<p
				className="bg-element"
				style={{
					textAlign: "center",
					margin: "1rem 0",
					borderRadius: "20px",
					padding: "4px",
				}}>
				Filters
			</p>

			<div
				style={{
					display: "inline-flex",
					justifyContent: "center",
					gap: "2rem",
				}}>
				<select
					className="type fadein"
					value={filterType}
					onChange={handleFilter}>
					<option value="">ALL</option>
					<option value="Online">Online</option>
					<option value="Indoor">Indoor</option>
					<option value="Outdoor">Outdoor</option>
				</select>

				<select
					className="sort fadein"
					value={filterTypeSortingOrder}
					onChange={handleFilter}>
					<option value="asc">🔽Date</option>
					<option value="desc">🔼Date</option>
				</select>
			</div>
			<p
				className="bg-element"
				style={{
					textAlign: "center",
					margin: "1rem 0",
					borderRadius: "20px",
					padding: "4px",
				}}>
				Events
			</p>

			<div className="EventsContainer">
				{events.length > 0 &&
					events.map((event, index) => {
						if (filterType == "" || filterType == event.type) {
							return (
								<>
									<div
										key={index}
										className="EventCard"
										style={{
											textAlign: "center",
											display: "flex",
											flexDirection: "column",
											gap: "8px",
											transition: ".5s",
											maxWidth: "300px",
											borderTop: `2px solid var(${
												event.type == "Online"
													? "--event1"
													: event.type == "Outdoor"
													? "--event2"
													: "--event3"
											})`,
											animationDelay: `${index * 0.1}s`,
											position: "relative",
										}}>
										{user.email == "admin@eventify.com" && (
											<button
												className="adminEditButton"
												onClick={() => handleAdminEditEvent(event)}>
												✏
											</button>
										)}
										<p style={{ fontSize: "larger", fontWeight: "bold" }}>
											{event.name}
										</p>

										<p
											style={{
												backgroundColor: `var(${
													event.type == "Online"
														? "--event1"
														: event.type == "Outdoor"
														? "--event2"
														: "--event3"
												})`,
												borderRadius: "20px",
												padding: "2px",
												color: "black",
											}}>
											{event.type}
										</p>
										<p>
											{new Date(event.date.seconds * 1000).toLocaleString()}
										</p>
										<EventsCheckRSPV key={"x" + index} u={user.uid} e={event} />
										<button
											className="btn btn-Esecondary"
											onClick={() => getInfo(event)}>
											Info
										</button>
									</div>
								</>
							);
						}
					})}
			</div>
		</div>
	);
};

export default Events;
