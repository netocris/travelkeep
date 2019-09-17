import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import SimpleImage from '@editorjs/simple-image';
import Warning from '@editorjs/warning';
import Delimiter from '@editorjs/delimiter';

import { cPreview } from './json-preview';
import { firebaseService } from './firebase-service';

const editor = new EditorJS({
  /**
   * Id of Element that should contain Editor instance
   */
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
        console.log('Article data: ', data);
        cPreview.show(data, document.getElementById("output"));        
    }).catch((error) => {
        console.log('Saving failed: ', error);
    });
});

let loadBtn = document.querySelector('.load-btn');
loadBtn.addEventListener('click', function(){
    firebaseService.get('users', 'RjpvMCypjPRGIzKIp2RM');    
});