import { initializeApp } from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";
import {
	orderBy,
	getFirestore,
	collection,
	query,
	where,
	getDocs,
	addDoc,
	doc,
	updateDoc,
} from "firebase/firestore";


const firebaseConfig = {
	apiKey: "AIzaSyDzaNcqWDwiXw6IWpTNvOHp3boPLf-g5C8",
	authDomain: "eventify-386a2.firebaseapp.com",
	projectId: "eventify-386a2",
	storageBucket: "eventify-386a2.appspot.com",
	messagingSenderId: "353403369462",
	appId: "1:353403369462:web:c83c8f863f4fdea25279d7",
	measurementId: "G-N3MDF9RPY2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;

		// Check if user exists in Firestore
		const q = query(collection(db, "users"), where("uid", "==", user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length < 1) {
			// Add user to Firestore if not already exists
			const newUserRef = await addDoc(collection(db, "users"), {
				uid: user.uid,
				name: user.displayName,
				email: user.email,
				photo: user.photoURL,
				date: new Date(),
			});
			console.log(
				"User does not exists in Firestore. New user added with ID: ",
				newUserRef.id,
			);
		} else {
			console.log("User already exists in Firestore. No updates needed.");
		}
		console.log("Popup is successfull. Proceeding...");
	} catch (error) {
		if (error == "FirebaseError: Firebase: Error (auth/popup-closed-by-user).")
			console.log("User closed login popup.");
	}
};

const logInWithEmailAndPassword = async (email, password) => {
	await signInWithEmailAndPassword(auth, email, password);
};

const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const q = query(collection(db, "users"), where("email", "==", email));
		const docs = await getDocs(q);

		if (docs.docs.length < 1) {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			const user = res.user;
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				photo: "",
				name,
				email,
				date: new Date(),
			});
			return "Success";
		} else {
			// console.log("User already exists in Firestore");
			return "User already exists in Firestore";
		}
	} catch (err) {
		console.error(err);
		return err.message;
	}
};

const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert("Password reset link sent!");
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const logout = () => {
	signOut(auth);
};

const checkIfUserHasRSPVed = async (usr, evnt) => {
	console.log("check >> ",usr, evnt);
	const q = query(collection(db, "events"), where("uid", "==", evnt));
	const docs = await getDocs(q);
	if (docs.docs[0]?.data()) {
		let data2 = docs.docs[0].data();
		let participants = data2.participants;
		if (participants.indexOf(usr) >= 0) {
			console.log("check if rspved: true");
			return true;
		} else {
			console.log("check if rspved: false");
			return false;
		}
	}
};


const removeUserFromEvent = async (usr, evnt) => {
	const eventRef = await query(collection(db, "events"), where("uid", "==", evnt));
	const eventDoc = await getDocs(eventRef);
	const eventData = eventDoc.docs[0].data();
	const docID = eventDoc.docs[0].id;
	const updParticipants = eventData.participants.filter((id) => id !== usr);
	const docRef = await doc(db, "events", docID);
	await updateDoc(docRef, {
		participants: updParticipants,
	});
	return updParticipants
};

const addUserFromEvent = async (usr, evnt) => {
	const eventRef = await query(collection(db, "events"), where("uid", "==", evnt));
	const eventDoc = await getDocs(eventRef);
	const eventData = eventDoc.docs[0].data();
	const docID = eventDoc.docs[0].id;

	eventData.participants.push(usr)
	const eventRef2 = await doc(db, "events", docID);
	await updateDoc(eventRef2, {
		participants: eventData.participants,
	});
	return eventData.participants
};

export {
	checkIfUserHasRSPVed,
	removeUserFromEvent,
	addUserFromEvent,
	auth,
	db,
	signInWithPopup,
	signInWithGoogle,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
};