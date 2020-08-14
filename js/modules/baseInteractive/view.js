import {app} from '../../bf/base.js';
import {data} from './data.js';

export let BaseIntView=Backbone.View.extend({
 data:null,
 initialize:function(opts){
  this.data=opts.data;
  if(opts.el)
   this.setElement(opts.el);
  this.$video=this.$(this.data.view.video);
  this.$sBg=opts.vibrate?$(this.data.view.soundBg[opts.vibrate]):$(this.data.view.soundBg);
  this.$sound=$(data.sound);
  this.toggle(true);

  $(data.theBtn).on('click',()=>{
   this.$sound[0].currentTime=0;
   this.$sound[0]['play']();
  });
 },
 away:function(failed=false){
  clearTimeout(this.wait);
  app.get('aggregator').trigger('main:toggle',false,failed);
  this.toggle(false);
 },
 toggle:function(f){
  this.$el.toggleClass(this.data.view.shownCls,f);
  if(this.$sBg&&this.$sBg.length)
   this.$sBg[0][f?'play':'pause']();
  if(this.$video&&this.$video.length)
   this.$video[0][f?'play':'pause']();
  if(f)
  {
   this.wait=setTimeout(()=>{
    this.away(true);
   },this.data.wait);
  }
 }
});