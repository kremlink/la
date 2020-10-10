import {app} from '../../bf/base.js';
import {SoundMgr} from '../soundMgr/view.js';

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
 timecodeData:null,
 initialize:function(){
  epIndex=app.get('epIndex');

  this.listenTo(app.get('aggregator'),'main:toggle',this.toggle);
  this.listenTo(app.get('aggregator'),'main:step',this.step);

  new TimerView;
  new SoundMgr;
 },
 toggle:function({show:show,failed:failed,opts:opts}){
  if(show)
   app.get('aggregator').trigger('player:pause');else
   //setTimeout(()=>app.get('aggregator').trigger('player:pause'),data.time);else
   app.get('aggregator').trigger('player:play',{time:opts.end?this.timecodeData.data[opts.end]:this.timecodeData.end});

  this.$el.toggleClass(data.view.shownCls,show);
  if(failed)
   app.get('aggregator').trigger('timer:update',this.timecodeData);
 },
 step:function({index:i,timecodeData:timecodeData}){
  this.timecodeData=timecodeData;

  if(timecodeData.data.iniTimer)
   app.get('aggregator').trigger('page:timer');

  if(timecodeData.checkpoint)
  {
   app.get('aggregator').trigger('timer:update',timecodeData);
  }else
  {
   eval(`new ${data.stepViews[epIndex][i]}(${JSON.stringify(timecodeData.data)})`);

   this.toggle({show:true});
  }
 }
});