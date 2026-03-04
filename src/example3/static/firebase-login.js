'use strict'

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFEQL7nROaFRzG49oPIGlSWQaiLBIFvik",
    authDomain: "csp-example.firebaseapp.com",
    projectId: "csp-example",
    storageBucket: "csp-example.firebasestorage.app",
    messagingSenderId: "516959107438",
    appId: "1:516959107438:web:fb856f4db9dd2e1f4f697f",
    measurementId: "G-ZD2XWVGN9J"
};

// Initialize Firebase


window.addEventListener("load", function () {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth()


    updateUI(document.cookie)
    console.log("Hello world load")


    this.document.getElementById("sign-up").addEventListener('click', function () {
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        createUserWithEmailAndPassword(auth, email, password)
            .then(
                (userCredential) => {
                    const user = userCredential.user

                    user.getIdToken().then(
                        (token) => {
                            document.cookie = "token=" + token + ";path=/;SameSite=Strict";
                            window.location = "/";
                        }
                    )
                }
            ).catch((error) => {
                console.log(error.code + error.message);
            })
    })


    // login 
    document.getElementById("login").addEventListener('click',
        function () {
            const email = document.getElementById("email").value
            const password = document.getElementById("password").value

            signInWithEmailAndPassword(auth, email, password)
                .then(
                    (userCredential) => {
                        const user = userCredential.user;

                        console.log("logged in ")

                        user.getIdToken().then((token) => {
                            document.cookie = "token=" + token + ";path=/;SameSite=Strict";
                            window.location = "/";
                        })
                    }
                ).catch((error) => {
                    console.log(error.code + error.message)
                })
        }
    )

    document.getElementById("sign-out").addEventListener('click', function () {
        signOut(auth)
            .then((output) => {
                document.cookie = "token=" + token + ";path=/;SameSite=Strict";
                window.location = "/";
            })
    });


})


function updateUI(cookie) {
    var token = parseCookieToken(cookie);

    if (token.length > 0) {
        document.getElementById("login-box").hidden = true;
        document.getElementById("sign-out").hidden = false;
    } else {
        document.getElementById("login-box").hidden = false;
        document.getElementById("sign-out").hidden = true;
    }
}


function parseCookieToken(cookie) {
    var string = cookie.split(";")
    for (let i = 0; i < strings.length; i++) {
        var temp = strings[i].split("=");
        if (temp[0] == "token")
            return temp[1];
    }
    return ""
}



