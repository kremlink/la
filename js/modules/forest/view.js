import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';
import {app} from '../../bf/base.js';

let events={};
events[`click ${data.events.go}`]='go';
events[`click ${data.events.gItem}`]='gItem';

export let ForestView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 done:false,
 itemTemplate:null,
 hlTemplate:null,
 vlTemplate:null,
 $grid:null,
 current:-1,
 indicies:[...data.seq],
 $gridItems:null,
 $sPlus:$(data.view.soundPlus),
 $sMinus:$(data.view.soundMinus),
 initialize:function(){
  BaseIntView.prototype.initialize.apply(this,[{
   data:data
  }]);

  this.itemTemplate=_.template($(data.view.item.tmpl).html());
  this.hlTemplate=_.template($(data.view.hlTmpl).html());
  this.vlTemplate=_.template($(data.view.vlTmpl).html());
  this.$grid=this.$(data.view.$grid);

  this.render();
 },
 render:function(){
  let s='';

  for(let i=0;i<data.grid[1];i++)
   for(let j=0;j<data.grid[0];j++)
    s+=$.trim(this.itemTemplate({index:i*data.grid[0]+j,width:100/data.grid[0],height:100/data.grid[1],left:j*100/data.grid[0],top:i*100/data.grid[1]}));

  this.$grid.append(this.$gridItems=$(s));
  this.$gridItems.each(i=>{
   if(i>0&&i<data.seq.length-1&&(i+1)%data.grid[0]===0)
    this.$gridItems.eq(i).after($(this.hlTemplate({top:(i+1)/data.grid[0]*100/data.grid[1]})));
  });

  for(let i=0;i<data.grid[0]-1;i++)
   this.$grid.append($(this.vlTemplate({left:(i+1)*100/data.grid[0]})));
  this.activate();
 },
 activate:function(){
  if(!this.indicies.length)
  {
   this.away();
  }else
  {
   if(~this.current)
    this.$gridItems.removeClass(data.view.item.arrCls+' '+data.view.item.arrClsType[0]+' '+data.view.item.arrClsType[1]+' '+data.view.item.arrClsType[2])
     .eq(this.current).removeClass(data.view.item.activeCls);
   this.current=this.indicies[Math.floor(Math.random()*this.indicies.length)];
   this.indicies=this.indicies.filter(item=>item!==this.current);
   this.$gridItems.each(i=>{
    let row=Math.floor(this.current/data.grid[0]);

    if((i>=row*data.grid[0]&&i<(row+1)*data.grid[0])||(i%data.grid[0]===this.current%data.grid[0]))
     this.$gridItems.eq(i).addClass(data.view.item.arrCls
      +(i>=row*data.grid[0]&&i<this.current?'':(' '+data.view.item.arrClsType[i>this.current&&i<(row+1)*data.grid[0]?1:(Math.floor(i/data.grid[0])<=row?0:2)])));
   }).eq(this.current).addClass(data.view.item.activeCls);
  }
 },
 gItem:function(e){
  let item=$(e.currentTarget);

  if(item.hasClass(data.view.item.activeCls))
  {
   app.get('aggregator').trigger('sound','stone');
   item.addClass(data.view.item.doneCls);
   this.activate();
  }else
  {
   app.get('aggregator').trigger('sound','minus');
  }


  /*if(index===data.seq[this.current])
  {
   this.$sPlus[0].currentTime=0;
   this.$sPlus[0].play();
   item.removeClass(data.view.item.badCls).addClass(data.view.item.goodCls+' '+data.view.doneCls);
   if(this.current===data.seq.length)
   {
    setTimeout(()=>{
     this.$el.addClass(data.view.doneCls);
     this.done=true;
    },data.win.wait);
   }
  }else
  {
   if(!item.hasClass(data.view.doneCls))
   {
    item.removeClass(data.view.item.badCls);
    setTimeout(()=>item.addClass(data.view.item.badCls),100);
    this.$sMinus[0].currentTime=0;
    this.$sMinus[0].play();
   }
  }*/
 },
 go:function(){
  this.$el.addClass(data.view.okCls);
  for(let i=0;i<data.seq.length;i++)
   this.$gridItems.eq(data.seq[i]).css('transition-delay',i*data.view.item.anim+'s').addClass(data.view.item.iniCls);
  //setTimeout(()=>this.$gridItems.css('transition-delay','0s'),(data.seq.length-1)*data.view.item.anim);
 }
});