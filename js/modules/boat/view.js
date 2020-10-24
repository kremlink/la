import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';

let events={};
events[`click ${data.events.go}`]='go';

export let BoatView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 done:false,
 pos:0,
 cell:null,
 iniPos:null,
 initialize:function(opts){
  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   opts:opts
  }]);

  this.cell={w:data.game.width/data.grid.size,h:data.game.height/data.grid.size};
  this.$(data.view.game).css({width:data.game.width+'em',height:data.game.height+'em'});
  this.$(data.view.grid).css({left:data.grid.shiftX+'em',right:data.grid.shiftX+'em',top:data.grid.shiftY+'em',bottom:data.grid.shiftY+'em'});
  this.setPos();
 },//3.985em
 setPos:function(){
  this.$radar=this.$(data.view.radar).css({width:this.cell.w*data.radarSize+'em',
   height:this.cell.h*data.radarSize+'em',
   backgroundPosition:`${this.cell.w*(data.radarSize-1)/2-data.grid.shiftX}em ${this.cell.h*(data.radarSize-1)/2-data.grid.shiftY}em`,
   left:-this.cell.w*(data.radarSize-1)/2+'em',
   top:-this.cell.h*(data.radarSize-1)/2+'em'
   //transform:`translate(-${this.cell.w*(data.radarSize-1)/2}em,-${this.cell.h*(data.radarSize-1)/2}em)`
  });
 },
 clr:function(){
  this.done=false;
  this.pos=0;
  this.setPos();
  this.$el.removeClass(data.view.okCls+' '+data.view.doneCls);
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