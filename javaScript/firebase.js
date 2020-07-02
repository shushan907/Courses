export var app_firebase = {};

var firebaseConfig = {
    apiKey: "AIzaSyDEmoq5dItu2tTMFoxYGrlKIY1ast9mEsU",
    authDomain: "staff-39706.firebaseapp.com",
    databaseURL: "https://staff-39706.firebaseio.com",
    projectId: "staff-39706",
    storageBucket: "staff-39706.appspot.com",
    messagingSenderId: "891907238564",
    appId: "1:891907238564:web:c6493e7e43cbbdbb9f9431",
    measurementId: "G-ZB4V6RQJP0"
};

firebase.initializeApp(firebaseConfig);
app_firebase = firebase;

export const database = firebase.database();

export function login() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            document.querySelector('.login').innerHTML = 'Log out'
        } else {
            document.querySelector('.login').innerHTML = 'Log in'
        }
    });
    
    document.querySelector('.login').addEventListener('click', () => {
        if(document.querySelector('.login').innerHTML == 'Log out') {
            firebase.auth().signOut();
        } else {
            document.querySelector('.login').href = '/login.html';
        }
    });
} 
