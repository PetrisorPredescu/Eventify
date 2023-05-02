import React, { useState, useEffect } from "react";
import "./Config/App.css";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import Nav from "./Navigation/Nav.jsx";
import Footer from "./Navigation/Footer.jsx";
import Home from "./Home/Home.jsx";
import Landing from "./Landing/Landing.jsx";
import Events from "./Events/Events.jsx";
import Contact from "./Contact/Contact.jsx";
import Profile from "./Profile/Profile.jsx";
import Logout from "./Navigation/Logout.jsx";

import { auth, db, logout } from "./Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";

function App() {
	const [navState, setNavState] = useState(false);

	const [user, loading, error] = useAuthState(auth);

	useEffect(() => {
		if (loading) return;
		if (user) {
			setNavState(true);
		}
	}, [user, loading, error]);

	return (
		<div className="app" >
			<BrowserRouter key={crypto.randomUUID()}>
				<Nav nav={navState} key={crypto.randomUUID()}/>

				<Routes key={crypto.randomUUID()}>
					<Route path="/" element={<Landing nav={navState} key={crypto.randomUUID()}/>} />
					<Route path="/Home" element={<Home nav={navState} key={crypto.randomUUID()}/>} />
					<Route path="/Events" element={<Events nav={navState} key={crypto.randomUUID()}/>} />
					<Route path="/Contact" element={<Contact nav={navState} key={crypto.randomUUID()}/>} />
					<Route path="/Profile" element={<Profile nav={navState} key={crypto.randomUUID()}/>} />
					<Route path="/logout" element={<Logout nav={navState} key={crypto.randomUUID()}/>} />
					<Route path="*" element={<Landing nav={navState} />} key={crypto.randomUUID()}/>
				</Routes>

				<Footer nav={navState} setNav={setNavState} key={crypto.randomUUID()}/>
			</BrowserRouter>
		</div>
	);
}

export default App;
