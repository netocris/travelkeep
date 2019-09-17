import { firebaseConfig } from './firebase-config';

/**
 * Module for CRUD operations on firestore db
 */
const firebaseService = (function (module) {

    // Initialize Firebase    
    const db = firebase.initializeApp(firebaseConfig);
    const firestore = db.firestore();
    
    /**
     * get document from firebase
     * 
     * @param collection - collection
     * @param docId - document id
     */
    module.get = function(collection, docId) {
        const docRef = firestore.doc(collection + '/' + docId);
        docRef.onSnapshot(function(doc) {
            if(doc && doc.exists){
                const value = doc.data();
                console.log('value: ', value.displayName);    
            }
        });
    };
  
    /**
     * add value to firebase
     * 
     * @param collection - collection
     * @param docId - document id
     * @param value - value to add
     */
    module.add = function(collection, docId, value) {
        const docRef = firestore.doc(collection + '/' + docId);
        docRef.set(value).then(function() {
            console.log("Document written");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    };
      
    return module;
})({});

export { firebaseService }