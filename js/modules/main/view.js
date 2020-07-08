import {app} from '../../bf/base.js';
import {StartView} from '../start/view.js';
import {VibrateView} from '../vibrate/view.js';
import {QsView} from '../qs/view.js';
import {MapView} from '../map/view.js';
import {CatchView} from '../catch/view.js';
import {data} from './data.js';

let stepViews=[CatchView/*StartView,VibrateView,VibrateView,QsView,MapView,CatchView*/],
 events={};

export let MainView=Backbone.View.extend({
 events:events,
 el:data.view.el,
 initialize:function(opts){
  this.timecodes=opts.timecodes;
  this.listenTo(app.get('aggregator'),'main:toggle',this.toggle);
  this.listenTo(app.get('aggregator'),'main:step',this.step);
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
  app.get('aggregator').trigger(f?'player:pause':'player:play');
 },
 step:function(i){
  let stepView=new stepViews[i]({vibrate:this.timecodes[i].vibrate});

  this.toggle(true);
  stepView.toggle(true);
 }
});