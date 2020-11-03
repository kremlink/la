import {app} from '../../bf/base.js';
import {data as dat} from './data.js';
let data=app.configure({timer:dat}).timer,
    epIndex,arrEpIndex;

let s2t=function (t){
 return (new Date(t%86400*1000)).toUTCString().replace(/.*(\d{2}):(\d{2}):(\d{2}).*/,(s,p1,p2,p3)=>{
  return `${parseInt(t/86400)*24+parseInt(p1)}:${p2}:${p3}`;
 });
};

export let TimerView=Backbone.View.extend({
 el:data.view.el,
 done:false,
 time:null,
 timer:null,
 ctr:0,
 endFlag:false,
 initialize:function(opts){
  let throttle=_.throttle((curr)=>this.setPCurrent(curr),data.throttle,{leading:false});

  this.lsMgr=opts.lsMgr;

  epIndex=app.get('epIndex');
  arrEpIndex=epIndex-1;

  /*$('#wrap').addClass('start loaded');//TODO:remove
  setTimeout(()=>{
   $('.ov-wrap.map').addClass('shown');
   $('.overlay-block').addClass('shown');
   },100);//TODO:remove*/
  //this.$el.remove();//TODO:remove

  this.$timer=this.$(data.view.txt).text(s2t(this.time));
  this.$pop=this.$(data.view.pop);

  this.listenTo(app.get('aggregator'),'player:ended',this.ended);
  this.listenTo(app.get('aggregator'),'timer:update',this.change);
  this.listenTo(app.get('aggregator'),'timer:ini',this.ini);
  this.listenTo(app.get('aggregator'),'player:timeupdate',throttle);
 },
 ini:function(goOn=false){
  let ls=this.lsMgr.getData();

  this.time=goOn&&ls.pCurTime[arrEpIndex]?ls.curTime[arrEpIndex]:(epIndex>1&&~ls.time[arrEpIndex-1]?ls.time[arrEpIndex-1]:data[epIndex].start);
  if(!goOn)
  {
   ls.curTime[arrEpIndex]=this.time;
   ls.pCurTime[arrEpIndex]=0;
   this.lsMgr.setData(ls);
  }
  this.timer=setInterval(()=>{
   let t=this.time+(--this.ctr);

   if(t===0||t===-1)
   {
    this.tick(0);
    clearInterval(this.timer);
    this.$timer.text(s2t(0));
   }else
   {
    this.$timer.text(s2t(t));
    this.tick(t);
   }
  },1000);
 },
 setPCurrent:function(pCurTime){
  let ls;

  if(!this.endFlag)
  {
   ls=this.lsMgr.getData();

   ls.pCurTime[arrEpIndex]=pCurTime;
   this.lsMgr.setData(ls);
  }
 },
 ended:function(opts){
  let ls=this.lsMgr.getData();

  clearInterval(this.timer);
  ls.time[arrEpIndex]=this.time+this.ctr;
  this.endFlag=true;
  ls.pCurTime[arrEpIndex]=0;
  this.lsMgr.setData(ls);
  fetch(data.url+ls.time[arrEpIndex]).then(()=>opts.cb());
 },
 tick:function(t){
  let ls=this.lsMgr.getData();

  ls.curTime[arrEpIndex]=t;
  this.lsMgr.setData(ls);
 },
 change:function(opts){
  if(opts.time)
  {
   this.time+=opts.time;
   if(opts.text)
   {
    this.$pop.text(opts.text).on('animationend',()=>{
     this.$pop.removeClass(data.view.notifCls)
    }).addClass(data.view.notifCls);
   }
  }
 }
});