import { initializeApp } from "firebase/app"
import firebase from "firebase/compat/app"
import "firebase/compat/database"

const firebaseConfig = {
    apiKey: "AIzaSyArUSzTLAKSdQIoi9F3E2UA8Qc7Pu_GlUk",
    authDomain: "fyp-79526.firebaseapp.com",
    projectId: "fyp-79526",
    storageBucket: "fyp-79526.appspot.com",
    messagingSenderId: "538566254356",
    appId: "1:538566254356:web:5d7604b1d15dd0deb4ec01",
    measurementId: "G-MKDHPLNWWM"
}

// Initialize Firebase and Firestore
firebase.initializeApp(firebaseConfig)
const db = firebase.database()
export {db}