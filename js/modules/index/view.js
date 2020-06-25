import {MainView} from '../main/view.js';
import {PlayerView} from '../player/view.js';
import {data} from './data.js';

export {data} from './data.js';

//import {data as dat} from './data.js';
//let data=app.configure({index:dat}).index;

let events={};
events[`click ${data.events.start}`]='start';

export function init(app,modules){
 if(!~modules.indexOf('index'))
  return;

 new (Backbone.View.extend({
  events:events,
  el:data.view.el,
  initialize:function(){
   this.playerView=new PlayerView;
   this.mainView=new MainView;

   if(!matchMedia(data.minViewport).matches)
    this.$el.addClass(data.view.tooSmallCls);
   $(window).on('resize',_.debounce(function(){
    //location.reload();TODO: uncomment
   },200));
   this.listenTo(app.get('aggregator'),'player:ready',this.playerReady);
   this.listenTo(app.get('aggregator'),'page:fs',this.fs);
  },
  playerReady:function(){
   this.$el.imagesLoaded(()=>{
    this.$el.addClass(data.view.loadedCls);

   });
  },
  start:function(){
   this.$el.addClass(data.view.startCls);
   //if(app.get('isMobile'))
    //document.documentElement.requestFullscreen();
   app.get('aggregator').trigger('player:play');//TODO: uncomment
  },
  fs:function(f){
   this.$el.toggleClass(data.view.fsCls,f);
  }
 }));
}