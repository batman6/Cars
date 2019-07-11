import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCmDYj5V-zAqEZMrf2QnySvV-tUHHoJciA",
    authDomain: "aicumencars.firebaseapp.com",
    databaseURL: "https://aicumencars.firebaseio.com",
    projectId: "aicumencars",
    storageBucket: "aicumencars.appspot.com",
    messagingSenderId: "67037823017",
    appId: "1:67037823017:web:1d850c67e76187e9"
};
firebase.initializeApp(config);

export default firebase;