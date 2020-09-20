export let config={
 'index':{
  timecodes:{
   '1':[
    /*{start:1,end:2,invoked:false,simple:'one',rem:-30,remText:'Минус полминуты'},
    {start:6,rem:-3600,remText:'Минус час',checkpoint:true}*/

    // {start:445.0,end:448.3,invoked:false,simple:'one',rem:-3600,remText:'потерян 1 час'},
    // {start:448.4,rem:-1800,remText:'потеряно 30 минут',checkpoint:true},
     {start:1,end:2,invoked:false,vibrate:'one',rem:-3600,remText:'потерян 1 час'},
    // {start:528.36,rem:-1800,remText:'потеряно 30 минут',checkpoint:true},
    // {start:559.52,rem:-1800,remText:'потеряно 30 минут',checkpoint:true},
    // {start:570.36,end:584.26,invoked:false,vibrate:'two',rem:-3600,remText:'потерян 1 час'},
    // {start:838.9,end:865.52,invoked:false,rem:-3600,remText:'потерян 1 час'},
    // {start:1175.44,end:1205.1,invoked:false,map:'one',rem:-7200,remText:'потеряно 2 часа'},
    // {start:605.72,end:632.36,invoked:false,rem:-1800,remText:'потеряно 30 минут'},
    // {start:680.94,end:699.1,invoked:false,rem:-3600,remText:'потерян 1 час'},
    // {start:756.1,rem:-3600,remText:'потерян 1 час',checkpoint:true}

    /*{start:445.0,end:448.3,invoked:false,simple:'one',rem:-3600,remText:'потерян 1 час'},
   {start:448.4,rem:-1800,remText:'потеряно 30 минут',checkpoint:true},
   {start:470.2,end:483.58,invoked:false,vibrate:'one',rem:-3600,remText:'потерян 1 час'},
   {start:528.36,rem:-1800,remText:'потеряно 30 минут',checkpoint:true},
   {start:559.52,rem:-1800,remText:'потеряно 30 минут',checkpoint:true},
   {start:570.36,end:584.26,invoked:false,vibrate:'two',rem:-3600,remText:'потерян 1 час'},
   {start:838.9,end:865.52,invoked:false,rem:-3600,remText:'потерян 1 час'},
   {start:1175.44,end:1205.1,invoked:false,map:'one',rem:-7200,remText:'потеряно 2 часа'},
   {start:605.72,end:632.36,invoked:false,rem:-1800,remText:'потеряно 30 минут'},
   {start:680.94,end:699.1,invoked:false,rem:-3600,remText:'потерян 1 час'},
   {start:756.1,rem:-3600,remText:'потерян 1 час',checkpoint:true}*/
   ],
   '2':[
    {start:1,checkpoint:true},
    {start:2,end:3,invoked:false,map:'three',rem:-30,remText:'Минус полминуты'}
    // {start:1,checkpoint:true},
    // {start:2,end:3,invoked:false,simple:'one',rem:-30,remText:'Минус полминуты'},
    // {start:4,end:5,invoked:false,vibrate:'three',rem:-30,remText:'Минус полминуты'},
    // {start:6,end:7,invoked:false,map:'two',rem:-30,remText:'Минус полминуты'},
    // //{start:8,end:9,invoked:false,rem:-30,remText:'Минус полминуты'},
    // //{start:10,end:11,invoked:false,rem:-30,remText:'Минус полминуты'},
    // {start:10,end:11,invoked:false,map:'three',rem:-30,remText:'Минус полминуты'}
   ],
   '3':[
    {start:1,end:2,endGood:5,invoked:false,simple:'two',rem:-30,remText:'Минус полминуты'}
   ]
  },
  preload:{
   '1':{
    'images/':{imgs:['but-bad.png','but-click.png','but-good.png','but-no.png','but-yes.png','first-bg.jpg','map-bg1.png','map-bg2.png','pop_shtorka.png','pulse-btn.png',
      'question-photo.png','start-bg.svg','start-button.svg','start-button-p.svg']},
    'images/packing/':{i:3,j:[12,8,5],tmpl1:'packing-[i]-[j].png',tmpl2:'packing-[i]-[j]-p.png'}
   },
   '2':{

   },
   '3':{

   }
  }
 },
 'timer':{
  '1':{start:54*60*60},
  '2':{start:44*60*60},
  '3':{start:34*60*60}
 },
 'main':{
  stepViews:{
   '1':[/*'StartView','Checkpoint',*/'VibrateView'/*,'Checkpoint','Checkpoint','VibrateView','QsView','MapView','CatchView','SchemeView','Checkpoint'*/],
   '2':['Checkpoint','CartogrView'/*'Checkpoint','StartView','VibrateView','MapView','CartogrView','ForestView','MapView'*/],
   '3':['StartView']
  }
 },
 'vibrate':{
  ep2videoSrc:'../BokehNightDriving.mp4',
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
   ],
   '3':[
    {
     speed:[4,1000],
     src:'../oceans.mp4',
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