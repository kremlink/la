import {app} from '../../bf/base.js';
import {data as dat} from './data.js';
let data=app.configure({board:dat}).board;

export let BoardMgr=Backbone.View.extend({
 data:{name:'',what:'',points:0},
 points:{},
 initialize:function(){
  this.listenTo(app.get('aggregator'),'board:name',this.name);
  this.listenTo(app.get('aggregator'),'board:score',this.score);
 },
 req:function(){
  fetch(data.url+JSON.stringify(this.data));
 },
 name:function(name){
  name=name.trim();
  this.data.name=name?name:data.defName;
  this.req();
 },
 sum:function(){
   return Object.values(this.points).reduce((ac,cur)=>ac+cur);
 },
 score:function({what,points}){
  let ls=JSON.parse(localStorage.getItem(app.get('ls')));

  this.data.what=what;
  this.data.points=points;
  this.points[what]=points;
  ls.points=this.points;
  localStorage.setItem(app.get('ls'),JSON.stringify(ls));
  this.req();
 }
});