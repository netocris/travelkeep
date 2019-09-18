import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import SimpleImage from '@editorjs/simple-image';
import Warning from '@editorjs/warning';
import Delimiter from '@editorjs/delimiter';

import { cPreview } from './json-preview';
import { firebaseService } from './firebase-service';

let loggedIn = false;

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
        console.log('saveBtn.click: ', JSON.stringify(data));
        cPreview.show(data, document.getElementById("output"));
    }).catch((error) => {
        console.log('Saving failed: ', error);
    });
});

let loadBtn = document.querySelector('.load-btn');
loadBtn.addEventListener('click', function(){    
    firebaseService.get('users', 'RjpvMCypjPRGIzKIp2RM');    
});

let loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', function(){
    console.log('isLogeedIn: ', loggedIn);
    if(loggedIn){
        firebaseService.signOut();
    } else {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebaseService.signInWithProvider(provider);    
    }    
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // user is signed in
        console.log('user is signed in');
        console.log('user: ', JSON.stringify(user.displayName));
        loggedIn = true;
        $('.login-btn').removeClass('auth-false').addClass('auth-true');
        $('.login-btn').html('Sign out');
        $('.user-area').html(user.displayName);
        
    } else {
        // No user is signed in.
        console.log('No user is signed in');
        loggedIn = false;
        $('.login-btn').removeClass('auth-true').addClass('auth-false');            
        $('.login-btn').html('Sign in');
        $('.user-area').html('');
    }
});

