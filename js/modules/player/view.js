import {app} from '../../bf/base.js';
import {data as dat} from './data.js';
let data=app.configure({player:dat}).player,
    epIndex;

let events={};
events[`click ${data.events.jBack}`]='jBack';
events[`click ${data.events.iBack}`]='iBack';
events[`click ${data.events.iiBack}`]='iiBack';

export let PlayerView=Backbone.View.extend({
 events:events,
 el:data.view.el,
 extTemplate:null,
 timecodes:null,
 initialize:function(){
  let ext=$(data.view.extTemplate);

  epIndex=app.get('epIndex');

  this.extTemplate=ext.length?_.template($(data.view.extTemplate).html()):()=>{};
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
 jBack:function(){
  this.play({time:this.player.currentTime()-10});
 },
 iBack:function(){
  let where=this.timecodes.filter(o=>o.repeatable&&o.start<this.player.currentTime()),
  what=where[where.length-1];

  if(where.length)
   this.play({time:what.start,clr:what});
 },
 iiBack:function(){
  let index=0;

  this.play({time:this.timecodes[index].start,clr:this.timecodes[index]});
 },
 prepare:function(){
  let touched={},
   //time=Date.now(),
   //xhr,br,size,
  firstTime=true;

  this.setElement(data.view.el);
  this.$el.append(this.extTemplate());

  data.quality[epIndex].unshift({selected:true,label:'auto',src:data.quality[epIndex][data.quality[epIndex].findIndex((o)=>matchMedia(o.width).matches)].src+'?'+Date.now()});
  this.player.controlBar.addChild('QualitySelector');
  this.player.src(data.quality[epIndex]);

  /*xhr=new XMLHttpRequest();
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
  };
  xhr.send();*/
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
   app.get('aggregator').trigger('player:ended');
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
   this.timecodes.forEach((o)=>{
    if((o.start<0?this.player.currentTime()>this.player.duration()+o.start:this.player.currentTime()>o.start)&&!o.invoked)
    {
     app.get('aggregator').trigger('main:step',o);
     o.invoked=true;
    }
   });
  });

  this.player.on('canplay',()=>{
   if(firstTime)
    app.get('aggregator').trigger('player:ready');
   firstTime=false;
  });
 },
 play:function({time=-1,clr=null}){
  if(this.player.paused)
  {
   if(~time)
   {
    this.player.currentTime(time);
    this.timecodes.forEach((o)=>{
     if(time<o.start&&o.repeatable)
      o.invoked=false;
    });
    if(clr)
     clr.invoked=false;
   }
   this.player.play();
  }
 },
 pause:function(){
  this.player.pause();
 }
});