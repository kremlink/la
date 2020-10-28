import {data} from './data.js';
import {app} from '../../bf/base.js';
import {BaseIntView} from '../baseInteractive/view.js';

let events={};
events[`click ${data.events.yes}`]='yes';
events[`click ${data.events.no}`]='no';

export let QsView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 ctr:0,
 changing:false,
 initialize:function(opts){
  let $li;

  BaseIntView.prototype.initialize.apply(this,[{
   data:data,
   opts:opts
  }]);

  this.liTemplate=_.template($(data.view.liTemplate).html());

  this.$msg=this.$(data.view.msg);
  this.$chosen=null;
  this.$text=this.$(data.view.text).html(data.choose[this.ctr].text).addClass(data.view.shownCls);
  this.$msg.on('transitionend',()=>{
   if(this.$msg.hasClass(data.view.shownCls))
   {
    this.$chosen.removeClass(data.view.goodCls+' '+data.view.badCls);
    $li=!data.choose[this.ctr].hidden?$(this.liTemplate({text:data.choose[this.ctr].text.slice(0,-1)})):null;
    this.ctr++;
    if($li)
    {
     this.$list.append($li);
     _.debounce(()=>$li.addClass(data.view.shownCls),0)();
    }
    setTimeout(()=>this.$msg.removeClass(data.view.shownCls),data.time);
   }else
   {
    this.$text.removeClass(data.view.shownCls);
   }
  });
  this.$text.on('transitionend',()=>{
   let end=this.ctr===data.choose.length;

   if(this.$text.hasClass(data.view.shownCls))
   {
    this.changing=end;
    if(end)
     setTimeout(()=>this.go(),data.time);
   }else
   {
    this.$text.addClass(data.view.shownCls).html(end?data.endText:data.choose[this.ctr].text);
   }
  });
  this.$list=this.$(data.view.list);
 },
 clr:function(){
  this.changing=false;
  this.ctr=0;
  this.$text.html(data.choose[this.ctr].text);
  this.$list.html('');
 },
 chosen:function(e,i){
  if(!this.changing)
  {
   app.get('aggregator').trigger('board:score',{what:'qs-'+this.ctr,points:i^data.choose[this.ctr].yes?30:-10});
   app.get('aggregator').trigger('sound',i^data.choose[this.ctr].yes?'plus':'minus');
   this.changing=true;
   this.$msg.html(data.choose[this.ctr].msg[i]).addClass(data.view.shownCls);
   this.$chosen=$(e.currentTarget).addClass(i^data.choose[this.ctr].yes?data.view.goodCls:data.view.badCls);
  }
 },
 yes:function(e){
  this.chosen(e,0);
 },
 no:function(e){
  this.chosen(e,1);
 },
 go:function(){
  this.clr();
  this.away();
 }
});