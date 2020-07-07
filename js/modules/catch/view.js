import {app} from '../../bf/base.js';
import {data} from './data.js';

let events={};
events[`click ${data.events.click}`]='click';

export let CatchView=Backbone.View.extend({
 el:data.view.el,
 events:events,
 initialize:function(){
  //this.$msg=this.$(data.view.msg);
 },
 click:function(e){
  let ind=$(e.target).index();

  if(data.msgs[ind].go)
  {
   app.get('aggregator').trigger('main:toggle',false);
   this.toggle(false);
  }
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
 },
});