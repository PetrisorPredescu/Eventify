import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./App.css";

const Nav = () => {
	return (
		<div className="Header bg-element">
			<div>
				<button className="btn bg-transparent color-secondary">
					<NavLink to="/Home" activeclassname={"active"}>
						Home
					</NavLink>
				</button>
			</div>

			<div>
				<button className="btn bg-transparent color-secondary">
					<NavLink to="/Events" activeclassname={"active"}>
						Events
					</NavLink>
				</button>
			</div>

			<div>
				<button className="btn bg-transparent color-secondary">
					<NavLink to="/Contact" activeclassname={"active"}>
						Contact
					</NavLink>
				</button>
			</div>
		</div>
	);
};

export default Nav;

// <div className="Footer bg-element">
// 			<div>
// 				<button className="btn bg-transparent color-secondary">
//           <span>🏠</span>Home<span></span>
//         </button>
// 			</div>
// 			<div>
// 				<button className="btn bg-transparent color-secondary">
//           <span>🏠</span>Home<span></span>
//         </button>
// 			</div>
// 			<div>
// 				<button className="btn bg-transparent color-secondary">
//           <span>🏠</span>Home<span></span>
//         </button>
// 			</div>
// 			<div>
// 				<button className="btn bg-transparent color-secondary">
//           <span>🏠</span>Home<span></span>
//         </button>
// 			</div>
// 		</div>
