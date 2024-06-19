import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyByXUkD43t2fa_tKcTvgf6C51_bwFLbpY0",
    authDomain: "locketv2.firebaseapp.com",
    projectId: "locketv2",
    storageBucket: "locketv2.appspot.com",
    messagingSenderId: "770788738433",
    appId: "1:770788738433:web:7820ab75ff26f3f83d5480",
    measurementId: "G-BKJKR8HXDQ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
