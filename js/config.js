export let config={
 'index':{
  timecodes:{
   '1':[
    {start:1,end:2,invoked:false,simple:'one',rem:-30,remText:'Минус полминуты'},
    {start:6,rem:-3600,remText:'Минус час',checkpoint:true}

    /*{start:1,end:2,invoked:false,simple:'one',rem:-40,remText:'Минус 40 секунд'},
    {start:3,end:4,invoked:false,vibrate:'one',rem:-30,remText:'Минус полминуты'},
    {start:5,end:6,invoked:false,vibrate:'two',rem:-30,remText:'Минус полминуты'},
    {start:7,end:8,invoked:false,rem:-60,remText:'Минус 2 минуты'},
    {start:9,end:10,invoked:false,rem:-30,remText:'Минус полминуты'},
    {start:11,end:12,invoked:false,rem:-180,remText:'Минус 3 минуты'},
    {start:13,end:14,invoked:false,rem:-300,remText:'Минус 5 минут'}*/

    /*{start:444.46,end:447.4,invoked:false,simple:'one',rem:-40,remText:'Минус 40 секунд'},
    {start:471.3,end:482.72,invoked:false,vibrate:'one',rem:-30,remText:'Минус полминуты'},
    {start:571.46,end:583.36,invoked:false,vibrate:'two',rem:-30,remText:'Минус полминуты'},
    {start:846.58,end:869.8,invoked:false,rem:-60,remText:'Минус 2 минуты'},
    {start:1182.22,end:1209.68,invoked:false,rem:-30,remText:'Минус полминуты'},
    {start:687.62,end:703.68,invoked:false,rem:-180,remText:'Минус 3 минуты'},
    {start:612.3,end:637.04,invoked:false,rem:-300,remText:'Минус 5 минут'}*/
   ],
   '2':[
    {start:1,checkpoint:true},
    {start:2,end:3,invoked:false,rem:-30,remText:'Минус полминуты'}
    /*{start:4,end:5,invoked:false,vibrate:'three',rem:-30,remText:'Минус полминуты'},
    {start:6,end:7,invoked:false,simple:'two',rem:-30,remText:'Минус полминуты'}*/
   ]
  },
  preload:{
   '1':{
    'images/':{imgs:['but-bad.png','but-click.png','but-good.png','but-no.png','but-yes.png','first-bg.jpg','map-bg1.png','map-bg2.png','pop_shtorka.png','pulse-btn.png',
      'question-photo.png','start-bg.svg','start-button.svg','start-button-p.svg']},
    'images/packing/':{i:3,j:[12,8,5],tmpl1:'packing-[i]-[j].png',tmpl2:'packing-[i]-[j]-p.png'}
   },
   '2':{

   }
  }
 },
 'timer':{
  '1':{start:54*60*60},
  '2':{start:44*60*60}
 },
 'main':{
  stepViews:{
   '1':[/*'StartView','VibrateView','VibrateView','QsView','MapView','CatchView','SchemeView',*/'StartView','Checkpoint','VibrateView','Checkpoint'],
   '2':['Checkpoint','ForestView'/*,'StartView','VibrateView','StartView','CartogrView'*/]
  }
 },
 'player':{
  redirect:'episodes.html',
  quality:{
   '1':[
    {
     speed:[4,1000],
     //src:'../PREDMASTER1SER.mp4',
     //src:'../oceans.mp4',
     label:'720P'
    },
    {
     speed:[3,4],
     src:'../oceans1.mp4',
     label:'480P'
    },
    {
     speed:[0,3],
     src:'../oceans.mp4',
     label:'360P'
    }
   ],
   '2':[
    {
     speed:[4,1000],
     //src:'../PREDMASTER1SER.mp4',
     //src:'../oceans.mp4',
     label:'720P'
    },
    {
     speed:[3,4],
     src:'../oceans1.mp4',
     label:'480P'
    },
    {
     speed:[0,3],
     src:'../oceans.mp4',
     label:'360P'
    }
   ]
  }
 }
 //"index.toggle":{extra:{a:1,$b:[2,'3',{$c:{$d:'#de',f:4}}]}},
};