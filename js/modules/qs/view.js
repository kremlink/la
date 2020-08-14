import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';

let events={};
events[`click ${data.events.yes}`]='yes';
events[`click ${data.events.no}`]='no';

export let QsView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 $sPlus:$(data.view.soundPlus),
 $sMinus:$(data.view.soundMinus),
 initialize:function(){
  let $li;

  this.liTemplate=_.template($(data.view.liTemplate).html());

  BaseIntView.prototype.initialize.apply(this,[{
   data:data
  }]);

  this.$msg=this.$(data.view.msg);

  this.ctr=0;
  this.$chosen=null;
  this.changing=false;
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
 yes:function(e){
  if(!this.changing)
  {
   this[data.choose[this.ctr].yes?'$sPlus':'$sMinus'][0].play();
   this.changing=true;
   this.$msg.html(data.choose[this.ctr].msg[0]).addClass(data.view.shownCls);
   this.$chosen=$(e.currentTarget).addClass(data.choose[this.ctr].yes?data.view.goodCls:data.view.badCls);
  }
 },
 no:function(e){
  if(!this.changing)
  {
   this[!data.choose[this.ctr].yes?'$sPlus':'$sMinus'][0].play();
   this.changing=true;
   this.$msg.html(data.choose[this.ctr].msg[1]).addClass(data.view.shownCls);
   this.$chosen=$(e.currentTarget).addClass(!data.choose[this.ctr].yes?data.view.goodCls:data.view.badCls);
  }
 },
 go:function(){
  this.away();
 }
});