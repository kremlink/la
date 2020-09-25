import {app} from '../../bf/base.js';
import {StartView} from '../start/view.js';
import {VibrateView} from '../vibrate/view.js';
import {QsView} from '../qs/view.js';
import {MapView} from '../map/view.js';
import {CatchView} from '../catch/view.js';
import {SchemeView} from '../scheme/view.js';
import {CartogrView} from '../cartogr/view.js';
import {ForestView} from '../forest/view.js';
import {LeafletView} from '../leaflet/view.js';
import {PhotosView} from '../photos/view.js';
import {RadarView} from '../radar/view.js';

import {TimerView} from '../timer/view.js';
import {data as dat} from './data.js';
let data=app.configure({main:dat}).main,
    epIndex;

let events={};

export let MainView=Backbone.View.extend({
 events:events,
 el:data.view.el,
 currentIndex:-1,
 initialize:function(opts){
  epIndex=app.get('epIndex');

  this.timecodes=opts.timecodes;
  this.listenTo(app.get('aggregator'),'main:toggle',this.toggle);
  this.listenTo(app.get('aggregator'),'main:step',this.step);

  new TimerView;
 },
 toggle:function(opts){
  if(opts.show)
   app.get('aggregator').trigger('player:pause');else
   //setTimeout(()=>app.get('aggregator').trigger('player:pause'),data.time);else
   app.get('aggregator').trigger('player:play',opts.opts&&opts.opts.time?this.timecodes[this.currentIndex][opts.opts.time]:this.timecodes[this.currentIndex].end);

  this.$el.toggleClass(data.view.shownCls,opts.show);
  if(opts.failed)
   app.get('aggregator').trigger('timer:update',this.timecodes[this.currentIndex]);
 },
 step:function(i){
  if(i===0)
   app.get('aggregator').trigger('page:timer');

  if(this.timecodes[i].checkpoint)
  {
   app.get('aggregator').trigger('timer:update',this.timecodes[i]);
  }else
  {
   eval(`new ${data.stepViews[epIndex][i]}(${JSON.stringify(this.timecodes[i])})`);

   this.currentIndex=i;
   this.toggle({show:true});
  }
 }
});