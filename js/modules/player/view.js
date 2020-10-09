import {app} from '../../bf/base.js';
import {data as dat} from './data.js';
let data=app.configure({player:dat}).player,
    epIndex;

export let PlayerView=Backbone.View.extend({
 el:data.view.el,
 timecodes:null,
 initialize:function(){
 epIndex=app.get('epIndex');

  this.timecodes=[...data.timecodes[epIndex]];
  this.player=videojs(this.el,{
   controlBar:{
    children:[
     "playToggle",
     "VolumePanel",
     "progressControl",
     "currentTimeDisplay",
     "timeDivider",
     "durationDisplay"
    ]
   },
   plugins:{

   }
  },()=>{
   this.prepare();
  });
  this.listenTo(app.get('aggregator'),'player:play',this.play);
  this.listenTo(app.get('aggregator'),'player:pause',this.pause);
 },
 prepare:function(){
  let touched={},
   time=Date.now(),
   xhr,br,size;

  xhr=new XMLHttpRequest();
  xhr.open('GET',data.testSpeedFile+'?'+time,true);
  xhr.responseType='blob';
  xhr.onload=()=>{
   let index;
   size=xhr.response.size/1024/1024*8;
   time=(Date.now()-time)/1000;
   br=size/time;
   index=data.quality[epIndex].findIndex((o)=>o.speed[0]<br&&o.speed[1]>=br);
   //console.log(br,index);

   data.quality[epIndex].unshift({selected:true,label:'auto',src:data.quality[epIndex][index].src+'?'+Date.now()});
   this.player.controlBar.addChild('QualitySelector');
   this.player.src(data.quality[epIndex]);

   app.get('aggregator').trigger('player:ready');
  };
  xhr.send();
  if(app.get('_dev'))
   this.player.muted(true);
  this.player.on('pause',()=>{
   /*if(document.fullscreenElement)
    document.exitFullscreen();*/
   //app.get('aggregator').trigger('main:toggle',true);
  });
  this.player.on('play',()=>{
   //app.get('aggregator').trigger('main:toggle',false);
   if(!app.get('_dev'))
    document.documentElement.requestFullscreen();
  });
  this.player.on('ended',()=>{
   location.href=data.redirect[epIndex];
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
     app.get('aggregator').trigger('main:step',{index:i,timecodeData:o});
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