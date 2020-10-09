import {app} from '../../bf/base.js';
import {data} from './data.js';

export let BaseIntView=Backbone.View.extend({
 data:null,
 initialize:function(opts){
  this.data=opts.data;
  this.type=opts.type;
  if(opts.el)
   this.setElement(opts.el);
  this.$video=this.$(this.data.view.video);
  if(!this.$video.is('video'))
   this.$video=null;
  this.$sBg=this.type&&this.data.view.soundBg?$(this.data.view.soundBg[this.type]):$(this.data.view.soundBg);
  this.toggle(true);

  $(data.theBtn).on('click',()=>{
   app.get('aggregator').trigger('sound','btn');
  });
 },
 away:function(failed=false,opts){
  clearTimeout(this.wait);
  app.get('aggregator').trigger('main:toggle',{show:false,failed:failed,opts:opts});
  this.toggle(false);
 },
 toggle:function(f){
  this.$el.toggleClass(this.data.view.shownCls,f);
  if(!app.get('_dev'))
  {
   if(this.$sBg&&this.$sBg.length)
    this.$sBg[0][f?'play':'pause']();
  }
  if(this.$video&&this.$video.length)
   this.$video[0][f?'play':'pause']();
  if(f)
  {
   this.wait=setTimeout(()=>{
    this.away(true);
   },this.type?this.data.wait[this.type]:this.data.wait);
  }
 }
});