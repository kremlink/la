import {app} from '../../bf/base.js';
import {data} from './data.js';

let arrEpIndex;

export let LsMgr=Backbone.View.extend({
 ini:{name:'',points:{ini:0},time:[-1,-1,-1,-1],pCurTime:[0,0,0,0],curTime:[0,0,0,0]},
 initialize:function(){
  arrEpIndex=app.get('epIndex')-1;

  if(!localStorage.getItem(data.name))
   this.setData(this.ini);

  this.listenTo(app.get('aggregator'),'player:ready',this.loaded);
 },
 loaded:function(){
  let ls=this.getData();

  if(ls.pCurTime[arrEpIndex]>0)
   app.get('aggregator').trigger('ls:current',ls.pCurTime[arrEpIndex]);
 },
 resetData:function(){
  return $.extend(true,{},this.ini);
 },
 getData:function(){
  return JSON.parse(localStorage.getItem(data.name))
 },
 setData:function(ls){
  localStorage.setItem(data.name,JSON.stringify(ls));
 }
});