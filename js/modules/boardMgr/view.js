import {app} from '../../bf/base.js';
import {data as dat} from './data.js';
let data=app.configure({board:dat}).board;

export let BoardMgr=Backbone.View.extend({
 data:{name:'',what:'',points:0,oldName:''},
 scoreAnim:false,
 initialize:function(){
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
  let ls=JSON.parse(localStorage.getItem(app.get('ls')));

  this.data.name=name?name:data.defName;
  if(ls.name)
  {
   this.data.oldName=ls.name;
   app.get('aggregator').trigger('ls:clr',ls);
  }
  ls.name=this.data.name;
  localStorage.setItem(app.get('ls'),JSON.stringify(ls));
  this.req();
 },
 sum:function(){
  let ls=JSON.parse(localStorage.getItem(app.get('ls')));

  return Object.values(ls.points).reduce((ac,cur)=>ac+cur);
 },
 score:function({what,points}){
  let ls=JSON.parse(localStorage.getItem(app.get('ls')));
  /*oldSum=this.sum(),
  ctr,c=0;*/

  this.data.what=what;
  this.data.points=points;
  ls.points[what]=points;
  localStorage.setItem(app.get('ls'),JSON.stringify(ls));
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