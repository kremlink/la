import {data} from './data.js';
import {BaseIntView} from '../baseInteractive/view.js';
import {app} from '../../bf/base.js';

let events={};
events[`click ${data.events.go}`]='go';
events[`click ${data.events.item}`]='item';

export let LeafletView=BaseIntView.extend({
 el:data.view.el,
 events:events,
 done:false,
 iTmpl:null,
 bTmpl:null,
 gTmpl:null,
 ctr:0,
 initialize:function(){
  BaseIntView.prototype.initialize.apply(this,[{
   data:data
  }]);

  this.$into=this.$(data.view.$into);
  this.$items=null;
  this.$bad=null;
  this.$good=null;
  this.iTmpl=_.template($(data.view.iTmpl).html());
  this.bTmpl=_.template($(data.view.bTmpl).html());
  this.gTmpl=_.template($(data.view.gTmpl).html());
  this.render();
 },
 render:function(){
  let s='',s1='',s2='';

  data.data.forEach((o,i)=>{
   s+=this.iTmpl(o);
   s1+=this.bTmpl({i:i+1});
   s2+=this.gTmpl({i:i+1});
  });

  this.$into.append(this.$bad=$(s1)).append(this.$good=$(s2)).append(this.$items=$(s));
 },
 item:function(e){
  let item=$(e.currentTarget).removeClass(data.view.shownCls),
   index=this.$items.index(item);

  this.$bad.eq(index).removeClass(data.view.shownCls);
  this.$good.eq(index).addClass(data.view.shownCls);
  app.get('aggregator').trigger('sound','btn');
  if(++this.ctr===data.data.length)
  {
   setTimeout(()=>{
    this.$el.addClass(data.view.doneCls);
    this.done=true;
   },data.winWait);
  }
 },
 go:function(){
  if(this.done)
  {
   this.done=false;
   this.$el.removeClass(data.view.okCls+' '+data.view.doneCls);
   this.ctr=0;
   this.$items.remove();
   this.$bad.remove();
   this.$good.remove();
   this.away();
  }else
  {
   this.$el.addClass(data.view.okCls);
  }
 }
});