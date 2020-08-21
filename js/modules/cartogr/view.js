import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';

let events={};
events[`click ${data.events.go}`]='go';
events[`click ${data.events.gItem}`]='gItem';

export let CartogrView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 done:false,
 itemTemplate:_.template($(data.view.item.tmpl).html()),
 mTemplate:_.template($(data.view.mTmpl).html()),
 nextTemplate:_.template($(data.view.nextTmpl).html()),
 $grid:null,
 $next:null,
 $previews:null,
 current:0,
 $gridItems:null,
 $sPlus:$(data.view.soundPlus),
 $sMinus:$(data.view.soundMinus),
 initialize:function(){
  BaseIntView.prototype.initialize.apply(this,[{
   data:data
  }]);

  this.$grid=this.$(data.view.$grid);
  this.$next=this.$(data.view.$next);

  this.render();
 },
 render:function(){
  let s='',
      m='',
  winIndex;

  for(let i=0;i<data.grid[1];i++)
  {
   for(let j=0;j<data.grid[0];j++)
   {
    winIndex=i*data.grid[0]+j-data.win.startIndex;
    s+=this.itemTemplate({active:data.active[i*data.grid[0]+j],winIndex:winIndex<0||winIndex>=data.win.picsAmount?-1:winIndex,width:100/data.grid[0],height:100/data.grid[1],left:j*100/data.grid[0],top:i*100/data.grid[1]});
    m+=this.mTemplate({text:j?String.fromCharCode(data.start[0].charCodeAt(0)+j)+(data.start[1]+i):'',left:j*100/data.grid[0],top:i*100/data.grid[1]});
   }
  }

  this.$grid.append(this.$gridItems=$(s));
  this.$grid.append($(m));
  s='';
  for(let i=0;i<data.seq.length;i++)
   s+=$.trim(this.nextTemplate({index:i}));
  this.$next.append(this.$previews=$(s));
  this.$previews.eq(this.current).addClass(data.view.item.activeCls);
 },
 gItem:function(e){
  let item=$(e.currentTarget),
   index=item.index();

  //this.$el.addClass(data.view.doneCls);
  //this.done=true;

  if(item.hasClass(data.view.item.activeCls))
  {
   if(index===data.seq[this.current])
   {
    this.$sPlus[0].currentTime=0;
    this.$sPlus[0].play();
    item.removeClass(data.view.item.badCls).addClass(data.view.item.goodCls+' '+data.view.doneCls);
    this.$previews.eq(this.current++).removeClass(data.view.item.activeCls);
    this.$previews.eq(this.current).addClass(data.view.item.activeCls);
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
   }
  }
 },
 go:function(){
  if(this.done)
   this.away();else
   this.$el.addClass(data.view.okCls);
 }
});