import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Config/App.css";
import IconCalendar from "../assets/IconCalendar.jsx";
import IconPhone from "../assets/IconPhone.jsx";
import IconCog from "../assets/IconCog.jsx";

const Home = ({ nav }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!nav) navigate("/");
	}, []);

	return (
		<div className="fadein">
			<div id="hero" className="opac">
				<h1 className="opac">EVENTIFY</h1>
			</div>

			<div className="underHero opac">
				<p>
					Eventify helps students can easily discover upcoming events happening
					on campus. They can browse through a list of events, including club
					meetings, workshops, guest lectures, and social events. Each event
					listing includes important details such as the date, time, location,
					and description of the event, helping students decide whether they
					want to attend.
				</p>

				<IconPhone />
			</div>

			<div className="underHero opac">
				<IconCog />
				<p>
					Once a student decides to attend an event, they can RSVP directly
					through the app. The app will notify the event organizer of the
					student's attendance, and the student will receive a confirmation
					message confirming their RSVP. If a student changes their mind and
					decides not to attend an event, they can also update their RSVP status
					through the app.
				</p>
			</div>

			<div className="underHero opac">
				<p>
					With Eventify, students can easily view their upcoming events and any
					relevant event updates or notifications. This feature helps students
					keep track of their schedule and ensures that they don't miss any
					important events.
				</p>

				<IconCalendar />
			</div>
		</div>
	);
};

export default Home;
