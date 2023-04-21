import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import Home from "./Home.jsx";
import Landing from "./Landing.jsx";
import Events from "./Events.jsx";
import Contact from "./Contact.jsx";
import Profile from "./Profile.jsx";
import Logout from "./Logout.jsx";

import { auth, db, logout } from "./Firebase";
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
		<div className="app">
			<BrowserRouter>
				<Nav nav={navState} />

				<Routes>
					<Route path="/" element={<Landing nav={navState} />} />
					<Route path="/Home" element={<Home nav={navState} />} />
					<Route path="/Events" element={<Events nav={navState} />} />
					<Route path="/Contact" element={<Contact nav={navState} />} />
					<Route path="/Profile" element={<Profile nav={navState} />} />
					<Route path="/logout" element={<Logout nav={navState} />} />
					<Route path="*" element={<Landing nav={navState} />} />
				</Routes>

				<Footer nav={navState} setNav={setNavState} />
			</BrowserRouter>
		</div>
	);
}

export default App;
