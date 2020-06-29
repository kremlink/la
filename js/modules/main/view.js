import {app} from '../../bf/base.js';
import {Step1View} from '../step1/view.js';
import {Step2View} from '../step2/view.js';
import {data} from './data.js';

let events={};
//events[`click ${data.events.return}`]='toVideo';

export let MainView=Backbone.View.extend({
 events:events,
 el:data.view.el,
 initialize:function(){
  this.listenTo(app.get('aggregator'),'main:toggle',this.toggle);
  this.listenTo(app.get('aggregator'),'main:step',this.step);
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
  app.get('aggregator').trigger(f?'player:pause':'player:play');
 },
 step:function(s){
  this.toggle(true);
  switch(s)
  {
   case 'step1':
    this.step1View=new Step1View;
    this.step1View.toggle(true);
    break;
   case 'step2':
    this.step2View=new Step2View;
    this.step2View.toggle(true);
    break;
  }
 }
});