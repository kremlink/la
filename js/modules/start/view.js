import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';

let events={};
events[`click ${data.events.click}`]='click';

export let StartView=BaseIntView.extend({
 events:events,
 initialize:function(opts){
  this.setElement(data.view.el[opts.simple]);

  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   type:opts.simple
  }]);
 },
 click:function(){
  this.away();
 }
});