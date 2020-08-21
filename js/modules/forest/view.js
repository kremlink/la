import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';

let events={};
events[`click ${data.events.go}`]='go';
events[`click ${data.events.gItem}`]='gItem';

export let ForestView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 done:false,
 itemTemplate:_.template($(data.view.item.tmpl).html()),
 hlTemplate:_.template($(data.view.hlTmpl).html()),
 vlTemplate:_.template($(data.view.hlTmpl).html()),
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

  this.$grid=this.$(data.view.$grid);

  this.render();
 },
 render:function(){
  let s='';

  for(let i=0;i<data.grid[1];i++)
  {
   for(let j=0;j<data.grid[0];j++)
   {
    s+=$.trim(this.itemTemplate({index:i*data.grid[0]+j,width:100/data.grid[0],height:100/data.grid[1],left:j*100/data.grid[0],top:i*100/data.grid[1]}));
    //m+='';
   }
  }

  this.$grid.append(this.$gridItems=$(s));
  this.activate();
 },
 activate:function(){
  if(~this.current)
   this.$gridItems.eq(this.current).removeClass(data.view.item.activeCls);
  this.current=this.indicies[Math.floor(Math.random()*this.indicies.length)];
  this.indicies=this.indicies.filter(item=>item!==this.current);
  this.$gridItems.eq(this.current).addClass(data.view.item.activeCls);
 },
 gItem:function(e){
  let item=$(e.currentTarget),
   index=this.$gridItems.index(item);

  item.addClass(data.view.item.doneCls);
  this.activate();

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
  //this.away();
 },
 go:function(){
  this.$el.addClass(data.view.okCls);
  for(let i=0;i<data.seq.length;i++)
   this.$gridItems.eq(data.seq[i]).css('transition-delay',i*data.view.item.anim+'s').addClass(data.view.item.iniCls);
  setTimeout(()=>this.$gridItems.css('transition-delay','0s'),(data.seq.length-1)*data.view.item.anim);
 }
});