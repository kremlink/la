import {app} from './bf/base.js';

import * as index from './modules/index-page/view.js';
import * as board from './modules/board-page/view.js';

import {utils} from './bf/lib/utils.js';
import {Toggle} from './bf/lib/toggle.js';
//------------------------
const dataApp=app.get('helpers.html').data('app'),
      modules=dataApp.modules;
//------------------------
let lsName='la-storage-ng',
lsIniVal={name:'',points:{ini:0},time:[-1,-1,-1,-1]};

app.set({dest:'objects.aggregator',object:_.extend({},Backbone.Events)});
app.set({dest:'objects.ls',object:lsName,lib:false});

if(~modules.indexOf('index'))
{
 app.init({
  //plugins:[Toggle],
  plugins:[{object:utils,name:'utils'}],
  settings:{}
 });

 app.set({dest:'objects.isMobile',object:matchMedia(index.data.mobViewport).matches});
 app.set({dest:'objects.epIndex',object:dataApp.index});

 if(!localStorage.getItem(lsName))
  localStorage.setItem(lsName,JSON.stringify(lsIniVal));

 app.get('aggregator').on('ls:clr',(ls)=>{
  for(let [x,y] of Object.entries(lsIniVal))
   ls[x]=y;
 });


 app.set({dest:'objects._dev',object:true});//TODO:remove
//app.set({dest:'objects.isPomoi',object:/iPad|iPhone|iPod/.test(navigator.platform)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)});

 $(()=>{
  index.init();
 });
}

if(~modules.indexOf('board'))
{
 app.init({
  plugins:[Toggle]
 });

 $(()=>{
  board.init();
 });
}