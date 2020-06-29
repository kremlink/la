import {app} from '../../bf/base.js';
import {data} from './data.js';

let events={};
events[`click ${data.events.click}`]='click';

export let Step2View=Backbone.View.extend({
 el:data.view.el,
 events:events,
 initialize:function(){

 },
 click:function(){
  app.get('aggregator').trigger('main:toggle',false);
  this.toggle(false);
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
 },
});