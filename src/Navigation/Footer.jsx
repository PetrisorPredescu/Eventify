import React, { useEffect } from "react";
import "../Config/App.css";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { logout } from "../Config/Firebase.jsx"

const Footer = ({ nav, setNav }) => {
	const handleLogout = () => {
		setNav(false);
		logout()
	};

	return (
		<>
		{nav && <div className="Footer bg-element">
			<div>
				<button className="btn bg-transparent color-secondary">
					<NavLink to="/Profile" activeclassname={"active"}>
						Profile
					</NavLink>
				</button>
			</div>
			<div>
				<img src="./assets/Landing.JPG" />
			</div>
			<div>
				<button
					className="btn bg-transparent color-secondary"
					onClick={handleLogout}>
					<NavLink to="/" activeclassname={"active"}>
						Logout
					</NavLink>
				</button>
			</div>
		</div>}
		</>
	);
};

export default Footer;
