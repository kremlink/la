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

  this.cell={w:data.game.width/data.grid.size,h:data.game.height/data.grid.size};
  this.iniBgPos={x:this.cell.w*(data.radarSize-1)/2-data.grid.shiftX,y:this.cell.h*(data.radarSize-1)/2-data.grid.shiftY};
  this.$(data.view.game).css({width:data.game.width+'em',height:data.game.height+'em'});
  this.$(data.view.grid).css({left:data.grid.shiftX+'em',right:data.grid.shiftX+'em',top:data.grid.shiftY+'em',bottom:data.grid.shiftY+'em'});
  this.setPos();
 },
 setPos:function(){
  this.$radar=this.$(data.view.radar).css({
   width:this.cell.w*data.radarSize+'em',
   height:this.cell.h*data.radarSize+'em',
   backgroundPosition:`${this.iniBgPos.x}em ${this.iniBgPos.y}em`,
   left:-this.cell.w*(data.radarSize-1)/2+'em',
   top:-this.cell.h*(data.radarSize-1)/2+'em'
  });
 },
 clr:function(){
  this.done=false;
  this.pos=0;
  this.setPos();
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
  this.move('t');
 },
 moveB:function(){
  if(this.pos<data.grid.size*(data.grid.size-1)&&data.cells[this.pos+data.grid.size])
   this.pos+=data.grid.size;
  this.move('b');
 },
 move:function(dir){
  this.$radar.css({
   transform:`translate(${(this.pos%data.grid.size)*this.cell.w}em,-${Math.floor(this.pos/data.grid.size)*this.cell.h}em)`,
   backgroundPosition:`${this.iniBgPos.x}em ${this.iniBgPos.y}em`
  });
 },
 /*if(this.current===data.seq.length)
{
 setTimeout(()=>{
  this.$el.addClass(data.view.doneCls);
  this.done=true;
 },data.win.wait);
}*/
 go:function(){
  if(this.done)
  {
   this.away();
   this.clr();
  }else
  {
   this.$el.addClass(data.view.okCls);
  }
 }
});