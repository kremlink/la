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

  if(this.opts.data.type==='two')
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
 toggle:function(f){
  if(f&&this.opts.data.type==='name')
  {
   this.$brdName=this.$(data.view.$brdName);
   setTimeout(()=>this.$brdName.focus(),2000);
  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 click:function(e){
  let corr;

  switch(this.opts.data.type)
  {
   case 'one':
    this.away();
    break;
   case 'name':
    app.get('aggregator').trigger('board:name',this.$brdName.val().trim());
    this.away();
    break;
   case 'two':
    corr=$(e.currentTarget).is(data.view.corr);
    app.get('aggregator').trigger('board:score',{what:'start-two',points:corr?30:-10});
    app.get('aggregator').trigger('sound',corr?'plus':'minus');
    this.away(false,corr?{end:'endGood'}:{});
  }
 }
});