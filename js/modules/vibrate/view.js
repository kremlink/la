import {BaseIntView} from '../BaseInteractiveView.js';
import {data} from './data.js';

let events={};
events[`click ${data.events.click}`]='click';

export let VibrateView=BaseIntView.extend({
 events:events,
 initialize:function(opts){
  BaseIntView.prototype.initialize.apply(this,[{
   el:data.view.el[opts.vibrate],
   data:data
  }]);

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
  this.away();
 }
});