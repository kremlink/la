import {app} from '../../bf/base.js';
import {StartView} from '../start/view.js';
import {VibrateView} from '../vibrate/view.js';
import {QsView} from '../qs/view.js';
import {MapView} from '../map/view.js';
import {CatchView} from '../catch/view.js';
import {SchemeView} from '../scheme/view.js';

import {TimerView} from '../timer/view.js';
import {data} from './data.js';

let stepViews=[MapView/*StartView,VibrateView,VibrateView,QsView,MapView,CatchView,SchemeView*/],
 events={};

export let MainView=Backbone.View.extend({
 events:events,
 el:data.view.el,
 currentIndex:-1,
 initialize:function(opts){
  this.timecodes=opts.timecodes;
  this.listenTo(app.get('aggregator'),'main:toggle',this.toggle);
  this.listenTo(app.get('aggregator'),'main:step',this.step);

  new TimerView;
 },
 toggle:function(f){
  app.get('aggregator').trigger(f?'player:pause':'player:play',this.timecodes[this.currentIndex].end);
  this.$el.toggleClass(data.view.shownCls,f);
 },
 step:function(i){
  let stepView=new stepViews[i]({vibrate:this.timecodes[i].vibrate});

  this.currentIndex=i;
  stepView.toggle(true);
  if(i===0)
   app.get('aggregator').trigger('page:timer');
  this.toggle(true);
 }
});