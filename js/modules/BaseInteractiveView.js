import {app} from '../bf/base.js';

let data;

export let BaseIntView=Backbone.View.extend({
 initialize:function(opts){
  this.after=opts.after;
  data=opts.data;
  if(opts.el)
   this.setElement(opts.el);
  this.$video=this.$(data.view.video);
 },
 away:function(){
  clearTimeout(this.wait);
  app.get('aggregator').trigger('main:toggle',false);
  this.toggle(false);
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
  if(this.$video&&this.$video.length)
   this.$video[0][f?'play':'pause']();
  if(f)
  {
   this.wait=setTimeout(()=>{
    this.after();
   },data.wait);
  }
 }
});