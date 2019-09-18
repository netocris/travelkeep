/**
 * Module for CRUD operations on firestore db
 */
const firebaseService = (function (module) {
   
    const firestore = firebase.firestore();
        
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

    /**
     * login using a service provider (Google, Twitter, GitHub, Facebook, ...)
     * 
     * @param provider - provider     
     */
    module.signInWithProvider = function(provider) {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log('user: ', JSON.stringify(user));
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('error: ', errorCode, errorMessage);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    };

    /**
     * login using a service provider (Google, Twitter, GitHub, Facebook, ...)
     * 
     * @param provider - provider     
     */
    module.signOut = function() {
        firebase.auth().signOut();
    };
      
    return module;
})({});

export { firebaseService }