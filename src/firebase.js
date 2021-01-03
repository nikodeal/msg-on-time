import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDnhy9lk3bKUgo1-E57snDGSuDXqh-gig",
  authDomain: "sup-niko-deal.firebaseapp.com",
  projectId: "sup-niko-deal",
  storageBucket: "sup-niko-deal.appspot.com",
  messagingSenderId: "152289439143",
  appId: "1:152289439143:web:c8334470561af5a672da82"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export default db;
