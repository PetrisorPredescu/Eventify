import React from "react";
import "./App.css";
import { NavLink } from "react-router-dom";

const Footer = ({nav}) => {


  const handleLogout = () => {
    nav(false)
  }


	return (
		<div className="Footer bg-element">
			<div>
				<button className="btn bg-transparent color-secondary">
					<NavLink to="/Profile" activeclassname={"active"}>
						Profile
					</NavLink>
				</button>
			</div>
			<div>
				<img src="./src/assets/Landing.JPG" />
			</div>
			<div>
				<button className="btn bg-transparent color-secondary" onClick={handleLogout}>
					<NavLink to="/" activeclassname={"active"}>
						Logout
					</NavLink>
				</button>
			</div>
		</div>
	);
};

export default Footer;
