import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';
import {app} from '../../bf/base.js';

let events={};
events[`click ${data.events.go}`]='go';
events[`click ${data.events.item}`]='item';
events[`click ${data.events.click}`]='click';
events[`click ${data.events.next}`]='next';

export let PhotosView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 done:false,
 ctr:0,
 indicies:[],
 lottie:null,
 initialize:function(opts){
  let $anim;

  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   opts:opts
  }]);

  this.$items=this.$(data.events.item).each((i,o)=>{
   if($(o).find(data.events.click).length)
    this.indicies.push(i);
  });
  this.$bad=this.$(data.view.bad).on('animationend',()=>this.$bad.removeClass(data.view.shownCls));
  this.$good=this.$(data.view.good).on('animationend',()=>this.$good.removeClass(data.view.shownCls));

  this.$items.eq(0).addClass(data.view.shownCls);

  $anim=this.$(data.view.anim);

  if($anim.length)
  {
   this.lottie=lottie.loadAnimation({
    container:$anim[0],
    renderer:'svg',
    loop:false,
    animationData:data.lottie,
    autoplay:false
   });
   this.lottie.addEventListener('complete',()=>this.showNext(true));
  }
 },
 clr:function(){
  this.done=false;
  this.ctr=0;
  this.$el.removeClass(data.view.okCls+' '+data.view.doneCls);
  this.$items.eq(0).addClass(data.view.shownCls);
 },
 showNext:function(f){
  if(f)
   app.get('aggregator').trigger('sound','ph-plus');
  this.$items.eq(this.ctr).removeClass(data.view.shownCls);
  this.$items.eq(++this.ctr).addClass(data.view.shownCls);
  if(this.ctr===this.$items.length)
  {
   this.done=true;
   setTimeout(()=>{
    this.$el.addClass(data.view.doneCls);
   },data.winWait);
  }
 },
 item:function(){
  if(!this.done)
  {
   this.$bad.addClass(data.view.shownCls);
   app.get('aggregator').trigger('sound','ph-minus');
  }
 },
 click:function(e){
  this.$good.addClass(data.view.shownCls);
  if(this.lottie)
   this.lottie.play();else
   this.showNext(true);

  e.stopPropagation();
 },
 next:function(){
  app.get('aggregator').trigger('sound','btn');
  if(!this.done)
  {
   if(this.indicies.includes(this.ctr))
   {
    this.$bad.addClass(data.view.shownCls);
   }else
   {
    this.$good.addClass(data.view.shownCls);
    this.showNext(false);
   }
  }
 },
 go:function(){
  if(this.done)
  {
   this.away();
   this.clr();
  }else
  {
   this.$el.addClass(data.view.okCls);
  }
 }
});