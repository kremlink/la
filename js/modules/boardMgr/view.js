import {app} from '../../bf/base.js';
import {data as dat} from './data.js';
let data=app.configure({board:dat}).board;

export let BoardMgr=Backbone.View.extend({
 data:{name:'',what:'',points:0},
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
 score:function({what,points}){
  this.data.what=what;
  this.data.points=points;
  this.req();
 }
});