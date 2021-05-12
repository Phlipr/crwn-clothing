import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDJ44kCtfYkoiJdEUwbk4jyazYG-LMoDec",
    authDomain: "crwn-db-e71c7.firebaseapp.com",
    projectId: "crwn-db-e71c7",
    storageBucket: "crwn-db-e71c7.appspot.com",
    messagingSenderId: "75786376195",
    appId: "1:75786376195:web:6b976aa775f33268762a36",
    measurementId: "G-460JYTTF97"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;