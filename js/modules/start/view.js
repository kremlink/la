import {data} from './data.js';
import {BaseIntView} from '../BaseInteractiveView.js';

let events={};
events[`click ${data.events.click}`]='click';

export let StartView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 initialize:function(){
  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   after:this.away
  }]);
 },
 click:function(){
  this.away();
 }
});