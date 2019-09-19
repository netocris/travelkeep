/**
 * Module for CRUD operations on firestore db
 */
const firebaseService = (function (module) {
   
    const firestore = firebase.firestore();
    const auth = firebase.auth();
            
    /**
     * get document from firebase
     * 
     * @param path - document path 
     */
    module.get = function(path) {
        const docRef = firestore.doc(path);
        docRef.onSnapshot(function(doc) {
            if(doc && doc.exists){
                console.log(doc.data);                             
            }
        });
    };
  
    /**
     * add value to firebase
     *  
     * @param path - document path
     * @param value - value to add
     */
    module.add = function(path, value) {
        const colRef = firestore.collection(path);
        colRef.add(value).then(function() {
            console.log("Document saved ...");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    };

    /**
     * register a new user with email and password
     * 
     * @param email
     * @param password     
     */
    module.createUser = function(email, password) {
        auth().createUserWithEmailAndPassword(email, password).then(function(result) {
            console.log('login successfull');
        }).catch(function(error) {
            console.log('error: ', error.code, error.message);
        });
    };

    /**
     * login using an email and password
     * 
     * @param email
     * @param password      
     */
    module.signIn = function(email, password) {
        auth().signInWithEmailAndPassword(email, password).then(function(result) {
            console.log('login successfull');
        }).catch(function(error) {
            console.log('error: ', error.code, error.message);
        });
    };

    /**
     * login using a service provider (Google, Twitter, GitHub, Facebook, ...)
     * 
     * @param provider - provider     
     */
    module.signInWithProvider = function(provider) {
        auth.signInWithPopup(provider).then(function(result) {
            console.log('login successfull');   
        }).catch(function(error) {            
            console.log('error: ', error.code, error.message);
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