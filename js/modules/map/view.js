import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';

let events={};
events[`click ${data.events.circleClick}`]='circleClick';
events[`click ${data.events.chooseClick}`]='chooseClick';
events[`click ${data.events.go}`]='go';

export let MapView=BaseIntView.extend({
 events:events,
 done:false,
 initialize:function(opts){
  this.opts=opts;
  this.setElement(data.view.el[this.opts.data.type]);

  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   opts:opts
  }]);

  if(this.opts.data.type==='two'||this.opts.data.type==='three')
  {
   this.$video=this.$(data.view.vid);
   this.video();
  }
 },
 clr:function(){
  this.done=false;
  this.$el.removeClass(data.view.okCls+' '+data.view.doneCls+' '+data.view.errCls+' '+data.view.showBtnsTimeCls+' '+data.view.hideBtnTimeCls);
 },
 video:function(){
  let once=[];

  if(this.opts.data.type==='two')
  {
   this.$video.on('timeupdate',()=>{
    if(this.$video[0].currentTime>data.showBtnsTime.when)
    {
     this.$el.addClass(data.view.showBtnsTimeCls);
     //if(!once[0])
      //this.$video[0].currentTime=data.showBtnsTime.where;
     once[0]=true;
    }
    if(this.$video[0].currentTime>data.hideBtnTime.when)
    {
     this.$el.addClass(data.view.hideBtnTimeCls);
     //if(!once[1])
      //this.$video[0].currentTime=data.hideBtnTime.where;
     once[1]=true;
    }
   });
  }

  this.$video.on('ended',()=>{
   this.$el.addClass(data.view.doneCls+' '+data.view.errCls);
   this.done=true;
  });
 },
 circleClick:function(e){
  let ind=$(e.target).index();

  this.$el.addClass(data.view.doneCls);
  if(ind!==data.yesIndex)
   this.$el.addClass(data.view.errCls);
  this.done=true;
 },
 chooseClick:function(e){
  this.$video[0].pause();

  this.$el.addClass(data.view.doneCls);
  if($(e.currentTarget).hasClass(data.view.errCls))
   this.$el.addClass(data.view.errCls);

  this.done=true;
 },
 go:function(){
  if(this.done)
  {
   this.clr();
   this.away();
  }else
  {
   this.$el.addClass(data.view.okCls);
   if(this.opts.data.type==='two'||this.opts.data.type==='three')
   {
    this.$video[0].currentTime=0;
    this.$video[0].play();
   }
  }
 }
});