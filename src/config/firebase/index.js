import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALKkgA0ra43eP42e2djpzn-yFAdbB_xbE",
  authDomain: "firebasic-ae33c.firebaseapp.com",
  databaseURL: "https://firebasic-ae33c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "firebasic-ae33c",
  storageBucket: "firebasic-ae33c.appspot.com",
  messagingSenderId: "177416418075",
  appId: "1:177416418075:web:e9626341dfcd7fa36dd9be",
  measurementId: "G-Q9WKB68LYS"
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;