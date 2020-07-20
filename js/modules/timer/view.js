import {app} from '../../bf/base.js';
import {data} from './data.js';

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
  $('#wrap').addClass('timer');
  this.time=data.start;
  this.$timer=this.$(data.view.txt).text(s2t(this.time));
  this.$pop=this.$(data.view.pop);

  this.timer=setInterval(()=>{
   this.$timer.text(s2t(this.time+(--this.ctr)));
  },1000);
  this.listenTo(app.get('aggregator'),'timer:update',this.change);

  //app.get('aggregator').trigger('timer:update',{time:-30,text:'lol'});
 },
 change:function(opts){
  this.time+=opts.time;
  this.$pop.text(opts.text).on('animationend',()=>{
   this.$pop.removeClass(data.view.remCls)
  }).addClass(data.view.remCls);
 }
});