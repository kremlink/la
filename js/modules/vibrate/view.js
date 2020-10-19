import {app} from '../../bf/base.js';
import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
let data=app.configure({interactives:{vibrate:dat}}).interactives.vibrate;

let events={};
events[`click ${data.events.go}`]='go';

export let VibrateView=BaseIntView.extend({
 events:events,
 vibrate:null,
 vidSrc:null,
 vibrInt:null,
 phase:0,
 initialize:function(opts){
  this.opts=opts;
  this.setElement(data.view.el[this.opts.data.type]);

  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   opts:opts
  }]);

  this.$btn=this.$(data.events.go);
  if(this.opts.data.type==='two')
   this.shift();
 },
 toggle:function(f){
  if(f&&this.opts.data.type==='one')
  {
   $(data.button.pDiv).css({transitionDuration:0+'s',width:0});
   setTimeout(()=>this.vibr(),50);
  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 clr:function(){
  this.$el.removeClass(data.view.doneCls);
  if(this.opts.data.type==='three')
  {
   this.$bgVideo[0].loop=true;
   this.$bgVideo[0].src=this.vidSrc;
  }
  if(this.opts.data.type==='four')
  {
   this.$bgVideo[0].src=this.vidSrc;
   this.phase=0;
  }

  this.$btn.removeClass(data.view.twoMoveBtnCls+' '+data.view.hiddenCls);
 },
 shift:function(){
  let once;

  this.$bgVideo.on('timeupdate',()=>{
   let f=this.$bgVideo[0].currentTime>data.twoMoveBtnTime.when;

   if(!f)
   {
    once=false;
    this.$btn.toggleClass(data.view.twoMoveBtnCls,false);
   }
   if(f&&!once)
   {
    this.$bgVideo[0].currentTime=data.twoMoveBtnTime.where;
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
   $(data.button.pDiv).css({transitionDuration:data.wait[this.opts.data.type]/1000+'s',width:'100%'});
   wTrs();
  },0)();
  this.$wobble.on('transitionend',(e)=>{
   if(e.originalEvent.propertyName==='transform')
   {
    this.$wobble.css('transition-duration',(Math.random()*data.button.wobbleDuration.spread+data.button.wobbleDuration.shift)+'s');
    wTrs();
   }
  });

  this.vibrInt=setInterval(()=>{
   let text;

   pCtr++;
   if(pCtr>data.wait[this.opts.data.type]/data.button.timerDivider)
    clearInterval(this.vibrInt);
   text=pCtr*data.button.timerDivider/1000;
   this.$pr.text(text>data.wait[this.opts.data.type]?data.wait[this.opts.data.type]/1000:text);
  },data.button.timerDivider);
 },
 threeVid:function(no){
  let trsFlag=true;

  if(!no)
  {
   this.away();
  }else
  {
   this.$btn.addClass(data.view.hiddenCls);
   this.$bgVideo.on('ended',() =>{
    this.$el.addClass(data.view.doneCls);
   }).on('transitionend',()=>{
    if(trsFlag)
    {
     this.$bgVideo[0].src=data.threeErrVideoSrc;
     this.$bgVideo[0].loop=false;
     this.$bgVideo[0].play().then(()=>{
      this.$bgVideo.removeClass(data.view.hiddenCls);
     });
    }

    trsFlag=false;
   }).addClass(data.view.hiddenCls);
  }
 },
 fourVid:function(no){
  let trsFlag=false;

  if(!no)
  {
   this.away();
  }else
  {
   this.$btn.addClass(data.view.hiddenCls);
   this.$bgVideo.on('ended',() =>{

   }).on('transitionend',()=>{
    if(trsFlag)
    {
     this.$bgVideo[0].src=data.four.errVideoSrc[0];
     this.$bgVideo[0].loop=false;
     this.$bgVideo[0].play().then(()=>{
      this.$bgVideo.removeClass(data.view.hiddenCls);
     });
    }

    trsFlag=true;
   }).on('timeupdate',()=>{
    this.$btn.toggleClass(data.view.hiddenCls,!(this.$bgVideo[0].currentTime>data.four.when));
   }).removeClass(data.view.hiddenCls)[0].play();
  }
 },
 go:function(e){
  let click=$(e.currentTarget);

  if(this.opts.data.type==='three'||this.opts.data.type==='four')
  {
   if(click.hasClass(data.view.startCls))
   {
    this.away(true);
   }else
   {
    this.vidSrc=this.$bgVideo[0].currentSrc;
    if(this.opts.data.type==='three')
     this.threeVid(click.hasClass(data.view.errCls));else
     this.fourVid(click.hasClass(data.view.errCls));
   }
  }else
  {
   this.away();
   clearInterval(this.vibrInt);
  }
 },
 away:function(failed,opts){
  this.clr();
  BaseIntView.prototype.away.apply(this,arguments);
 }
});