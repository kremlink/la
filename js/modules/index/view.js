import {MainView} from '../main/view.js';
import {PlayerView} from '../player/view.js';
import {data} from './data.js';

export {data} from './data.js';

//import {data as dat} from './data.js';
//let data=app.configure({index:dat}).index;

let events={};
events[`click ${data.events.start}`]='start';

export function init(app,modules){
 if(!~modules.indexOf('index'))
  return;

 new (Backbone.View.extend({
  events:events,
  el:data.view.el,
  initialize:function(){
   this.playerView=new PlayerView({timecodes:data.timecodes});
   this.mainView=new MainView;

   if(!matchMedia(data.minViewport).matches)
    this.$el.addClass(data.view.tooSmallCls);
   $(window).on('resize',_.debounce(function(){
    //location.reload();//TODO: uncomment
   },200));
   this.listenTo(app.get('aggregator'),'player:ready',this.playerReady);
   this.listenTo(app.get('aggregator'),'page:fs',this.fs);
   this.listenTo(app.get('aggregator'),'page:timer',this.timer);
  },
  playerReady:function(){//inconsistent loadeddata event with multiple videos
   this.loaded();
   /*let self=this,
    res=this.$el.find('video,audio'),
    ctr=[],
   wait=setTimeout(()=>this.loaded(),data.waitLoad);

   res.each(function(i){
     this.addEventListener('loadeddata',function(){
      console.log(this.readyState);//TODO: remove
      if(this.readyState>=3)
      {
       ctr[i]=true;
       if(ctr[res.length-1])
       {
        self.$el.imagesLoaded(()=>{
         clearTimeout(wait);
         self.loaded();
        });
       }
      }
     });
   });*/
  },
  loaded:function(){
   this.$el.addClass(data.view.loadedCls);
  },
  timer:function(){
   this.$el.addClass(data.view.timerCls);
  },
  start:function(){
   $('.ov-video')[0].play();
   this.$el.addClass(data.view.startCls);
   this.playerView.play();
  },
  fs:function(f){
   this.$el.toggleClass(data.view.fsCls,f);
  }
 }));
}