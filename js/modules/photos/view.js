import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';

let events={};
events[`click ${data.events.go}`]='go';
events[`click ${data.events.item}`]='item';
events[`click ${data.events.click}`]='click';
events[`click ${data.events.next}`]='next';

export let PhotosView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 done:false,
 ctr:0,
 indicies:[],
 initialize:function(){
  BaseIntView.prototype.initialize.apply(this,[{
   data:data
  }]);

  this.$items=this.$(data.events.item).each((i,o)=>{
   if($(o).find(data.events.click).length)
    this.indicies.push(i);
  });
  this.$bad=this.$(data.view.bad).on('animationend',()=>this.$bad.removeClass(data.view.shownCls));
  this.$good=this.$(data.view.good).on('animationend',()=>this.$good.removeClass(data.view.shownCls));

  this.$items.eq(0).addClass(data.view.shownCls);
 },
 showNext:function(){
  this.$items.eq(this.ctr).removeClass(data.view.shownCls);
  this.$items.eq(++this.ctr).addClass(data.view.shownCls);
 },
 item:function(){
  this.$bad.addClass(data.view.shownCls);
 },
 click:function(e){
  this.$good.addClass(data.view.shownCls);
  this.showNext();
  if(this.ctr===this.$items.length)
  {
   setTimeout(()=>{
    this.$el.addClass(data.view.doneCls);
    this.done=true;
   },data.winWait);
  }

  e.stopPropagation();
 },
 next:function(){
  if(this.indicies.includes(this.ctr))
  {
   this.$bad.addClass(data.view.shownCls);
  }else
  {
   this.$good.addClass(data.view.shownCls);
   this.showNext();
  }
 },
 go:function(){
  if(this.done)
   this.away();else
   this.$el.addClass(data.view.okCls);
 }
});