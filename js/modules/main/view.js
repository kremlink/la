import {app} from '../../bf/base.js';
import {SoundMgr} from '../soundMgr/view.js';
import {BoardMgr} from '../boardMgr/view.js';

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
import {BoatView} from '../boat/view.js';

import {TimerView} from '../timer/view.js';
import {data} from './data.js';

let Interactives={
 Start:StartView,
 Vibrate:VibrateView,
 Qs:QsView,
 Map:MapView,
 Catch:CatchView,
 Scheme:SchemeView,
 Cartogr:CartogrView,
 Forest:ForestView,
 Leaflet:LeafletView,
 Photos:PhotosView,
 Radar:RadarView,
 Boat:BoatView
};

let events={};

export let MainView=Backbone.View.extend({
 events:events,
 el:data.view.el,
 timecodeData:null,
 delayedPTimer:null,
 initialize:function(){
  let lsName=data.ls,
   lsIniVal={name:'',points:{ini:0},time:[-1,-1,-1,-1],current:0};

  app.set({dest:'objects.ls',object:lsName,lib:false});
  if(!localStorage.getItem(lsName))
   localStorage.setItem(lsName,JSON.stringify(lsIniVal));

  app.get('aggregator').on('ls:clr',(ls)=>{
   for(let [x,y] of Object.entries(lsIniVal))
    ls[x]=y;
  });

  this.listenTo(app.get('aggregator'),'interactive:toggle',this.toggle);
  this.listenTo(app.get('aggregator'),'player:interactive',this.step);

  new TimerView;
  new SoundMgr;
  new BoardMgr;

  /*app.get('aggregator').trigger('board:score',{what:'test',points:5});*/
 },
 toggle:function({show:show,failed:failed,opts:opts}){
  app.get('aggregator').trigger('main:toggle',!show);

  if(show)
  {
   if(~this.timecodeData.delayedPause)
    this.delayedPTimer=setTimeout(()=>app.get('aggregator').trigger('player:pause'),this.timecodeData.delayedPause?this.timecodeData.delayedPause*1000:0);

   /*if(this.timecodeData.delayedPause)
    this.delayedPTimer=setTimeout(()=>app.get('aggregator').trigger('player:pause'),this.timecodeData.delayedPause*1000);else
    app.get('aggregator').trigger('player:pause');*/
  }else
  {
   clearTimeout(this.delayedPTimer);
   //setTimeout(()=>app.get('aggregator').trigger('player:pause'),data.time);else
   app.get('aggregator').trigger('player:play',{time:opts.end?this.timecodeData.data[opts.end]:
     (!('end' in this.timecodeData)?-1:this.timecodeData.end)});
  }

  this.$el.toggleClass(this.timecodeData.noAnim?data.view.noAnimCls:data.view.shownCls,show);
  if(failed)
   app.get('aggregator').trigger('timer:update',this.timecodeData);
 },
 step:function(timecodeData){
  this.timecodeData=timecodeData;

  if(timecodeData.iniTimer)
   app.get('aggregator').trigger('main:iniTimer');

  if(timecodeData.checkpoint)
  {
   app.get('aggregator').trigger('timer:update',timecodeData);
  }else
  {
   if(typeof timecodeData.data.interactive==='string')
    timecodeData.data.interactive=new Interactives[timecodeData.data.interactive](timecodeData);else
    timecodeData.data.interactive.toggle(true);

   this.toggle({show:true});
  }
 }
});