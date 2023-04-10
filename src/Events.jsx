import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InfoModal from "./InfoModal.jsx";

const Events = ({ navState }) => {
	const navigate = useNavigate();

	const [filter, setfilter] = useState({
		type: "",
		category: "",
	});
	const [modalState, setModalState] = useState(false)

	useEffect(() => {
		if (!navState) navigate("/");
		console.log(filter);
	}, [filter]);

	function handleFilter(event) {
		console.log(event.target.className);

		if (event.target.className.startsWith("type")) {
			setfilter((prevFilters) => ({
				...prevFilters,
				type: event.target.value,
			}));
		} else if (event.target.className.startsWith("category")) {
			setfilter((prevFilters) => ({
				...prevFilters,
				category: event.target.value,
			}));
		}
	}

	const getInfo = (id) => {
		console.log(id);
	};

	return (
		<div className="Events fadein">
			<InfoModal modalState={modalState} checkModalState={setModalState}/>
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
					value={filter.type}
					onChange={handleFilter}>
					<option value="">ALL</option>
					<option value="Online">Online</option>
					<option value="On-site">On-site</option>
					<option value="Indoor">Indoor</option>
					<option value="Indoor">Indoor</option>
				</select>

				<select
					className="category fadein"
					value={filter.category}
					onChange={handleFilter}>
					<option value="">ALL</option>
					<option value="Art">Art</option>
					<option value="Wellbeing">Wellbeing</option>
					<option value="Music">Music</option>
					<option value="Travel">Travel</option>
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
				<div
					style={{
						borderTop: "2px solid var(--event1)",
						animationDelay: "1s",
					}}>
					<p>Career Services</p>
					<div>
						<button
							className="btn btn-Esecondary"
							onClick={() => getInfo("id111111")}>
							Info
						</button>
						<button className="btn btn-Eprimary">RSPV</button>
					</div>
				</div>

				<div
					style={{
						borderTop: "2px solid var(--event2)",
						animationDelay: "1.2s",
					}}>
					<p>Career fair</p>
					<div>
						<button className="btn btn-Esecondary">Info</button>
						<button className="btn btn-Eprimary">RSPV</button>
					</div>
				</div>

				<div
					style={{
						borderTop: "2px solid var(--event3)",
						animationDelay: "1.4s",
					}}>
					<p>Music concert</p>
					<div>
						<button className="btn btn-Esecondary">Info</button>
						<button className="btn btn-Eprimary">RSPV</button>
					</div>
				</div>

				<div
					style={{
						borderTop: "2px solid var(--event3)",
						animationDelay: "1.6s",
					}}>
					<p>Art exhibit</p>
					<div>
						<button className="btn btn-Esecondary">Info</button>
						<button className="btn btn-Eprimary">RSPV</button>
					</div>
				</div>

				<div
					style={{
						borderTop: "2px solid var(--event2)",
						animationDelay: "1.8s",
					}}>
					<p>Hackathon</p>
					<div>
						<button className="btn btn-Esecondary">Info</button>
						<button className="btn btn-Eprimary">RSPV</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Events;
