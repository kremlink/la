import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';

let events={};
events[`click ${data.events.click}`]='click';

export let StartView=BaseIntView.extend({
 events:events,
 opts:null,
 initialize:function(opts){
  this.opts=opts;
  this.setElement(data.view.el[opts.simple]);

  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   type:opts.simple
  }]);
 },
 click:function(e){
  switch(this.opts.simple)
  {
   case 'one':
    this.away();
    break;
   case 'two':
    this.away(false,$(e.currentTarget).is(data.view.corr)?{time:'endGood'}:null);
  }
 }
});