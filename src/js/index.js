import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';

const editor = new EditorJS({
  /**
   * Id of Element that should contain Editor instance
   */
  holder: 'editorjs',

  tools: {
    header: {
        class: Header,
        inlineToolbar: [ 
            'link'
        ]
    },
    list: {
        class: List,
        inlineToolbar: [ 
            'link',
            'bold'
        ]
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
    }
  }

});

let saveBtn = document.querySelector('button');
saveBtn.addEventListener('click', function(){
    editor.save().then((data) => {
        console.log('Article data: ', data);
    }).catch((error) => {
        console.log('Saving failed: ', error);
    });
});