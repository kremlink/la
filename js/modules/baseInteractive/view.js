import {app} from '../../bf/base.js';
import {data} from './data.js';

export let BaseIntView=Backbone.View.extend({
 data:null,
 initialize:function({data:dat,opts:timecodeData}){
  this.data=dat;
  this._type=timecodeData.data.type;
  this._autoClose=!timecodeData.noAutoClose;
  this._vidAutoPlay=!timecodeData.noVidAutoPlay;

  this.$bgVideo=this.$(this.data.view.video);
  if(!this.$bgVideo.is('video'))
   this.$bgVideo=null;
  this.$bgSound=this._type&&this.data.view.soundBg?$(this.data.view.soundBg[this._type]):$(this.data.view.soundBg);
  this.toggle(true);

  $(data.theBtn).on('click',()=>{
   app.get('aggregator').trigger('sound','btn');
  });
 },
 away:function(failed=false,opts={}){
  clearTimeout(this._wait);
  app.get('aggregator').trigger('main:toggle',{show:false,failed:failed,opts:opts});
  this.toggle(false);
 },
 toggle:function(f){
  this.$el.toggleClass(this.data.view.shownCls,f);
  if(!app.get('_dev'))
  {
   if(this.$bgSound&&this.$bgSound.length)
   {
    this.$bgSound[0][f?'play':'pause']();
    if(!f)
     this.$bgSound[0].currentTime=0;
   }
  }
  if(this.$bgVideo&&this.$bgVideo.length)
  {
   this.$bgVideo[0][f&&this._vidAutoPlay?'play':'pause']();
   if(!f)
    this.$bgVideo[0].currentTime=0;
  }
  if(f)
  {
   this._wait=setTimeout(()=>{
    if(this._autoClose)
     this.away(true);
   },this._type?this.data.wait[this._type]:this.data.wait);
  }
 }
});