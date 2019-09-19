import { cPreview } from './json-preview';
import { firebaseService } from './firebase-service';

import userLogo from '../assets/images/neutral-user.png';

let loggedIn = false;

let userId = {};

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
        cPreview.show(data, document.getElementById("output"));
        firebaseService.add('records/' + userId + '/items', data);
    }).catch((error) => {
        console.log('Saving failed: ', error);
    });
});

let loadBtn = document.querySelector('.load-btn');
loadBtn.addEventListener('click', function(){    
    //const data = firebaseService.get('records/' + userId + '/items/LQg04OL9b4P3RFwoXHKF');    
    const docRef = firebase.firestore().doc('records/' + userId + '/items/LQg04OL9b4P3RFwoXHKF');
    docRef.onSnapshot(function(doc) {
        if(doc && doc.exists){
            console.log(doc);                                   
        }
    });       
});

let loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', function(){
    if(loggedIn){
        firebaseService.signOut();
    } else {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebaseService.signInWithProvider(provider);    
    }    
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        loggedIn = true;
        userId = user.uid;
        $('.login-user-img').attr('src', !isEmptyValue(user.photoURL) ? user.photoURL : userLogo);                
        $('.login-user-img').attr('title', user.displayName);        
        $('.login-btn').removeClass('auth-false').addClass('auth-true');
        $('.login-btn').html('Sign out');
        $('.login-info').removeClass('hide').addClass('show');
    } else {             
        loggedIn = false;
        $('.login-info').removeClass('show').addClass('hide');
        $('.login-btn').removeClass('auth-true').addClass('auth-false');            
        $('.login-btn').html('Sign in');
        $('.login-user-img').attr('src', '');
        $('.login-user-img').attr('title', '');
        
    }
});

function isEmptyValue(value) {
    if (value === undefined || value === null || value.split(' ').join('') === '') {
        return true;
    }
    return false;
};

