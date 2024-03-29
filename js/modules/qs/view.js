import {app} from '../../bf/base.js';
import {data} from './data.js';

let events={};
events[`click ${data.events.yes}`]='yes';
events[`click ${data.events.no}`]='no';

export let QsView=Backbone.View.extend({
 el:data.view.el,
 events:events,
 liTemplate:_.template($(data.view.liTemplate).html()),
 initialize:function(){
  let $li;

  this.$msg=this.$(data.view.msg);
  this.$video=this.$(data.view.video);

  this.ctr=0;
  this.$chosen=null;
  this.changing=false;
  this.$text=this.$(data.view.text).html(data.choose[this.ctr].text).addClass(data.view.shownCls);
  this.$msg.on('transitionend',()=>{
   if(this.$msg.hasClass(data.view.shownCls))
   {
    this.$chosen.removeClass(data.view.goodCls+' '+data.view.badCls);
    $li=!data.choose[this.ctr].hidden?$(this.liTemplate({text:data.choose[this.ctr].text.slice(0, -1)})):null;
    this.ctr++;
    if($li)
    {
     this.$list.append($li);
     _.debounce(()=>$li.addClass(data.view.shownCls),0)();
    }
    setTimeout(()=>this.$msg.removeClass(data.view.shownCls),data.wait);
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
     setTimeout(()=>this.go(),data.wait);

   }else
   {
    this.$text.addClass(data.view.shownCls).html(end?data.endText:data.choose[this.ctr].text);
   }
  });
  this.$list=this.$(data.view.list);
 },
 yes:function(e){
  if(!this.changing)
  {
   this.changing=true;
   this.$msg.html(data.choose[this.ctr].msg[0]).addClass(data.view.shownCls);
   this.$chosen=$(e.currentTarget).addClass(data.choose[this.ctr].yes?data.view.goodCls:data.view.badCls);
  }
 },
 no:function(e){
  if(!this.changing)
  {
   this.changing=true;
   this.$msg.html(data.choose[this.ctr].msg[1]).addClass(data.view.shownCls);
   this.$chosen=$(e.currentTarget).addClass(!data.choose[this.ctr].yes?data.view.goodCls:data.view.badCls);
  }
 },
 go:function(){
  app.get('aggregator').trigger('main:toggle',false);
  this.toggle(false);
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
  this.$video[0][f?'play':'pause']();
 },
});