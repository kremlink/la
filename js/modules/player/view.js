import {app} from '../../bf/base.js';
import {data} from './data.js';

export let PlayerView=Backbone.View.extend({
 el:data.view.el,
 initialize:function(opts){
  this.timecodes=opts.timecodes;
  this.player=videojs(this.el,{},()=>{
   this.prepare();
  });
  this.listenTo(app.get('aggregator'),'player:play',this.play);
  this.listenTo(app.get('aggregator'),'player:pause',this.pause);
 },
 prepare:function(){
  let touched={};

  this.player.controlBar.addChild('QualitySelector');
  this.player.src(data.quality);
  app.get('aggregator').trigger('player:ready');
  this.player.on('pause',()=>{
   /*if(document.fullscreenElement)
    document.exitFullscreen();*/
   //app.get('aggregator').trigger('main:toggle',true);
  });
  this.player.on('play',()=>{
   //app.get('aggregator').trigger('main:toggle',false);
   //document.documentElement.requestFullscreen();//TODO: uncomment
  });
  /*document.addEventListener('fullscreenchange',()=>{
   app.get('aggregator').trigger('page:fs',document.fullscreenElement);
  },false);*/

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

  this.player.on('timeupdate',()=>{
   this.timecodes.forEach((o,i)=>{
    if(this.player.currentTime()>o.start&&!o.invoked)
    {
     app.get('aggregator').trigger('main:step',i);
     o.invoked=true;
    }
   });
  });
 },
 play:function(time=-1){
  if(this.player.paused)
  {
   if(~time)
    this.player.currentTime(time);
   this.player.play();
  }
 },
 pause:function(){
  this.player.pause();
 }
});