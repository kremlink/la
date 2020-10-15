import {app} from '../../bf/base.js';
import {data as dat} from './data.js';
let data=app.configure({board:dat}).board;

export let BoardMgr=Backbone.View.extend({
 points:0,
 initialize:function(){
  this.listenTo(app.get('aggregator'),'board:name',this.name);
  this.listenTo(app.get('aggregator'),'board:score',this.score);
 },
 name:function(name){
  name=name.trim();
  console.log('User chosen name '+(this.name=name?name:data.defName));
 },
 score:function(p){
  this.points+=p;
  console.log(p+' points added to the board; sum:'+this.points);
 }
});