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
  this.setElement(data.view.el[opts.simple]);

  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   type:opts.simple,
   autoClose:!opts.noAutoClose
  }]);

  if(this.opts.simple==='two')
   this.anim();
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

  switch(this.opts.simple)
  {
   case 'one':
    this.away();
    break;
   case 'two':
    corr=$(e.currentTarget).is(data.view.corr);
    app.get('aggregator').trigger('sound',corr?'plus':'minus');
    this.away(false,corr?{end:'endGood'}:{});
  }
 }
});