import {app} from '../../bf/base.js';
import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
let data=app.configure({interactives:{map:dat}}).interactives.map;

let events={};
events[`click ${data.events.circleClick}`]='circleClick';
events[`click ${data.events.chooseClick}`]='chooseClick';
events[`click ${data.events.go}`]='go';

export let MapView=BaseIntView.extend({
 events:events,
 done:false,
 areas:[],
 once:[],
 initialize:function(opts){
  this.opts=opts;
  this.setElement(data.view.el[this.opts.data.type]);

  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   opts:opts
  }]);

  if(this.opts.data.type==='two'||this.opts.data.type==='three'||this.opts.data.type==='four')
   this.video();
  if(this.opts.data.type==='four')
  {
   this.tmpl=_.template($(data.view.fourTemplate).html());
   this.fourRender();
  }
 },
 clr:function(){
  this.done=false;
  this.$el.removeClass(data.view.okCls+' '+data.view.doneCls+' '+data.view.errCls+' '+data.view.showBtnsTimeCls+' '+data.view.hideBtnTimeCls);
  if(this.opts.data.type==='four'){
   this.areas=[];
   this.once=[];
   this.$areaClick.removeClass(data.view.shownCls);
  }
 },
 fourRender:function(){
  let s='',
  self=this;

  for(let i=0;i<data.fourBtnsData.length;i++)
   s+=this.tmpl(data.fourBtnsData[i]);

  this.$el.append(this.$areaClick=$(s));
  this.$areaClick.each(function(i){
   $(this).on('click',()=>{
    self.areas[i]=true;
   });
  });
 },
 video:function(){
  if(this.opts.data.type==='two'||this.opts.data.type==='four')
  {
   this.$bgVideo.on('timeupdate',()=>{
    let curr=this.$bgVideo[0].currentTime;

    if(this.opts.data.type==='two')
    {
     if(curr>data.two.showBtnsTime.when)
     {
      this.$el.addClass(data.view.showBtnsTimeCls);
      //if(!once[0])
      //this.$bgVideo[0].currentTime=data.showBtnsTime.where;
      //once[0]=true;
     }
     if(this.$bgVideo[0].currentTime>data.two.hideBtnTime.when)
     {
      this.$el.addClass(data.view.hideBtnTimeCls);
      //if(!once[1])
      //this.$bgVideo[0].currentTime=data.hideBtnTime.where;
      //once[1]=true;
     }
    }
    if(this.opts.data.type==='four')
    {
     data.fourBtnsData.forEach((o,i)=>{
      let shown=curr>=o.start&&curr<o.end;

      this.$areaClick.eq(i).toggleClass(data.view.shownCls,shown);
      if(shown)
      {
       this.once[i]=true;
      }else
      {
       if(this.once[i])
       {
        this.once[i]=false;
        app.get('aggregator').trigger('timer:update',o);
       }
      }
     });
    }
   });
  }

  this.$bgVideo.on('ended',()=>{
   if(this.opts.data.type!=='four')
   {
    this.$el.addClass(data.view.doneCls+' '+data.view.errCls);
    this.done=true;
   }else
   {
    this.clr();
    this.away();
   }
  });
 },
 circleClick:function(e){
  let ind=$(e.target).index();

  this.$el.addClass(data.view.doneCls);
  if(ind!==data.yesIndex)
   this.$el.addClass(data.view.errCls);
  this.done=true;
 },
 chooseClick:function(e){//pauses vid and shows ending text+btn
  this.$bgVideo[0].pause();

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
   if(this.opts.data.type==='two'||this.opts.data.type==='three'||this.opts.data.type==='four')
   {
    this.$bgVideo[0].currentTime=0;
    this.$bgVideo[0].play();
   }
  }
 }
});