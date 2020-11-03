export let config={
 metrika:{name:64365469},
 'index':{
  preload:{
   '1':{
    /*'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode1/images/':{imgs:['timer.svg']},
    'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode1/':{imgs:['but-bad.png','but-click.png','but-good.png','but-no.png','but-yes.png','map-bg1.png','pop_shtorka.png','pulse-btn.png',
      'gear-help.svg','start-bg.svg','start-button.svg','start-button-p.svg']},
    'images/':{imgs:['question-photo.png','map-bg2.png']},
    'images/packing/':{j:[12,8,5],tmpl:['packing-[i]-[j].png','packing-[i]-[j]-p.png']}*/
   },
   '2':{
    'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode1/':{imgs:['but-click.png','pop_shtorka.png','pulse-btn.png','start-bg.svg','start-button.svg','start-button-p.svg']},
    'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/images/2-27/':{imgs:['2-27-help.png','2-27-back.png','2-27-med.png']},
    'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/images/2-14/':{imgs:['2-14-grid-0.png'],j:[47],tmpl:['2-14-grid-[j].png']},
    'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/images/2-17/':{imgs:['2-17-map-error.svg']},
    'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/images/2-17/wins/':{imgs:['2-17-map-0.png'],j:[34],tmpl:['2-17-map-[j].png']},
    'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/images/2-17/prev/':{imgs:['2-17-prev-0.png'],j:[22],tmpl:['2-17-prev-[j].png']}
   },
   '3':{
    'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode1/':{imgs:['but-click.png','pop_shtorka.png','pulse-btn.png','start-bg.svg','start-button.svg','start-button-p.svg']},
    'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode3/images/':{imgs:['3-1-top.png']},
    'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode3/images/3-07/':{j:[10],tmpl:['3-07-[j]-bg.jpg']},
    'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode3/images/3-21/':{imgs:['covered.jpg','main.jpg']}
   },
   '4':{
    'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode1/':{imgs:['but-click.png','pop_shtorka.png','pulse-btn.png','start-bg.svg','start-button.svg','start-button-p.svg']},
    'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode4/images/':{imgs:['3-21-aim-fixed.svg','bg.png','game-bg.jpg','game-open.jpg',
      'drone-d.png','drone-l.png','drone-r.png','drone-u.png'],j:[3],tmpl:['4-18-[j]-bg.jpg']}
   }
  }
 },
 'timer':{
  '1':{start:54*60*60},
  '2':{start:44*60*60},
  '3':{start:30*60*60},
  '4':{start:23*30*60},
  url:'timer.php?time='
 },
 board:{
  defName:'Noname',
  url:'php.php?board='
 },
 sound:{
  template:'<audio src="../sounds/<%= src %>.mp3" preload="auto"></audio>'
 },
 /*stepViews:{
  '1':['StartView','Checkpoint','VibrateView','Checkpoint','Checkpoint','VibrateView','QsView','MapView','CatchView','SchemeView','Checkpoint'],
  '2':['Checkpoint','Checkpoint','MapView','Checkpoint','Checkpoint','StartView','Checkpoint','Checkpoint','VibrateView','ForestView','Checkpoint','Checkpoint','Checkpoint','Checkpoint','CartogrView','Checkpoint','Checkpoint','Checkpoint','Checkpoint','MapView'],
  '3':['Checkpoint','Checkpoint','Checkpoint','StartView','Checkpoint','LeafletView','Checkpoint','PhotosView','Checkpoint','Checkpoint','Checkpoint','Checkpoint','Checkpoint','StartView','Checkpoint','Checkpoint','Checkpoint','RadarView']
 }*/
 'player':{
  btnBack:30,
  timecodes:{
   '1':[//noAutoClose:true|repeatable:true


    {start:3,repeatable:true,noAutoClose:true,time:-3600,iniTimer:true,data:{interactive:'Map',type:'learn'}},//обучение
    {start:15,invoked:false,noAutoClose:true,data:{interactive:'Start',type:'name'}},//ввод позывного
    //{start:2,repeatable:true,time:-1800,checkpoint:true},
    {start:27,end:29,invoked:false,time:-3600,repeatable:true,text:'Леший затянул с реакцией. Был потерян 1 час.',data:{interactive:'Vibrate',type:'one'}},
    /*{start:6,time:-1800,checkpoint:true},
    {start:7,time:-1800,checkpoint:true},
    {start:8,end:9,invoked:false,time:-3600,repeatable:true,text:'Сашка не ответила на телефон вовремя. Потерян 1 час.',data:{interactive:'Vibrate',type:'two'}},
    {start:10,end:43,invoked:false,time:-1800,repeatable:true,text:'Рюкзак не был собран вовремя. Потеряно 30 минут.',data:{interactive:'Catch'}},
    {start:12,end:13,invoked:false,time:-3600,repeatable:true,text:'Штаб не был вовремя развернут. Потеряно 2 часа.',data:{interactive:'Scheme'}},
    {start:14,text:-3600,checkpoint:true},
    {start:15,end:16,invoked:false,time:-3600,text:'Не был принят начальный план действий. Потерян 1 час.',data:{interactive:'Qs'}},
    {start:17,end:18,invoked:false,repeatable:true,time:-7200,text:'Радиус поиска не был выбран. Потеряно 2 часа.',data:{interactive:'Map',type:'one'}},
    {start:19,invoked:false,delayedPause:-1,noAutoClose:true,data:{interactive:'Start', type:'endRef'}}*/

	   /*{start:445.0,repeatable:true,noAutoClose:true,time:-3600,iniTimer:true,data:{interactive:'Map',type:'learn'}},//обучение
	   {start:448.5,invoked:false,noAutoClose:true,data:{interactive:'Start',type:'name'}},//ввод позывного
	   {start:448.4,repeatable:true,time:-1800,checkpoint:true}, 
	   {start:470.2,end:483.58,repeatable:true,invoked:false,time:-3600,repeatable:true,text:'Леший затянул с реакцией. Был потерян 1 час.',data:{interactive:'Vibrate',type:'one'}},
	   {start:528.36,time:-1800,checkpoint:true},
	   {start:559.52,time:-1800,checkpoint:true},
	   {start:570.36,end:584.26,repeatable:true,invoked:false,time:-3600,repeatable:true,text:'Сашка не ответила на телефон вовремя. Потерян 1 час.',data:{interactive:'Vibrate',type:'two'}},
	   {start:605.72,end:632.36,invoked:false,time:-1800,repeatable:true,text:'Рюкзак не был собран вовремя. Потеряно 30 минут.',data:{interactive:'Catch'}},
	   {start:680.94,end:700.1,invoked:false,time:-3600,repeatable:true,text:'Штаб не был вовремя развернут. Потеряно 2 часа.',data:{interactive:'Scheme'}},
	   {start:756.1,text:-3600,checkpoint:true},
	   {start:838.9,end:865.52,invoked:false,time:-3600,text:'Не был принят начальный план действий. Потерян 1 час.',data:{interactive:'Qs'}},
	   {start:1175.44,end:1205.1,repeatable:true,invoked:false,repeatable:true,time:-7200,text:'Радиус поиска не был выбран. Потеряно 2 часа.',data:{interactive:'Map',type:'one'}},
	   {start:1260,invoked:false,delayedPause:-1,noAutoClose:true,data:{interactive:'Start', type:'endRef'}}*/
	
   ],
   '2':[
    //{start:1,end:2,invoked:false,time:-1,text:'ii',noVidAutoPlay:true,repeatable:true,data:{interactive:'Map',type:'two'}}
    //{start:1,end:2,invoked:false,time:-1,text:'ii',noVidAutoPlay:true,repeatable:true,data:{interactive:'Map',type:'three'}}

    {start:1,checkpoint:true,iniTimer:true},
    //{start:2,time:-1800,checkpoint:true},
    {start:3,end:4,invoked:false,noVidAutoPlay:true,repeatable:true,time:-3600,remText:'Не была выбрана личная вещь мальчика. Потерян 1 час.',data:{interactive:'Map',type:'two'}},
    {start:5,time:-1800,checkpoint:true},
    {start:6,time:-1800,checkpoint:true},
    {start:7,end:8,invoked:false,time:-1,data:{interactive:'Start',type:'one'}},
    {start:9,time:-1800,checkpoint:true},
    {start:10,time:-3600,checkpoint:true},
    {start:11,end:12,noAutoClose:true,invoked:false,time:-10800,text:'Отец ушёл на самостоятельный поиск. Потеряно 3 часа.',data:{interactive:'Vibrate',type:'three'}},
    {start:2,end:14,invoked:false,time:-3600,text:'Потерян 1 час.',data:{interactive:'Forest'}},
    {start:15,time:-1800,checkpoint:true},
    {start:16,time:-3600,checkpoint:true},
    {start:17,time:-900,checkpoint:true},
    {start:18,time:-900,checkpoint:true},
    {start:19,end:20,invoked:false,time:-1,data:{interactive:'Cartogr'}},
    {start:21,time:-23400,checkpoint:true},
    {start:22,time:2,checkpoint:true},
    {start:23,time:-1800,checkpoint:true},
    {start:24,time:-10800,checkpoint:true},
    {start:25,end:26,invoked:false,noVidAutoPlay:true,repeatable:true,time:-1,data:{interactive:'Map',type:'three'}},
    {start:27,invoked:false,delayedPause:-1,noAutoClose:true,data:{interactive:'Start', type:'endRef'}}
    /*{start:1,checkpoint:true,iniTimer:true},
    {start:111.2,time:-1800,checkpoint:true},
    {start:129.14,end:151.8,invoked:false,noVidAutoPlay:true,repeatable:true,time:-3600,remText:'Не была выбрана личная вещь мальчика. Потерян 1 час.',data:{interactive:'Map',type:'two'}},
    {start:248.92,time:-1800,checkpoint:true},
    {start:318.52,time:-1800,checkpoint:true},
    {start:385.1,end:387.12,invoked:false,time:-1,data:{interactive:'Start',type:'one'}},
    {start:438.44,time:-1800,checkpoint:true},
    {start:507.96,time:-3600,checkpoint:true},
    {start:538.14,end:552.72,noAutoClose:true,invoked:false,time:-10800,text:'Отец ушёл на самостоятельный поиск. Потеряно 3 часа.',data:{interactive:'Vibrate',type:'three'}},
    {start:735.58,end:749.4,invoked:false,time:-3600,text:'Потерян 1 час.',data:{interactive:'Forest'}},
    {start:736.52,time:-1800,checkpoint:true},
    {start:871.68,time:-3600,checkpoint:true},
    {start:935.96,time:-900,checkpoint:true},
    {start:959.72,time:-900,checkpoint:true},
    {start:963.1,end:988.52,invoked:false,time:-1,data:{interactive:'Cartogr'}},
    {start:988.32,time:-23400,checkpoint:true},
    {start:1120.24,time:2,checkpoint:true},
    {start:1244.68,time:-1800,checkpoint:true},
    {start:1325,time:-10800,checkpoint:true},
    {start:1349.1,end:1360.7,invoked:false,noVidAutoPlay:true,repeatable:true,time:-1,data:{interactive:'Map',type:'three'}},
	{start:1440,invoked:false,delayedPause:-1,noAutoClose:true,data:{interactive:'Start', type:'endRef'}}*/
   ],
   '3':[
    //{start:1,end:2,time:-60,text:'...',repeatable:true,data:{interactive:'Radar'}}//noAutoClose:true
    {start:1,checkpoint:true,iniTimer:true},
    {start:120.76,time:-600,checkpoint:true},
    {start:149.2,time:-1200,checkpoint:true},
    {start:220.26,end:221.2,invoked:false,repeatable:true,time:-1,data:{interactive:'Start',type:'one'}},
    {start:221.28,time:-3600,checkpoint:true},
    {start:344.86,end:361.48,invoked:false,repeatable:true,time:-1,data:{interactive:'Leaflet'}},
    {start:361.68,time:-1600,checkpoint:true},
    {start:542.9,end:554.28,invoked:false,repeatable:true,time:-3600,text:'Фотографии не были отобраны. Потерян 1 час',data:{interactive:'Photos'}},
    {start:554.28,time:-3600,checkpoint:true},
    {start:625.48,time:-1200,checkpoint:true},
    {start:651.88,time:-1200,checkpoint:true},
    {start:742.84,time:-1200,checkpoint:true},
    {start:915.84,time:3600,checkpoint:true},
    {start:1000.02,end:1031.4,repeatable:true,invoked:false,time:-1,data:{interactive:'Start',type:'two',endGood:1054.6}},
    {start:1063.92,time:-5400,checkpoint:true},
    {start:1594.76,time:-600,checkpoint:true},
    {start:1604.84,time:-3600,checkpoint:true},
    {start:1612.3,end:1627.92,invoked:false,repeatable:true,time:-3600,text:'Тепловизор не был использован. Потерян 1 час.',data:{interactive:'Radar'}},
    {start:1630,invoked:false,delayedPause:-1,noAutoClose:true,data:{interactive:'Start', type:'endRef'}}
    /*{start:1,checkpoint:true,iniTimer:true},
    {start:120.76,time:-600,checkpoint:true},
    {start:149.2,time:-1200,checkpoint:true},
    {start:220.26,end:221.2,invoked:false,repeatable:true,time:-1,data:{interactive:'Start',type:'one'}},
    {start:221.28,time:-3600,checkpoint:true},
    {start:344.86,end:361.48,invoked:false,repeatable:true,time:-1,data:{interactive:'Leaflet'}},
    {start:361.68,time:-1600,checkpoint:true},
    {start:542.9,end:554.28,invoked:false,repeatable:true,time:-3600,text:'Фотографии не были отобраны. Потерян 1 час',data:{interactive:'Photos'}},
    {start:554.28,time:-3600,checkpoint:true},
    {start:625.48,time:-1200,checkpoint:true},
    {start:651.88,time:-1200,checkpoint:true},
    {start:742.84,time:-1200,checkpoint:true},
    {start:915.84,time:3600,checkpoint:true},
    {start:1000.02,end:1031.4,repeatable:true,invoked:false,time:-1,data:{interactive:'Start',type:'two',endGood:1054.6}},
    {start:1063.92,time:-5400,checkpoint:true},
    {start:1594.76,time:-600,checkpoint:true},
    {start:1604.84,time:-3600,checkpoint:true},
    {start:1612.3,end:1627.92,invoked:false,repeatable:true,time:-3600,text:'Тепловизор не был использован. Потерян 1 час.',data:{interactive:'Radar'}},
	{start:1630,invoked:false,delayedPause:-1,noAutoClose:true,data:{interactive:'Start', type:'endRef'}}*/

   ],
   '4':[
    

    //{start:1,end:2,repeatable:true,noVidAutoPlay:true,noAutoClose:true,iniTimer:true,data:{interactive:'Map',type:'four'}}
    //{start:1,end:2,repeatable:true,data:{interactive:'Boat'}}//noAutoClose:true,noVidAutoPlay:true
   //{start:1,end:2,repeatable:true,noAutoClose:true,data:{interactive:'Map',type:'four'}}
//114.62
    {start:1,checkpoint:true,iniTimer:true},
    {start:91.24,checkpoint:true,time:-7200},
    {start:114.62,end:129.42,repeatable:true,noVidAutoPlay:true,noAutoClose:true,iniTimer:true,data:{interactive:'Vibrate',type:'four'}},//кабан
    {start:317.72,checkpoint:true,time:-7200},
    {start:342.68,checkpoint:true,time:-3600},
    {start:420.64,checkpoint:true,time:-3600},
    {start:495.16,checkpoint:true,time:-3600},
    {start:1,end:672.66,time:-10800,repeatable:true,data:{interactive:'Boat'}},//лодка
    {start:673,checkpoint:true,time:-3600},
    {start:729.66,end:730.6,repeatable:true,noVidAutoPlay:true,data:{interactive:'Start',type:'one'}},//актуализация карты
    {start:730.6,checkpoint:true,time:-3600},
    {start:797.9,end:811.32,repeatable:true,time:-3600,data:{interactive:'Photos'}},//выбор фоток
    {start:1077.74,end:1090.94,repeatable:true,time:-3600,noVidAutoPlay:true,noAutoClose:true,iniTimer:true,data:{interactive:'Map',type:'four'}},//поиск по следам
    {start:811.32,checkpoint:true,time:-3600},
    {start:904.8,checkpoint:true,time:-3600},
    {start:1122.1,delayedPause:3,repeatable:true,noAnim:true,data:{interactive:'Vibrate',type:'btn1'}},
    {start:1141.86,delayedPause:3,repeatable:true,noAnim:true,data:{interactive:'Vibrate',type:'btn2'}},
    {start:1145.9,delayedPause:3,repeatable:true,noAnim:true,data:{interactive:'Vibrate',type:'btn3'}},
    {start:1152.3,delayedPause:3,repeatable:true,noAnim:true,data:{interactive:'Vibrate',type:'btn4'}},
    {start:1161.42,delayedPause:3,repeatable:true,noAnim:true,data:{interactive:'Vibrate',type:'btn5'}},
    {start:1470,invoked:false,delayedPause:-1,noAutoClose:true,data:{interactive:'Start', type:'endRef'}}
	/*{start:1,checkpoint:true,iniTimer:true},
	{start:91.24,checkpoint:true,time:-7200},
    {start:114.62,end:129.42,repeatable:true,noVidAutoPlay:true,noAutoClose:true,iniTimer:true,data:{interactive:'Vibrate',type:'four'}},//кабан
	{start:317.72,checkpoint:true,time:-7200},
	{start:342.68,checkpoint:true,time:-3600},
	{start:420.64,checkpoint:true,time:-3600},
	{start:495.16,checkpoint:true,time:-3600},
	{start:1,end:672.66,time:-10800,repeatable:true,data:{interactive:'Boat'}},//лодка
	{start:673,checkpoint:true,time:-3600},
	{start:729.66,end:730.6,repeatable:true,noVidAutoPlay:true,data:{interactive:'Start',type:'one'}},//актуализация карты
	{start:730.6,checkpoint:true,time:-3600},
	{start:797.9,end:811.32,repeatable:true,time:-3600,data:{interactive:'Photos'}},//выбор фоток
	{start:1077.74,end:1090.94,repeatable:true,time:-3600,noVidAutoPlay:true,noAutoClose:true,iniTimer:true,data:{interactive:'Map',type:'four'}},//поиск по следам
	{start:811.32,checkpoint:true,time:-3600},
	{start:904.8,checkpoint:true,time:-3600},
	{start:1122.1,delayedPause:3,repeatable:true,noAnim:true,data:{interactive:'Vibrate',type:'btn1'}},
    {start:1141.86,delayedPause:3,repeatable:true,noAnim:true,data:{interactive:'Vibrate',type:'btn2'}},
    {start:1145.9,delayedPause:3,repeatable:true,noAnim:true,data:{interactive:'Vibrate',type:'btn3'}},
    {start:1152.3,delayedPause:3,repeatable:true,noAnim:true,data:{interactive:'Vibrate',type:'btn4'}},
    {start:1161.42,delayedPause:3,repeatable:true,noAnim:true,data:{interactive:'Vibrate',type:'btn5'}},
	{start:1470,invoked:false,delayedPause:-1,noAutoClose:true,data:{interactive:'Start', type:'endRef'}}*/
	
	

   ]
  },
  redirect:{
   '1':'https://найден-жив.рф/end1.html',
   '2':'https://найден-жив.рф/end2.html',
   '3':'https://найден-жив.рф/end3.html',
   '4':'https://найден-жив.рф/scores.php'
  },
  quality:{
   /*'1':[
    {
     width:'(min-width:2561px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode1/mp4/ng_master_1ser4k.mp4',
     label:'4k'
    },
    {
     width:'(min-width:1441px) and (max-width:2560px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode1/mp4/ng_master_1ser_1080p.mp4',
     label:'1080P'
    },
    {
     width:'(min-width:801px) and (max-width:1440px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode1/mp4/ng_master_1ser_720p.mp4',
     label:'720P'
    },
    {
     width:'(max-width:800px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode1/mp4/ng_master_1ser_480p.mp4',
     label:'480P'
    }
   ],
   '2':[
    {
     width:'(min-width:2561px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/ng_master_2ser_mobdevice_2160p_4k.mp4',
     label:'4k'
    },
    {
     width:'(min-width:1441px) and (max-width:2560px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/ng_master_2ser_mobdevice_1080p.mp4',
     label:'1080P'
    },
    {
     width:'(min-width:801px) and (max-width:1440px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/ng_master_2ser_mobdevice_720p.mp4',
     label:'720P'
    },
    {
     width:'(max-width:800px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/ng_master_2ser_mobdevice_480p.mp4',
     label:'480P'
    }
   ],
   '3':[
    {
     width:'(min-width:2561px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode3/mp4/3_ser_4k.mp4',
     label:'4k'
    },
    {
     width:'(min-width:1441px) and (max-width:2560px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode3/mp4/3_ser_1080p.mp4',
     label:'1080P'
    },
    {
     width:'(min-width:801px) and (max-width:1440px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode3/mp4/3_ser_720p.mp4',
     label:'720P'
    },
    {
     width:'(max-width:800px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode3/mp4/3_ser_480p.mp4',
     label:'480P'
    }
   ],
   '4':[
   {
     width:'(min-width:2561px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode4/mp4/4_ser_4k.mp4',
     label:'4k'
    },
    {
     width:'(min-width:1441px) and (max-width:2560px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode4/mp4/4_ser_1080.mp4',
     label:'1080P'
    },
    {
     width:'(min-width:801px) and (max-width:1440px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode4/mp4/4_ser_720.mp4',
     label:'720P'
    },
    {
     width:'(max-width:800px)',
     src:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode4/mp4/4_ser_480.mp4',
     label:'480P'
    }
   ]*/
   '1':[
    {
     //speed:[4,1000],
     width:'(min-width:1281px)',
     src:'../oceans.mp4',
     label:'720P'
    },
    {
     //speed:[3,4],
     width:'(min-width:801px) and (max-width:1280px)',
     src:'../oceans1.mp4',
     label:'480P'
    },
    {
     //speed:[0,3],
     width:'(max-width:800px)',
     src:'../oceans.mp4',
     label:'360P'
    }
   ],
   '2':[
    {
     //speed:[4,1000],
     width:'(min-width:1281px)',
     src:'../oceans.mp4',
     label:'720P'
    },
    {
     //speed:[3,4],
     width:'(min-width:801px) and (max-width:1280px)',
     src:'../oceans1.mp4',
     label:'480P'
    },
    {
     //speed:[0,3],
     width:'(max-width:800px)',
     src:'../oceans.mp4',
     label:'360P'
    }
   ],
   '3':[
    {
     //speed:[4,1000],
     width:'(min-width:1281px)',
     src:'../oceans.mp4',
     label:'720P'
    },
    {
     //speed:[3,4],
     width:'(min-width:801px) and (max-width:1280px)',
     src:'../oceans1.mp4',
     label:'480P'
    },
    {
     //speed:[0,3],
     width:'(max-width:800px)',
     src:'../oceans.mp4',
     label:'360P'
    }
   ],
   '4':[
    {
     //speed:[4,1000],
     width:'(min-width:1281px)',
     src:'../oceans.mp4',
     label:'720P'
    },
    {
     //speed:[3,4],
     width:'(min-width:801px) and (max-width:1280px)',
     src:'../oceans1.mp4',
     label:'480P'
    },
    {
     //speed:[0,3],
     width:'(max-width:800px)',
     src:'../oceans.mp4',
     label:'360P'
    }
   ]
  }
 },
 interactives:{
  'vibrate':{
   wait:{
    one:30000,
    two:30000,
    three:30000,
    four:300000,
    btn1:6000,
    btn2:6000,
    btn3:6000,
    btn4:6000,
    btn5:6000
   },
   threeErrVideoSrc:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/mp4/bg/2-10-go.mp4',	
   four:{
    errVideoSrc:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode4/mp4/4-02/4ser_variant2_zameret_short.mp4',
    when:1
   }
   //'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/episode2/mp4/bg/2-10-go.mp4'
  },
  map:{
   wait:{
    one:30000,
    two:40000,
    three:40000
   },
   two:{
    showBtnsTime:{when:7},
    hideBtnTime:{when:14}
   },
   fourBtnsData:[{start:1.1,end:3.64,time:-10,text:'',size:5,left:56,top:53},
   {start:6.3,end:8.8,time:-5,text:'',size:10,left:70,top:58},
   {start:26.3,end:28.76,time:-5,text:'',size:10,left:51,top:17},
   {start:29.98,end:32.48,time:-5,text:'',size:10,left:37,top:50}]
  }
 }
 //"index.toggle":{extra:{a:1,$b:[2,'3',{$c:{$d:'#de',f:4}}]}},
};