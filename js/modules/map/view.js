import {data} from './data.js';
import {BaseIntView} from '../BaseInteractiveView.js';

let events={};
events[`click ${data.events.click}`]='click';
events[`click ${data.events.go}`]='go';

export let MapView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 done:false,
 initialize:function(){
  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   after:this.away
  }]);
 },
 click:function(e){
  let ind=$(e.target).index();

  this.$el.addClass(data.view.doneCls);
  if(ind!==data.yesIndex)
   this.$el.addClass(data.view.errCls);
  this.done=true;
 },
 go:function(){
  if(this.done)
   this.away();else
   this.$el.addClass(data.view.okCls);
 }
});