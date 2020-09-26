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
 dotTimeout:null,
 shift:{x:0,y:0},
 dragBounds:{h:0,v:0},
 done:false,
 initialize:function(){
  let shift={x:0,y:0};

  BaseIntView.prototype.initialize.apply(this,[{
   data:data
  }]);

  this.$drag=this.$(data.view.eye);
  //this.$dot=this.$(data.view.dot).css({left:data.dotCoords.x+'em',top:data.dotCoords.y+'em'});
  this.$dragCont=this.$(data.view.dragCont);
  this.$drag.css({width:data.eyeSize.x+'em',height:data.eyeSize.y+'em'});
  this.mult=this.$drag.width()/data.eyeSize.x;
  this.dragBounds.h=this.$el.width()/this.mult;
  this.dragBounds.v=this.$el.height()/this.mult;
  shift.x=this.dragBounds.h/2-data.eyeSize.y/2;
  shift.y=this.dragBounds.v/2-data.eyeSize.y/2;
  this.$drag.css({transform:`translate(${shift.x}em,${shift.y}em)`,'--f':data.eyeSize.x/this.mult/data.blurMult+'em',
   '--x':-shift.x+'em','--y':-shift.y+'em','--w':this.dragBounds.h+'em','--h':this.dragBounds.v+'em'});
  this.shift.x=this.dragBounds.h/2-data.eyeSize.x/2;
  this.shift.y=this.dragBounds.v/2-data.eyeSize.y/2;
  this.drag();
  lottie.loadAnimation({
   container:this.$(data.view.anim)[0],
   renderer:'svg',
   loop:true,
   animationData:data.lottie
  });
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

  return {x:v.x,y:v.y};
 },
 setMapPos:function({delta,end=false}){
  let pos=this.checkBoundaries(delta,end),
  len=Math.sqrt((data.dotCoords.x-(pos.x+data.eyeSize.x/2))*(data.dotCoords.x-(pos.x+data.eyeSize.x/2))+
   (data.dotCoords.y-(pos.y+data.eyeSize.y/2))*(data.dotCoords.y-(pos.y+data.eyeSize.y/2)));

  this.$drag.css({transform:`translate(${pos.x+'em,'+pos.y}em)`,'--x':-pos.x+'em','--y':-pos.y+'em'});

  if(len<=data.eyeSize.x)
   this.$drag.css('--f','0em');
  if(len>data.eyeSize.x&&len<=data.eyeSize.x*7)
   this.$drag.css('--f',(len-data.eyeSize.x)/this.mult/data.blurMult+'em');
  if(len>data.eyeSize.x*7)
   this.$drag.css('--f',data.eyeSize.x*6/this.mult/data.blurMult+'em');

  if(len<data.eyeSize.x/2)
  {
   if(!this.dotTimeout)
   {
    this.dotTimeout=setTimeout(()=>{
     this.dragging=false;
     this.$dragCont.addClass(data.view.wonCls);
     pos.x=data.dotCoords.x-data.eyeSize.x/2;
     pos.y=data.dotCoords.y-data.eyeSize.y/2;
     this.$drag.css({transform:`translate(${pos.x+'em,'+pos.y}em)`,'--x':-pos.x+'em','--y':-pos.y+'em','--f':'0em'});
     setTimeout(()=>{
      this.$el.addClass(data.view.doneCls);
      this.done=true;
     },data.winWait);
    },data.dotWait);
   }
  }else
  {
   clearTimeout(this.dotTimeout);
   this.dotTimeout=null;
  }
 },
 drag:function(){
  let start={x:0,y:0},
   delta,
  nope;

  new utils.drag({
   both:true,
   mouse:true,
   container:this.$dragCont,
   threshold:0,
   downCallback:(opts)=>{
    if(!$(opts.e[0].target).closest(this.$drag).length)
     nope=true;
    if(!nope)
    {
     start.x=opts.e[0].pageX;
     start.y=opts.e[0].pageY;
     this.dragging=true;
     delta={x:0,y:0};
    }
   },
   dragCallback:(opts)=>{
    if(!nope&&this.dragging)
    {
     delta.x=(opts.e[0].pageX-start.x)/this.mult;
     delta.y=(opts.e[0].pageY-start.y)/this.mult;
     this.setMapPos({delta:delta});
    }
   }
  });
  $(document).on('mouseup touchend',()=>{// touchend
   nope=false;
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