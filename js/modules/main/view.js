import {app} from '../../bf/base.js';
import {data} from './data.js';

let events={};
//events[`click ${data.events.return}`]='toVideo';

export let MainView=Backbone.View.extend({
 events:events,
 el:data.view.el,
 initialize:function(){
  this.listenTo(app.get('aggregator'),'main:toggle',this.toggle);
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
 }
});