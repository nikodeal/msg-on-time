import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "put your api key here !!",
  authDomain: "domain her !!",
  projectId: "id here !!",
  storageBucket: "your info !!",
  messagingSenderId: "your info !!",
  appId: "here Tooo !!!!"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export default db;
