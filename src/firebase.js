import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDfGXFNMm1WnRrE7g3gzOC7TZvB7RxMoI4",
	authDomain: "registration-app-d5fcb.firebaseapp.com",
	projectId: "registration-app-d5fcb",
	storageBucket: "registration-app-d5fcb.appspot.com",
	messagingSenderId: "539952265099",
	appId: "1:539952265099:web:1fc8f839955950eab9618e",
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
