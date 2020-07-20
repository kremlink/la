import {app} from '../../bf/base.js';
import {data} from './data.js';

let events={};
events[`click ${data.events.click}`]='click';

export let VibrateView=Backbone.View.extend({
 events:events,
 initialize:function(opts){
  this.setElement(data.view.el[opts.vibrate]);
  this.$video=this.$(data.view.video);
  this.$btn=this.$(data.events.click);

  if(opts.vibrate==='one')
   this.vibrate();
  if(opts.vibrate==='two')
   this.shift();
 },
 shift:function(){
  this.$video.on('timeupdate',()=>{
   this.$btn.toggleClass(data.view.twoMoveBtnCls,this.$video[0].currentTime>data.twoMoveBtnTime);
  });
 },
 vibrate:function(){
  let x=0,
   y=0,
   pCtr=0,
   rand=()=>Math.floor(Math.random()*data.button.spread*2)-data.button.spread,
   wTrs=()=>{
    let oX=x,oY=y;

    x=rand();
    y=rand();

    if(x===oX&&y===oY)
     wTrs();
    this.$wobble.css('transform',`translate(${x}px,${y}px)`);
   };

  this.$wobble=this.$(data.button.wobble);
  this.$pr=this.$(data.button.pText);
  this.wait=null;

  _.debounce(()=>{
   $(data.button.pDiv).css({transitionDuration:data.wait/1000+'s',width:'100%'});
   wTrs();
  },0)();
  this.$wobble.on('transitionend',(e)=>{
   if(e.originalEvent.propertyName==='transform')
   {
    this.$wobble.css('transition-duration',(Math.random()*data.button.wobbleDuration.spread+data.button.wobbleDuration.shift)+'s');
    wTrs();
   }
  });

  let int=setInterval(()=>{
   let text;

   pCtr++;
   if(pCtr>data.wait/data.button.timerDivider)
    clearTimeout(int);
   text=pCtr*data.button.timerDivider/1000;
   this.$pr.text(text>data.wait?data.wait/1000:text);
  },data.button.timerDivider);
 },
 click:function(){
  clearTimeout(this.wait);
  app.get('aggregator').trigger('main:toggle',false);
  this.toggle(false);
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
  if(this.$video.length)
   this.$video[0][f?'play':'pause']();
  if(f)
  {
   this.wait=setTimeout(()=>{
    this.click();
   },data.wait)
  }
 },
});