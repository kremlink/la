import {app} from '../../bf/base.js';
import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
let data=app.configure({vibrate:dat}).vibrate;

let events={};
events[`click ${data.events.click}`]='click';

export let VibrateView=BaseIntView.extend({
 events:events,
 vibrate:null,
 initialize:function(opts){
  this.type=opts.vibrate;
  BaseIntView.prototype.initialize.apply(this,[{
   el:data.view.el[this.type],
   data:data,
   type:this.type
  }]);

  this.$btn=this.$(data.events.click);

  switch (this.type)
  {
   case 'one':
    this.vibr();
    break;
   case 'two':
    this.shift();
  }
 },
 vid:function(no){
  let trsFlag=true;

  if(!no)
  {
   this.away();
  }else
  {
   this.$btn.addClass(data.view.hiddenCls);
   this.$video.on('ended',() =>{
    this.$el.addClass(data.view.doneCls);
   }).on('transitionend',()=>{
    if(trsFlag)
    {
     this.$video[0].src=data.ep2videoSrc;
     this.$video[0].loop=false;
     this.$video[0].play().then(()=>{
      this.$video.removeClass(data.view.hiddenCls);
     });
    }

    trsFlag=false;
   }).addClass(data.view.hiddenCls);
  }
 },
 shift:function(){
  let once;

  this.$video.on('timeupdate',()=>{
   let f=this.$video[0].currentTime>data.twoMoveBtnTime.when;

   if(!f)
   {
    once=false;
    this.$btn.toggleClass(data.view.twoMoveBtnCls,false);
   }
   if(f&&!once)
   {
    this.$video[0].currentTime=data.twoMoveBtnTime.where;
    once=true;
    this.$btn.toggleClass(data.view.twoMoveBtnCls,f);
   }
  });
 },
 vibr:function(){
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
  let click=$(e.currentTarget);

  if(this.type==='three')
  {
   if(click.hasClass(data.view.startCls))
    this.away(true);else
    this.vid(click.hasClass(data.view.errCls));
  }else
  {
   this.away();
  }
 }
});