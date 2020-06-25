import {app} from '../../bf/base.js';
import {data} from './data.js';

export let PlayerView=Backbone.View.extend({
 el:data.view.el,
 initialize:function(){
  this.player=videojs(this.el,{},()=>{
   this.prepare();
  });
  this.listenTo(app.get('aggregator'),'player:play',this.play);
 },
 prepare:function(){
  let touched={};

  app.get('aggregator').trigger('player:ready');
  this.player.on('pause',()=>{
   if(app.get('isMobile'))
   {
    if(document.fullscreenElement)
     document.exitFullscreen();
   }else
   {
    if(this.player.isFullscreen())
     this.player.exitFullscreen();
   }
   app.get('aggregator').trigger('main:toggle',true);
  });
  this.player.on('play',()=>{
   app.get('aggregator').trigger('main:toggle',false);
   if(app.get('isMobile'))//TODO: already fullscreen, just add class for fixed video
    document.documentElement.requestFullscreen();else
    this.player.requestFullscreen();
  });
  if(app.get('isMobile'))
  {
   document.addEventListener('fullscreenchange',()=>{
    app.get('aggregator').trigger('main:fs',document.fullscreenElement);
   },false);
  }else
  {
   this.player.on('fullscreenchange',()=>{
    app.get('aggregator').trigger('page:fs',this.player.isFullscreen());
   });
  }

  this.player.on('touchstart',e=>{
   touched.x=e.touches[0].pageX;
   touched.y=e.touches[0].pageY;
  });
  this.player.on('touchend',e=>{
   if(Math.sqrt((touched.x-e.changedTouches[0].pageX)*(touched.x-e.changedTouches[0].pageX)+(touched.y-e.changedTouches[0].pageY)*(touched.y-e.changedTouches[0].pageY))<data.touchPlayRadius)
   {
    if(e.target.nodeName==='VIDEO')
    {
     if(this.player.paused())
      this.player.play();else
      this.player.pause();
    }
   }
  });
 },
 play:function(){
  if(this.player.paused)
   this.player.play();
 },
 pause:function(){
  this.player.pause();
 }
});