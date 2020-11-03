import {app} from '../../bf/base.js';
import {data as dat} from './data.js';
let data=app.configure({board:dat}).board;

let arrEpIndex;

export let BoardMgr=Backbone.View.extend({
 data:{name:'',what:'',points:0,oldName:''},
 scoreAnim:false,
 initialize:function(opts){
  arrEpIndex=app.get('epIndex')-1;

  this.lsMgr=opts.lsMgr;

  this.listenTo(app.get('aggregator'),'board:name',this.name);
  this.listenTo(app.get('aggregator'),'board:score',this.score);
  this.$sum=$(data.view.sum);
  this.$sum.html(this.sum()).on('transitionend',()=>{
   if(this.$sum.hasClass(data.view.changeCls))
    this.$sum.html(this.sum()).removeClass(data.view.changeCls);else
    this.scoreAnim=false;
  });
 },
 req:function(){
  //console.log('board request: '+JSON.stringify(this.data));
  fetch(data.url+JSON.stringify(this.data)).then(()=>{
   this.data.oldName='';
  });
 },
 name:function(name=''){
  let ls=this.lsMgr.getData(),
   pCurTime=ls.pCurTime[arrEpIndex],
   curTime=ls.curTime[arrEpIndex];

  this.data.name=name?name:data.defName;
  if(ls.name)
  {
   this.data.oldName=ls.name;
   ls=this.lsMgr.resetData();
   ls.pCurTime[arrEpIndex]=pCurTime;
   ls.curTime[arrEpIndex]=curTime;
  }
  ls.name=this.data.name;
  this.lsMgr.setData(ls);
  this.req();
 },
 sum:function(){
  let ls=this.lsMgr.getData();

  return Object.values(ls.points).reduce((ac,cur)=>ac+cur);
 },
 score:function({what,points}){
  let ls=this.lsMgr.getData();
  /*oldSum=this.sum(),
  ctr,c=0;*/

  this.data.what=what;
  this.data.points=points;
  ls.points[what]=points;
  this.lsMgr.setData(ls);
  if(!this.scoreAnim)
  {
   this.$sum.addClass(data.view.changeCls);
   this.scoreAnim=true;
  }
  /*ctr=setInterval(()=>{
   if(c===points)
    clearInterval(ctr);else
    this.$sum.html(oldSum+(points>0?++c:--c));
  },data.speed);*/
  this.req();
 }
});