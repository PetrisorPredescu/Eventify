import React from "react";

const InfoModal = ({ modalState, checkModalState }) => {
	// data= type of event, description, RSPV status, location, time

	if(modalState) return (
		<div className="modalBG opac">
			<div className="modalContainer">
				<button className="closingButton" onClick={()=>checkModalState(false)}>Close</button>

				<div className="modalElement">
					<p>Event</p>
					<p>Event Name</p>
					<p>Event Location</p>
					<p>Event Time</p>
				</div>

				<div className="modalElement">
					<p>About</p>
					<p>Lorem ipsum dolor sit.</p>
				</div>

				<div className="modalElement">
					<button className="btn btn-Eprimary">RSPV</button>
				</div>
			</div>
		</div>
	);
};

export default InfoModal;
