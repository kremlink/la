import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';
import {utils} from '../../bf/lib/utils.js';

let events={};
events[`click ${data.events.go}`]='go';

export let RadarView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 dragging:false,
 mult:0,
 shift:{x:0,y:0},
 dragBounds:{h:0,v:0},
 done:false,
 initialize:function(){
  let shift={x:0,y:0};

  BaseIntView.prototype.initialize.apply(this,[{
   data:data
  }]);

  this.$drag=this.$(data.view.eye);
  this.$dragCont=this.$(data.view.dragCont);
  this.$drag.css({width:data.eyeSize.x+'em',height:data.eyeSize.y+'em'});
  this.mult=this.$drag.width()/data.eyeSize.x;
  this.dragBounds.h=this.$el.width()/this.mult;
  this.dragBounds.v=this.$el.height()/this.mult;
  shift.x=this.dragBounds.h/2-data.eyeSize.y/2;
  shift.y=this.dragBounds.v/2-data.eyeSize.y/2;
  this.$drag.css({transform:`translate(${shift.x}em,${shift.y}em)`,backgroundPosition:`-${shift.x}em -${shift.y}em`});
  this.shift.x=this.dragBounds.h/2-data.eyeSize.x/2;
  this.shift.y=this.dragBounds.v/2-data.eyeSize.y/2;
  this.drag();
  /*setTimeout(()=>{
   this.$el.addClass(data.view.doneCls);
   this.done=true;
  },data.winWait);*/
 },
 checkBoundaries:function(delta={},s=false){
  let v={x:this.shift.x+delta.x,y:this.shift.y+delta.y};

  if(v.x>this.dragBounds.h-data.eyeSize.x)
   v.x=this.dragBounds.h-data.eyeSize.x;
  if(v.x<0)
   v.x=0;
  if(v.y>this.dragBounds.v-data.eyeSize.y)
   v.y=this.dragBounds.v-data.eyeSize.y;
  if(v.y<0)
   v.y=0;

  if(s)
  {
   this.shift.x=v.x;
   this.shift.y=v.y;
  }

  return {x:v.x+'em',y:v.y+'em'};
 },
 setMapPos:function({delta,end=false}){
  let pos=this.checkBoundaries(delta,end);

  this.$drag.css({transform:`translate(${pos.x+','+pos.y})`,backgroundPosition:`-${pos.x} -${pos.y}`});
 },
 drag:function(){
  let start={x:0,y:0},
   delta;

  new utils.drag({
   both:true,
   mouse:true,
   container:this.$dragCont,
   threshold:0,
   downCallback:(opts)=>{
    start.x=opts.e[0].pageX;
    start.y=opts.e[0].pageY;
    this.dragging=true;
    delta={x:0,y:0};
   },
   dragCallback:(opts)=>{
    delta.x=(opts.e[0].pageX-start.x)/this.mult;
    delta.y=(opts.e[0].pageY-start.y)/this.mult;
    this.setMapPos({delta:delta});
   }
  });
  $(document).on('mouseup touchend',()=>{// touchend
   if(this.dragging)
   {
    this.dragging=false;
    this.setMapPos({delta:delta,end:true});
   }
  });
 },
 go:function(){
  if(this.done)
   this.away();else
   this.$el.addClass(data.view.okCls);
 }
});