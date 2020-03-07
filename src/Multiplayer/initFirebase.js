var firebaseConfig;
var firebaseInitted = false;

function initFirebase() {
	if (firebaseInitted)
		return false;
	// Your web app's Firebase configuration
	firebaseConfig = {
		apiKey: "AIzaSyBOqY_cWG2t0QXorhQqYZbnXf0BtDV6CZ4",
		authDomain: "beam-2e01a.firebaseapp.com",
		databaseURL: "https://beam-2e01a.firebaseio.com",
		projectId: "beam-2e01a",
		storageBucket: "beam-2e01a.appspot.com",
		messagingSenderId: "824969365172",
		appId: "1:824969365172:web:8f95a093bbfc54e45bf9e1"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebaseInitted = true;
}