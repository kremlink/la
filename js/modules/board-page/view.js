import {app} from '../../bf/base.js';
import {data} from './data.js';

export {data} from './data.js';

export function init(){
 app.set({dest:'board.menu',object:'Toggle',add:data.menu});

 {
  $(data.redo.item).on('click',()=>{
   localStorage.setItem(app.get('ls'),'');
   fetch(data.redo.url).then(()=>{
    location.href=data.redo.redir;
   });
  });
 }
}