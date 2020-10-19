import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';

let events={};
events[`click ${data.events.start}`]='start';
events[`click .${data.view.thingCls}`]='choose';

export let SchemeView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 angles:[],
 initialize:function(opts){
  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   opts:opts
  }]);

  this.thTemplate=_.template($(data.view.thTemplate).html());
  this.render();
 },
 clr:function(){
  this.angles=[];
  this.$el.removeClass(data.view.startCls+' '+data.view.doneCls);
  this.render();
 },
 render:function(){
  let s='';

  data.things.forEach((o)=>{
   this.angles.push(Math.floor(Math.random()*4));
   s+=this.thTemplate($.extend(o,{angle:this.angles[this.angles.length-1]*90,already:this.checkCorrect(this.angles.length-1)}));
  });

  this.$(data.view.into).html(s);
 },
 checkCorrect:function(index){
  return this.angles[index]%(data.things[index].type===1?2:4)===data.things[index].correct;
 },
 start:function(){
  this.$el.addClass(data.view.startCls);
 },
 choose:function(e){
  let thing=$(e.currentTarget),
   index=thing.index(),
   done=true;

  this.angles[index]++;
  thing.css('transform',`rotate(${this.angles[index]*90}deg)`).toggleClass(data.view.correctCls,this.checkCorrect(index));

  data.things.forEach((o,i)=>{
   if(!this.checkCorrect(i))
    done=false;
  });
  if(done)
  {
   this.$el.addClass(data.view.doneCls);
   setTimeout(()=>{
    this.away();
    this.clr();
   },data.time);
  }
 }
});