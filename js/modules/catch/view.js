import {app} from '../../bf/base.js';
import {data} from './data.js';

let mri=function(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
 },
 mra=function(min,max){
  return Math.random()*(max-min)+min;
 },
 cRand=function(c,dim){
  let m=0;

  if(c===0)
   m=1;
  if(c===dim)
   m=-1;
  if(c!==0&&c!==dim)
   m=(Math.random()<0.5?-1:1);

  return m*mri(data.minSh,data.maxSh);
 };

let events={};
events[`click ${data.events.click}`]='click';
events[`click .${data.view.thingCls}`]='add';

export let CatchView=Backbone.View.extend({
 el:data.view.el,
 events:events,
 tmp:null,
 pData:{coords:[],delay:[]},
 initialize:function(){
  let self=this,
   border=100-data.maxD,
   s='';

  data.things.forEach((o)=>{
   this.tmp={x:mri(data.maxD,border),y:mri(data.maxD,border)};
   this.pData.coords.push(this.tmp);
   s+='<div class="'+data.view.thingCls+'" style="width:'+o.width+'%;left:'+this.tmp.x+'%;top:'+this.tmp.y+'%;"></div>';
  });

  this.$(data.view.into).html(s);

  this.$('.'+data.view.thingCls).each(function(i){
   let obj=$(this);

   _.debounce(()=>self.play(i,obj),0)();
   obj.on('transitionend',function(e){
    if(e.originalEvent.propertyName==='left')
     self.play(i,obj);
   });
  });
 },
 play:function(i,obj){
  let border=100-data.maxD;

  this.tmp={x:this.pData.coords[i].x+cRand(this.pData.coords[i].x,border),y:this.pData.coords[i].y+cRand(this.pData.coords[i].y,border)};
  if(this.tmp.x===this.pData.coords[i].x||this.tmp.y===this.pData.coords[i].y)
  {
   play(i,obj);
   return;
  }
  if(this.tmp.x<data.maxD)
   this.tmp.x=data.maxD;
  if(this.tmp.x>border)
   this.tmp.x=border;
  if(this.tmp.y<data.maxD)
   this.tmp.y=data.maxD;
  if(this.tmp.y>border)
   this.tmp.y=border;

  obj.css({'transition-duration':mra(data.minSpeed,data.maxSpeed)+'s',left:this.tmp.x+'%',top:this.tmp.y+'%'});
  this.pData.coords[i].x=this.tmp.x;
  this.pData.coords[i].y=this.tmp.y;
 },
 click:function(){
  this.$el.addClass(data.view.startCls);
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
  /*app.get('aggregator').trigger('main:toggle',false);
  this.toggle(false);*/
 },
 add:function(){

 }
});