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
 initialize:function(){
  let ls=JSON.parse(localStorage.getItem(app.get('ls')));

  epIndex=app.get('epIndex');

  this.time=epIndex>1&&~ls.time[epIndex-2]?ls.time[epIndex-2]:data[epIndex].start;

  /*$('#wrap').addClass('start loaded');//TODO:remove
  setTimeout(()=>{
   $('.ov-wrap.map').addClass('shown');
   $('.overlay-block').addClass('shown');
   },100);//TODO:remove*/
  //this.$el.remove();//TODO:remove

  this.$timer=this.$(data.view.txt).text(s2t(this.time));
  this.$pop=this.$(data.view.pop);

  this.timer=setInterval(()=>{
   let t=this.time+(--this.ctr);

   if(t===0||t===-1)
   {
    clearInterval(this.timer);
    this.$timer.text(s2t(0));
   }else
   {
    this.$timer.text(s2t(t));
   }
  },1000);
  this.listenTo(app.get('aggregator'),'player:ended',this.ended);
  this.listenTo(app.get('aggregator'),'timer:update',this.change);
 },
 ended:function(opts){
  let ls=JSON.parse(localStorage.getItem(app.get('ls')));

  ls.time[epIndex-1]=this.time+this.ctr;
  localStorage.setItem(app.get('ls'),JSON.stringify(ls));
  fetch(data.url+(this.time+this.ctr)).then(()=>opts.cb());
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