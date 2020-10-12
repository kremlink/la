import {app} from '../bf/base.js';
let data=app.configure({metrika:{name:null}}).metrika;

export let Metrika=Backbone.View.extend({
 initialize:function(){
  this.listenTo(app.get('aggregator'),'metrika',this.goal);
 },
 goal:function(targ){
  if(ym)
   ym(data.name,'reachGoal',targ);else
   console.log('metrika is undefined');
 }
});