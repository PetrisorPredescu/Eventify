import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import IconCalendar from './IconCalendar.jsx'

const Home = ({ navState }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!navState) navigate("/");
	}, []);

	return (
		<div className="fadein">
			<div id="hero" className="opac">
				<h1 className="opac">EVENTIFY</h1>
			</div>

      <div className="underHero opac">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, accusamus.</p>
        <img src="./src/assets/landing2.jpg" alt="" className="fadein" />
      </div>


      <div className="underHero opac">
       <IconCalendar />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, accusamus.</p>
      </div>

      
      <div className="underHero opac">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, accusamus.</p>
        <img src="./src/assets/landing2.jpg" alt="" className="fadein"/>
      </div>

		</div>
	);
};

export default Home;
