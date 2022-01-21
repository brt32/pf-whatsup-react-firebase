import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAODpI6b98pFOI7XtoffkUeUPJwFFJnfTM",
  authDomain: "pf-whatsup-clone.firebaseapp.com",
  projectId: "pf-whatsup-clone",
  storageBucket: "pf-whatsup-clone.appspot.com",
  messagingSenderId: "607052496563",
  appId: "1:607052496563:web:f32670d5270ca0cf1ffac6",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage().ref("images");
const audioStorage = firebase.storage().ref("audios");
const createTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;

export {
  db,
  auth,
  provider,
  storage,
  audioStorage,
  createTimestamp,
  serverTimestamp,
};
