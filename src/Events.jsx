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

import { useAuthState } from "react-firebase-hooks/auth";
import {
	auth,
	db,
	logout,
	checkIfUserHasRSPVed,
	removeUserFromEvent,
	addUserFromEvent,
} from "./Firebase";

// import EventsCard from "./EventsCard.jsx";
import EventsCheckRSPV from "./EventsCheckRSPV.jsx";
import InfoModal from "./InfoModal.jsx";

const Events = ({ nav }) => {
	const [user, loading, error] = useAuthState(auth);
	const [events, setEvents] = useState([]);
	const navigate = useNavigate();

	const [filterType, setFilterType] = useState("");
	const [filterTypeSortingOrder, setFilterTypeSortingOrder] = useState("desc");

	useEffect(() => {
		if (!nav || !user) {
			navigate("/");
			return;
		}
		console.log("fetch events");
		fetchEvents();
	}, [filterType, filterTypeSortingOrder]);

	function handleFilter(event) {
		if (event.target.className.startsWith("type")) {
			setFilterType(event.target.value);
		}
		if (event.target.className.startsWith("sort")) {
			setFilterTypeSortingOrder(event.target.value);
		}
	}

	async function fetchEvents() {
		console.log(`fetching order ${filterTypeSortingOrder}`);
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
		console.log("A", results);

		const sortingOrder = filterTypeSortingOrder === "asc" ? 1 : -1;

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


		console.log("B", results);
		setEvents(results);
	}

	const getInfo = (event) => {
		setModalData(event);
		setModalState(!modalState);
	};
	const [modalState, setModalState] = useState(false);
	const [modalData, setModalData] = useState([]);

	return (
		<div className="Events fadein">
			<InfoModal
				modalState={modalState}
				setModalState={setModalState}
				data={modalData}
				user={user}
			/>
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
					<option value="desc">🔽Date</option>
					<option value="asc">🔼Date</option>
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
											animationDelay: `${index * 0.1 }s`,
										}}>
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
										<EventsCheckRSPV u={user.uid} e={event} />
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
