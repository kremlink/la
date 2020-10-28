import {app} from '../../bf/base.js';
import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';

let events={};
events[`click ${data.events.go}`]='go';
events[`click ${data.events.moveL}`]='moveL';
events[`click ${data.events.moveR}`]='moveR';
events[`click ${data.events.moveT}`]='moveT';
events[`click ${data.events.moveB}`]='moveB';

export let BoatView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 done:false,
 pos:0,
 cell:null,
 iniBgPos:null,
 initialize:function(opts){
  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   opts:opts
  }]);

  this.cell={w:(data.game.width-data.grid.shiftX*2)/data.grid.size,h:(data.game.height-data.grid.shiftY*2)/data.grid.size};
  this.iniBgPos={x:this.cell.w*(data.radarSize-1)/2-data.grid.shiftX,y:this.cell.h*(data.radarSize-1)/2-data.grid.shiftY};
  this.$(data.view.game).css({width:data.game.width+'em',height:data.game.height+'em'});
  this.$(data.view.grid).css({left:data.grid.shiftX+'em',right:data.grid.shiftX+'em',top:data.grid.shiftY+'em',bottom:data.grid.shiftY+'em'});
  lottie.loadAnimation({
   container:this.$(data.view.anim)[0],
   renderer:'svg',
   loop:true,
   animationData:data.lottie,
   rendererSettings:{preserveAspectRatio:'none'}
  });
 },
 setPos:function(){
  let th=_.throttle((e)=>{
   switch (e.which)
   {
    case 37:case 65:
     this.moveL();
     break;
    case 38:case 87:
     this.moveT();
     break;
    case 39:case 68:
     this.moveR();
     break;
    case 40:case 83:
     this.moveB();
     break;
   }
  },300);

  this.$radar=this.$(data.view.radar).css({
   width:this.cell.w*data.radarSize+'em',
   height:this.cell.h*data.radarSize+'em',
   backgroundSize:`${data.game.width}em ${data.game.height}em`,
   backgroundPosition:`${this.iniBgPos.x}em ${this.iniBgPos.y}em`,
   left:-this.cell.w*(data.radarSize-1)/2+'em',
   top:-this.cell.h*(data.radarSize-1)/2+'em',
   transform:'translate(0,0)'
  });

  $(document).on('keydown.boat',(e)=>{
   th(e);
  });
 },
 clr:function(){
  for(let x of Object.values(data.view.posCls))
   this.$radar.removeClass(x);
  this.done=false;
  this.pos=0;
  $(document).off('keydown.boat');
  this.$el.removeClass(data.view.okCls+' '+data.view.doneCls);
 },
 moveL:function(){
  if(this.pos%data.grid.size>0&&data.cells[this.pos-1])
   this.pos--;
  this.move('l');
 },
 moveR:function(){
  if(this.pos%data.grid.size<data.grid.size-1&&data.cells[this.pos+1])
   this.pos++;
  this.move('r');
 },
 moveT:function(){
  if(this.pos>data.grid.size-1&&data.cells[this.pos-data.grid.size])
   this.pos-=data.grid.size;
  this.move('u');
 },
 moveB:function(){
  if(this.pos<data.grid.size*(data.grid.size-1)&&data.cells[this.pos+data.grid.size])
   this.pos+=data.grid.size;
  this.move('');
 },
 move:function(dir){
  let where={x:(this.pos%data.grid.size)*this.cell.w,y:Math.floor(this.pos/data.grid.size)*this.cell.h};

  if(!this.done)
  {
   app.get('aggregator').trigger('sound','btn');

   for(let x of Object.values(data.view.posCls))
    this.$radar.removeClass(x);

   this.$radar.css({
    transform:`translate(${where.x}em,${where.y}em)`,
    backgroundPosition:`${this.iniBgPos.x-where.x}em ${this.iniBgPos.y-where.y}em`
   }).addClass(data.view.posCls[dir]);

   if(data.cells[this.pos]===2)
   {
    this.done=true;
    setTimeout(()=>{
     this.$el.addClass(data.view.doneCls);
    },data.winWait);
   }
  }
 },
 go:function(){
  if(this.done)
  {
   this.away();
   this.clr();
  }else
  {
   this.$el.addClass(data.view.okCls);
   this.setPos();
  }
 }
});