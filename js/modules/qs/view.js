import {app} from '../../bf/base.js';
import {data} from './data.js';

let events={};
events[`click ${data.events.next}`]='next';
events[`click ${data.events.no}`]='no';
events[`click ${data.events.go}`]='go';

export let QsView=Backbone.View.extend({
 el:data.view.el,
 events:events,
 liTemplate:_.template($(data.view.liTemplate).html()),
 initialize:function(){
  let $li;

  this.ctr=0;
  this.$text=this.$(data.view.text).text(data.choose[0]).addClass(data.view.shownCls).on('transitionend',(e)=>{
   if(!this.$text.hasClass(data.view.shownCls)&&this.ctr<data.choose.length-1)
   {
    console.log(e.originalEvent);
    $li=$(this.liTemplate({text:data.choose[this.ctr]}));
    this.$text.addClass(data.view.shownCls).text(data.choose[this.ctr+1]);
    this.ctr++;
    if(this.ctr===data.choose.length)
    {
     this.stop=true;
     this.$el.removeClass(data.view.errCls).addClass(data.view.goCls);
     this.$text.addClass(data.view.shownCls);
    }
    this.$list.append($li);
    _.debounce(()=>$li.addClass(data.view.shownCls),0)();
   }
  });
  this.$list=this.$(data.view.list);
 },
 next:function(){
  if(!this.stop)
  {
   this.$el.removeClass(data.view.errCls);
   this.$text.removeClass(data.view.shownCls);
  }
 },
 no:function(){
  this.$el.addClass(data.view.errCls);
 },
 go:function(){
  app.get('aggregator').trigger('main:toggle',false);
  this.toggle(false);
 },
 toggle:function(f){
  this.$el.toggleClass(data.view.shownCls,f);
 },
});