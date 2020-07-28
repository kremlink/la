export const data={
 preload:{
  'images/':{imgs:['but-bad.png','but-click.png','but-good.png','but-no.png','but-yes.png','first-bg.jpg','map-bg1.png','map-bg2.png','pop_shtorka.png','pulse-btn.png',
   'question-photo.png','start-bg.svg','start-button.svg','start-button-p.svg']},
  'images/packing/':{i:3,j:[12,8,5],tmpl1:'packing-[i]-[j].png',tmpl2:'packing-[i]-[j]-p.png'}
 },
 waitBtn:1500,
 timecodes:[],
 events:{
  'start':'.start-pop div:nth-child(2)',
 },
 view:{
  el:'#wrap',
  loadedCls:'loaded',
  tooSmallCls:'too-small',
  preStartCls:'preStart',
  startCls:'start',
  fsCls:'fs',
  timerCls:'timer',
  pauseCls:'paused'
 },
 minViewport:'(min-width:600px)',
 mobViewport:'(max-width:1023px)'
};