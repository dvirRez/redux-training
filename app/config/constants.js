/**
 * Created by Dvir on 1/16/2018.
 */
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDAHGxvbGt2VRh5GZTOZJVt-5tQBnI72Es",
    authDomain: "redux-course-be900.firebaseapp.com",
    databaseURL: "https://redux-course-be900.firebaseio.com",
    projectId: "redux-course-be900",
    storageBucket: "redux-course-be900.appspot.com",
    messagingSenderId: "810750642748"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;


