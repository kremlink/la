export let config={
 'index':{
  timecodes:{
   '1':[
    {start:445.0,end:448.3,invoked:false,simple:'one',rem:-3600,remText:'потерян 1 час'},
    {start:448.4,rem:-1800,remText:'потеряно 30 минут',checkpoint:true},
    {start:470.2,end:483.58,invoked:false,vibrate:'one',rem:-3600,remText:'потерян 1 час'},
    {start:528.36,rem:-1800,remText:'потеряно 30 минут',checkpoint:true},
    {start:559.52,rem:-1800,remText:'потеряно 30 минут',checkpoint:true},
    {start:570.36,end:584.26,invoked:false,vibrate:'two',rem:-3600,remText:'потерян 1 час'},
    {start:838.9,end:865.52,invoked:false,rem:-3600,remText:'потерян 1 час'},
    {start:1175.44,end:1205.1,invoked:false,map:'one',rem:-7200,remText:'потеряно 2 часа'},
    {start:605.72,end:632.36,invoked:false,rem:-1800,remText:'потеряно 30 минут'},
    {start:680.94,end:699.1,invoked:false,rem:-3600,remText:'потерян 1 час'},
    {start:756.1,rem:-3600,remText:'потерян 1 час',checkpoint:true}

   ],
   '2':[
    //{start:1,checkpoint:true},
    //{start:2,end:3,invoked:false,map:'three',rem:-30,remText:'Минус полминуты'}
    /*{start:1,checkpoint:true},
	{start:4,end:5,invoked:false,map:'two',rem:-30,remText:'Минус полминуты'},
	{start:2,end:3,invoked:false,simple:'one',rem:-30,remText:'Минус полминуты'},
    {start:6,end:7,invoked:false,vibrate:'three',rem:-30,remText:'Минус полминуты'},
	{start:8,end:9,invoked:false,rem:-30,remText:'Минус полминуты'},
    {start:10,end:11,invoked:false,rem:-30,remText:'Минус полминуты'},
    {start:12,end:13,invoked:false,map:'three',rem:-30,remText:'Минус полминуты'}*/
	
	{start:1,checkpoint:true},
	{start:111.2,rem:-1800,remText:'',checkpoint:true},
	{start:129.14,end:151.8,invoked:false,map:'two',rem:-3600,remText:'потерян 1 час'},
	{start:248.92,rem:-1800,remText:'',checkpoint:true},
	{start:318.52,rem:-1800,remText:'',checkpoint:true},
	{start:385.1,end:387.12,invoked:false,simple:'one',rem:-1,remText:'потерян 1 час'},
	{start:438.44,rem:-1800,remText:'',checkpoint:true},
	{start:507.96,rem:-3600,remText:'',checkpoint:true},
    {start:538.14,end:552.72,invoked:false,vibrate:'three',rem:-10800,remText:'потеряно 3 часа'},
	{start:735.58,end:749.4,invoked:false,rem:-3600,remText:'потерян 1 час'},
	{start:736.52,rem:-1800,remText:'',checkpoint:true},
	{start:871.68,rem:-3600,remText:'',checkpoint:true},
	{start:935.96,rem:-900,remText:'',checkpoint:true},
	{start:959.72,rem:-900,remText:'',checkpoint:true},
    {start:963.1,end:988.52,invoked:false,rem:-1,remText:''},
	{start:988.32,rem:-23400,remText:'',checkpoint:true},
	{start:1120.24,rem:2,remText:'',checkpoint:true},
	{start:1244.68,rem:-1800,remText:'',checkpoint:true},
	{start:1325,rem:-10800,remText:'',checkpoint:true},
    {start:1349.1,end:1360.7,invoked:false,map:'three',rem:-1,remText:''}
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
   '1':['StartView','Checkpoint','VibrateView','Checkpoint','Checkpoint','VibrateView','QsView','MapView','CatchView','SchemeView','Checkpoint'],
   '2':['Checkpoint','Checkpoint','MapView','Checkpoint','Checkpoint','StartView','Checkpoint','Checkpoint','VibrateView','ForestView','Checkpoint','Checkpoint','Checkpoint','Checkpoint','CartogrView','Checkpoint','Checkpoint','Checkpoint','Checkpoint','MapView']
  }
 },
 'vibrate':{
  ep2videoSrc:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/mp4/bg/2-10-go.mp4',
 },
 'player':{
  redirect:'https://найден-жив.рф/end1.html',
  _production:true,
  quality:{
   '1':[
		{
		speed:[200,1000],
		src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode1/mp4/ng_master_1ser4k.mp4',
		label:'4k'
	   },
	   {
		speed:[5,200],
		src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode1/mp4/ng_master_1ser_1080p.mp4',
		label:'1080P'
	   },
	   {
		speed:[2,5],
		src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode1/mp4/ng_master_1ser_720p.mp4',
		label:'720P'
	   },
	   {
		speed:[0,2],
		src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode1/mp4/ng_master_1ser_480p.mp4',
		label:'480P'
	   }
   ],
   '2':[
		{
		speed:[200,1000],
		src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/ng_master_2ser_mobdevice_2160p_4k.mp4',
		label:'4k'
	   },
	   {
		speed:[5,200],
		src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/ng_master_2ser_mobdevice_1080p.mp4',
		label:'1080P'
	   },
	   {
		speed:[2,5],
		src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/ng_master_2ser_mobdevice_720p.mp4',
		label:'720P'
	   },
	   {
		speed:[0,2],
		src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/ng_master_2ser_mobdevice_480p.mp4',
		label:'480P'
	   }
   ]
  }
 }
 //"index.toggle":{extra:{a:1,$b:[2,'3',{$c:{$d:'#de',f:4}}]}},
};