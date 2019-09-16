// The core Firebase JS SDK is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCox4aXDOTGXuOYvUhc_SLKaDN1GcJbqWw",
    authDomain: "travelkeep-db.firebaseapp.com",
    databaseURL: "https://travelkeep-db.firebaseio.com",
    projectId: "travelkeep-db",
    storageBucket: "",
    messagingSenderId: "891932861815",
    appId: "1:891932861815:web:53682727fe7d0fddcfad72"
};

// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);

const firestore = db.firestore();
const docRef = firestore.doc('users/RjpvMCypjPRGIzKIp2RM');
docRef.set({
    email: 'netocris@gmail.com',
    displayName: 'Cristóvão Neto',
    photoUrl: 'https://lh5.googleusercontent.com/-qkMkXEF6HpQ/AAAAAAAAAAI/AAAAAAAAADI/J8vzxmDNSpI/photo.jpg',
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
}).then(function() {
    console.log("Document written");
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

docRef.onSnapshot((doc) => {    
    if(doc && doc.exists){
        console.log('displayName: ', doc.data().displayName);    
    };
});

/*
colRef.add({
    email: 'netocris@gmail.com',
    displayName: 'Cristóvão Neto',
    photoUrl: 'https://lh5.googleusercontent.com/-qkMkXEF6HpQ/AAAAAAAAAAI/AAAAAAAAADI/J8vzxmDNSpI/photo.jpg'
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});*/

/*docRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if(doc && doc.exists){
            console.log(`${doc.id} => ${doc.data().displayName}`);    
        }
    }).catch(function(error) {
        console.error("Error get document: ", error);
    });
});*/
