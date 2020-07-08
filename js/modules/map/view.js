import {app} from '../../bf/base.js';
import {data} from './data.js';

let events={};
events[`click ${data.events.click}`]='click';
events[`click ${data.events.go}`]='go';

export let MapView=Backbone.View.extend({
 el:data.view.el,
 events:events,
 done:false,
 initialize:function(){

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
  {
   app.get('aggregator').trigger('main:toggle',false);
   this.toggle(false);
  }else
  {
   this.$el.addClass(data.view.okCls);
  }
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
 }
});