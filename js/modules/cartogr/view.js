import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';

let events={};
events[`click ${data.events.go}`]='go';

export let CartogrView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 done:false,
 itemTemplate:_.template($(data.view.item.tmpl).html()),
 mTemplate:_.template($(data.view.mTmpl).html()),
 $grid:null,
 $next:null,
 $gridItems:null,
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
      m='';

  for(let i=0;i<data.grid[1];i++)
  {
   for(let j=0;j<data.grid[0];j++)
   {
    s+=this.itemTemplate({active:data.active[i*data.grid[0]+j],width:100/data.grid[0],height:100/data.grid[1],left:j*100/data.grid[0],top:i*100/data.grid[1]});
    m+=this.mTemplate({text:j?String.fromCharCode(data.start[0].charCodeAt(0)+j)+(data.start[1]+i):'',left:j*100/data.grid[0],top:i*100/data.grid[1]});
   }
  }

  this.$gridItems=$(s);
  this.$grid.append(this.$gridItems);
  this.$grid.append($(m));
 },
 win:function(){
  this.$el.addClass(data.view.doneCls);
  this.done=true;
 },
 go:function(){
  if(this.done)
   this.away();else
   this.$el.addClass(data.view.okCls);
 }
});