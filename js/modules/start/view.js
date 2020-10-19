import {data} from './data.js';
import {app} from '../../bf/base.js';
import {BaseIntView} from '../baseInteractive/view.js';

let events={};
events[`click ${data.events.click}`]='click';

export let StartView=BaseIntView.extend({
 events:events,
 opts:null,
 initialize:function(opts){
  this.opts=opts;
  this.setElement(data.view.el[this.opts.data.type]);

  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   opts:opts
  }]);

  switch(this.opts.data.type)
  {
   case 'two':
    this.anim();
    break;
  }
 },
 anim:function(){
  let btns=this.$(data.events.click);

  lottie.loadAnimation({
   container:btns[0],
   renderer:'svg',
   loop:true,
   animationData:data.twoLottie[0]
  });
  lottie.loadAnimation({
   container:btns[1],
   renderer:'svg',
   loop:true,
   animationData:data.twoLottie[1]
  });
 },
 click:function(e){
  let corr;

  switch(this.opts.data.type)
  {
   case 'one':
    this.away();
    break;
   case 'name':
    app.get('aggregator').trigger('board:name',this.$(data.view.$brdName).val());
    this.away();
    break;
   case 'two':
    corr=$(e.currentTarget).is(data.view.corr);
    app.get('aggregator').trigger('sound',corr?'plus':'minus');
    this.away(false,corr?{end:'endGood'}:{});
  }
 }
});