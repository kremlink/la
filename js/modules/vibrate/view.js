import {app} from '../../bf/base.js';
import {data} from './data.js';

let events={};
events[`click ${data.events.click}`]='click';

export let VibrateView=Backbone.View.extend({
 el:data.view.el,
 events:events,
 initialize:function(){
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
   $(data.button.pDiv).css({transitionDuration:data.button.progress+'s',width:'100%'});
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
   if(pCtr>data.button.progress/data.button.timerDivider*1000)
    clearTimeout(int);
   text=pCtr*data.button.timerDivider/1000;
   this.$pr.text(text>data.button.progress?data.button.progress:text);
  },data.button.timerDivider);
 },
 click:function(){
  clearTimeout(this.wait);
  app.get('aggregator').trigger('main:toggle',false);
  this.toggle(false);
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
  if(f)
  {
   this.wait=setTimeout(()=>{
    console.log('fired!');
    this.click();
   },data.wait)
  }
 },
});