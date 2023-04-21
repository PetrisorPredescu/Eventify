import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";

const Logout = ({ nav }) => {
	const navigate = useNavigate();
	signOut(auth);

	useEffect(() => {
		nav(false)
		navigate("/");
	});

	return null;
};

export default Logout;
