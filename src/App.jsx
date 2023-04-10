import React , { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import Home from "./Home.jsx";
import Landing from "./Landing.jsx";
import Events from "./Events.jsx";
import Contact from "./Contact.jsx";
import Profile from "./Profile.jsx";

function App() {
	const [navState, setNavState] = useState(false);

	return (
		<div className="app">
			<BrowserRouter>
				{navState && <Nav />}

				<Routes>
					<Route path="/" element={<Landing nav={setNavState} />} />
					<Route path="/Home" element={<Home navState={navState}/>} />
					<Route path="/Events" element={<Events navState={navState}/>} />
					<Route path="/Contact" element={<Contact navState={navState}/>} />
					<Route path="/Profile" element={<Profile navState={navState}/>} />
				</Routes>

				{navState && <Footer nav={setNavState} />}
			</BrowserRouter>
		</div>
	);
}

export default App;
