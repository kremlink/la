import {app} from '../../bf/base.js';
import {Metrika} from '../metrika.js';
import {MainView} from '../main/view.js';
import {PlayerView} from '../player/view.js';
//import {data} from './data.js';

export {data} from './data.js';

import {data as dat} from './data.js';
let data=app.configure({index:dat}).index,
    epIndex;

let events={};
events[`click ${data.events.start}`]='start';

export function init(app,modules){
 if(!~modules.indexOf('index'))
  return;

 new (Backbone.View.extend({
  events:events,
  el:data.view.el,
  initialize:function(){
   let mob=!matchMedia(data.minViewport).matches;

   epIndex=app.get('epIndex');

   new Metrika;//app.get('aggregator').trigger('metrika','start:one');
   new MainView;

   this.$el.toggleClass(data.view.tooSmallCls,mob);
   $(window).on('resize',_.debounce(()=>{
    mob=!matchMedia(data.minViewport).matches;
    this.$el.toggleClass(data.view.tooSmallCls,mob);
    //app.get('aggregator').trigger(mob?'player:pause':'player:play');//TODO: check if paused
   },200));
   document.addEventListener('contextmenu',e=>e.preventDefault());
   this.listenTo(app.get('aggregator'),'player:ready',this.loaded);
   this.listenTo(app.get('aggregator'),'page:fs',this.fs);
   this.listenTo(app.get('aggregator'),'page:timer',this.timer);
   this.listenTo(app.get('aggregator'),'main:step',this.pause);
   this.listenTo(app.get('aggregator'),'player:play',this.play);
   this.prepare();
  },
  prepare:function(){//inconsistent loadeddata event with multiple videos
   let imgs=[],
   wait=[];

   for(let [x,y] of Object.entries(data.preload[epIndex]))
   {
    if(y.imgs){
     imgs=y.imgs.map(t=>x+t);
    }
    if(y.i)
    {
     imgs=[];
     for(let i=1;i<=y.i;i++)
     {
      for(let j=1;j<=y.j[i-1];j++)
      {
       imgs.push(x+y.tmpl1.replace('[i]',i).replace('[j]',j));
       imgs.push(x+y.tmpl2.replace('[i]',i).replace('[j]',j));
      }
     }
    }
    wait.push(app.get('lib.utils.imgsReady')({src:imgs}));
   }
   $.when(wait).then(()=>new PlayerView);
  },
  loaded:function(){
   this.$el.addClass(data.view.loadedCls);
  },
  timer:function(){
   this.$el.addClass(data.view.timerCls);
  },
  start:function(){
   this.$el.addClass(data.view.startCls);
   app.get('aggregator').trigger('player:play',{});
  },
  fs:function(f){
   this.$el.toggleClass(data.view.fsCls,f);
  },
  pause:function({index:i,timecodeData:timecodeData}){
   if(!timecodeData.checkpoint)
    this.$el.addClass(data.view.pauseCls);
  },
  play:function(){
   this.$el.removeClass(data.view.pauseCls);
  }
 }));
}