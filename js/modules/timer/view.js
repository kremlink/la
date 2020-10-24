import {app} from '../../bf/base.js';
import {data as dat} from './data.js';
let data=app.configure({timer:dat}).timer,
    epIndex;

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
  let time=localStorage.getItem(data.ls);

  epIndex=app.get('epIndex');
  /*$('#wrap').addClass('start loaded');//TODO:remove
  setTimeout(()=>{
   $('.ov-wrap.map').addClass('shown');
   $('.overlay-block').addClass('shown');
   },100);//TODO:remove*/
  //this.$el.remove();//TODO:remove
  if(time)
  {
   time=JSON.parse(time);
   if(epIndex>1)
    this.time=time[epIndex]?time[epIndex]:data[epIndex].start;
  }else
  {
   this.time=data[epIndex].start;
  }

  this.$timer=this.$(data.view.txt).text(s2t(this.time));
  this.$pop=this.$(data.view.pop);

  this.timer=setInterval(()=>{
   this.$timer.text(s2t(this.time+(--this.ctr)));
  },1000);
  this.listenTo(app.get('aggregator'),'timer:update',this.change);
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