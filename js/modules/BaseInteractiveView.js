import {app} from '../bf/base.js';

let data;

export let BaseIntView=Backbone.View.extend({
 initialize:function(opts){
  data=opts.data;
  if(opts.el)
   this.setElement(opts.el);
  this.$video=this.$(data.view.video);
  this.toggle(true);
 },
 away:function(failed=false){
  clearTimeout(this.wait);
  app.get('aggregator').trigger('main:toggle',false,failed);
  this.toggle(false);
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
  if(this.$video&&this.$video.length)
   this.$video[0][f?'play':'pause']();
  if(f)
  {
   this.wait=setTimeout(()=>{
    this.away(true);
   },data.wait);
  }
 }
});