import { cPreview } from './json-preview';
// import { firebaseService } from './firebase-service';

import userLogo from '../assets/images/neutral-user.png';

let loggedIn = false;

let userId = '-';

const timeout = 500;

const firestore = firebase.firestore();
const auth = firebase.auth();

let unsubscribe;

/* Authentication */
let loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', function(){
    if(loggedIn){
        // firebaseService.signOut();
        auth.signOut();
    } else {
        const provider = new firebase.auth.GoogleAuthProvider();
        // firebaseService.signInWithProvider(provider);
        auth.signInWithPopup(provider)
            .then(function(result){})
            .catch(function(error) {            
                console.log('error: ', error.code, error.message);
            });
    }    
});

auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log('onAuthStateChanged.loggedin'); 
        loggedIn = true;
        userId = user.uid;
        $('.login-user-img').attr('src', !isEmptyValue(user.photoURL) ? user.photoURL : userLogo);                
        $('.login-user-img').attr('title', user.displayName);        
        $('.container-fluid').removeClass('hide').addClass('show');
        $('.jumbotron').removeClass('show').addClass('hide');
        $('.login-btn').html('Sign out');
        $('.login-info').removeClass('hide').addClass('show');        
        $('.history').css('max-height', window.innerHeight - 119);
        loadItems('records/' + userId + '/items');
    } else {
        console.log('onAuthStateChanged.loggedout');
        unsubscribe();
        loggedIn = false;
        $('.login-info').removeClass('show').addClass('hide');
        $('.container-fluid').removeClass('show').addClass('hide');
        $('.jumbotron').removeClass('hide').addClass('show');
        $('.login-btn').html('Sign in');
        $('.login-user-img').attr('src', '');
        $('.login-user-img').attr('title', '');        
    }
});




const editor = new EditorJS({
    holder: 'editorjs',  
    autofocus: true,
    tools: {
        header: {
            class: Header,
            inlineToolbar: [ 
                'link'
            ],
            config: {
                placeholder: 'Header'
            },
        },
        list: {
            class: List,
            inlineToolbar: [ 
                'link',
                'bold'
            ]
        },
        image: {
            class: SimpleImage,
            inlineToolbar: ['link'],
        },
        embed: {
            class: Embed,
            inlineToolbar: false,
            config: {
                services: {
                    youtube: true,
                    coub: true
                }
            }
        },
        warning: Warning,
        delimiter: Delimiter,
    }
});

let saveBtn = document.querySelector('.save-btn');
saveBtn.addEventListener('click', function(){
    editor.save().then((data) => {     
                        
        delete data.version;
        // firebaseService.add('records/' + userId + '/items', data);

        firestore.collection('records/' + userId + '/items')
            .add(data)
            .then(function() {})
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

    }).catch((error) => {
        console.error('Saving failed: ', error);
    });
});

// let loadBtn = document.querySelector('.load-btn');
// loadBtn.addEventListener('click', function(){    
//     // const datas = firebaseService.getAll('records/' + userId + '/items');
//     firestore.collection('records/' + userId + '/items')
//         .get()
//         .then(function(querySnapshot) {
//             if(querySnapshot.empty){
//                 console.log('load() no documents found');                
//             } else {
//                 let docs = querySnapshot.docs.map(doc => doc.data());                
//                 cPreview.show(docs, document.getElementById("output"));
//             }
//         })
//         .catch(function(error) {
//             console.log("Error getting documents: ", error);
//         });

// });

function isEmptyValue(value) {
    if (value === undefined || value === null || value.split(' ').join('') === '') {
        return true;
    }
    return false;
};

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
};

setTimeout(function(){
    console.log('setTimeout');
    if(loggedIn){        
        loadItems('records/' + userId + '/items');
    }
 }, timeout);

 function loadItems(path) {
    console.log('loadItems: ', path);
    unsubscribe = firestore.collection(path).orderBy('time', 'desc').limit(1)
        .onSnapshot(function(querySnapshot) {
            let docs = [];
            if(querySnapshot.empty){
                docs.push('no documents found');                
            } else {
                docs = querySnapshot.docs.map(doc => doc.data());
            }
            cPreview.show(docs, document.getElementById("output"));
        }, function(error) {
            console.error('[' + error.code + '] ' + error.message);
        });

        // setTimeout(() => {
        //     unsubscribe();            
        // }, 1000);
    
 };

