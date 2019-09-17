import { firebaseConfig } from './firebase-config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/*
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
});

docRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if(doc && doc.exists){
            console.log(`${doc.id} => ${doc.data().displayName}`);    
        }
    }).catch(function(error) {
        console.error("Error get document: ", error);
    });
});
*/
