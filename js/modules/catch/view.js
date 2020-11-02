import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';
import {app} from '../../bf/base.js';

let mri=function(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
 },
 mra=function(min,max){
  return Math.random()*(max-min)+min;
 },
 cRand=function(c,dim){
  let m=0;

  if(c===0)
   m=1;
  if(c===dim)
   m=-1;
  if(c!==0&&c!==dim)
   m=(Math.random()<0.5?-1:1);

  return m*mri(data.minSh,data.maxSh);
 };

let events={};
events[`click ${data.events.start}`]='start';
events[`click ${data.events.choose}`]='choose';
events[`click .${data.view.thingCls}`]='add';

export let CatchView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 pData:[],
 index:-1,
 counter:[],
 done:0,
 thTemplate:null,
 initialize:function(opts){
  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   opts:opts
  }]);
 },
 clr:function(){
  this.done=0;
  this.$el.removeClass(data.view.startCls);
  for(let i=0;i<data.things.length;i++)
   this.$el.removeClass(data.view.doneCls+(i+1));
 },
 toggle:function(f){
  if(f)
   this.render();
  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 render:function(){
  let self=this,
   s,
   tmp;

  this.thTemplate=_.template($(data.view.thTemplate).html());

  for(let i=0;i<data.things.length;i++)
  {
   this.counter[i]=0;
   s='';
   this.pData[i]={coords:[],delay:[],stop:[]};

   data.things[i].forEach((o,j)=>{
    //tmp={x:mri(0,100-data.maxD.x),y:mri(0,100-data.maxD.y)};
    tmp={x:o.left,y:o.top};
    this.pData[i].coords.push(tmp);
    s+=this.thTemplate({cls:data.view.thingCls+(!o.no?' '+data.view.goodCls:''),width:o.width*data.divide*(o.mult?o.mult:1),left:tmp.x,top:tmp.y,i1:i+1,i2:j+1});
   });

   this.$(data.view.into).eq(i).html(s).find('.'+data.view.thingCls).each(function(j){
    let obj=$(this);

    setTimeout(()=>self.play(i,j,obj),0);
    obj.on('transitionend',function(e){
     if(!self.pData[i].stop[j]&&e.originalEvent.propertyName==='left')
      self.play(i,j,obj);
    });
   });
  }
 },
 play:function(i,j,obj){
  let tmp;

  tmp={x:this.pData[i].coords[j].x+cRand(this.pData[i].coords[j].x,100-data.maxD.x),y:this.pData[i].coords[j].y+cRand(this.pData[i].coords[j].y,100-data.maxD.y)};
  if(tmp.x<0)
   tmp.x=0;
  if(tmp.x>100-data.maxD.x)
   tmp.x=100-data.maxD.x;
  if(tmp.y<0)
   tmp.y=0;
  if(tmp.y>100-data.maxD.y)
   tmp.y=100-data.maxD.y;

  if(tmp.x===this.pData[i].coords[j].x||tmp.y===this.pData[i].coords[j].y)
  {
   this.play(i,j,obj);
   return;
  }

  obj.css({'transition-duration':mra(data.minSpeed,data.maxSpeed)+'s',left:tmp.x+'%',top:tmp.y+'%'});
  this.pData[i].coords[j].x=tmp.x;
  this.pData[i].coords[j].y=tmp.y;
 },
 start:function(){
  this.$el.addClass(data.view.startCls);
  this.$bgVideo[0].play();
 },
 choose:function(e){
  this.index=$(e.currentTarget).index();
  this.$el.addClass(data.view.inGameCLs+' '+data.view.chooseCls+(this.index+1));
  this.done++;
 },
 add:function(e){
  let item=$(e.currentTarget),
    index=item.index();

  if(data.things[this.index][index].no)
  {
   app.get('aggregator').trigger('sound','ctch-minus');
   app.get('aggregator').trigger('board:score',{what:'catch-'+this.index+'-'+index,points:-10});
   item.addClass(data.view.noCls);
   setTimeout(()=>item.removeClass(data.view.noCls),data.shakeDur);
  }else
  {
   app.get('aggregator').trigger('sound','ctch-plus');
   app.get('aggregator').trigger('board:score',{what:'catch-'+this.index+'-'+index,points:30});
   this.pData[this.index].stop[index]=true;
   item.css('transition','').off('transitionend');
   setTimeout(()=>item.addClass(data.view.dropCls).css(data.drop),0);
   this.counter[this.index]++;
   if(this.counter[this.index]===_.where(data.things[this.index],{no:0}).length)
    setTimeout(()=>{
     this.$el.removeClass(data.view.inGameCLs+' '+data.view.chooseCls+(this.index+1)).addClass(data.view.doneCls+(this.index+1));
     if(this.done===data.things.length)
     {
      this.away();
      this.clr();
     }
    },data.winWait);
  }
 }
});