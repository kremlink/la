import {app} from '../../bf/base.js';
import {data as dat} from './data.js';
let data=app.configure({board:dat}).board;

export let BoardMgr=Backbone.View.extend({
 points:0,
 initialize:function(){
  this.listenTo(app.get('aggregator'),'board:name',this.name);
  this.listenTo(app.get('aggregator'),'board:score',this.score);
 },
 req:function(what,v){
  fetch(data.url[what]+v);
 },
 name:function(name){
  name=name.trim();
  this.name=name?name:data.defName;
  this.req('name',this.name);
  //console.log('User chosen name '+this.name);
 },
 score:function(p){
  this.points+=p;
  this.req('points',p);
  //console.log(p+' points added to the board; sum:'+this.points);
 }
});