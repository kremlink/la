import {app} from '../../bf/base.js';
import {data as dat} from './data.js';
let data=app.configure({timer:dat}).timer,
    epIndex,
    ls;

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
 ls:null,
 initialize:function(){
  epIndex=app.get('epIndex');

  this.ls=JSON.parse(localStorage.getItem(app.get('ls')));
  this.time=epIndex>1&&~this.ls.time[epIndex-2]?this.ls.time[epIndex-2]:data[epIndex].start;

  /*$('#wrap').addClass('start loaded');//TODO:remove
  setTimeout(()=>{
   $('.ov-wrap.map').addClass('shown');
   $('.overlay-block').addClass('shown');
   },100);//TODO:remove*/
  //this.$el.remove();//TODO:remove

  this.$timer=this.$(data.view.txt).text(s2t(this.time));
  this.$pop=this.$(data.view.pop);

  this.timer=setInterval(()=>{
   this.$timer.text(s2t(this.time+(--this.ctr)));
  },1000);
  this.listenTo(app.get('aggregator'),'player:ended',this.ended);
  this.listenTo(app.get('aggregator'),'timer:update',this.change);
 },
 ended:function(){
  this.ls.time[epIndex-1]=this.time+this.ctr;
  localStorage.setItem(app.get('ls'),JSON.stringify(this.ls));
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