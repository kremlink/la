import {app} from '../../bf/base.js';
import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
let data=app.configure({vibrate:dat}).vibrate;

let events={};
events[`click ${data.events.click}`]='click';

export let VibrateView=BaseIntView.extend({
 events:events,
 initialize:function(opts){
  BaseIntView.prototype.initialize.apply(this,[{
   el:data.view.el[opts.vibrate],
   data:data,
   vibrate:opts.vibrate
  }]);

  this.$btn=this.$(data.events.click);

  if(opts.vibrate==='one')
   this.vibrate();
  if(opts.vibrate==='two'||opts.vibrate==='three')
   this.shift(opts.vibrate);
 },
 shift:function(type){
  let once;

  this.$video.on('timeupdate',()=>{
   let f=this.$video[0].currentTime>data.twoMoveBtnTime[type].when;

   if(!f)
   {
    once=false;
    this.$btn.toggleClass(data.view.twoMoveBtnCls,false);
   }
   if(f&&!once)
   {
    this.$video[0].currentTime=data.twoMoveBtnTime[type].where;
    once=true;
    this.$btn.toggleClass(data.view.twoMoveBtnCls,f);
   }
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
 click:function(e){
  this.away($(e.currentTarget).hasClass(data.view.errCls));
 }
});