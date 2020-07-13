export const data={
 waitLoad:5000,
 timecodes:[
  {time:1,invoked:false},
  {time:2,invoked:false,vibrate:'one'},
  {time:3,invoked:false,vibrate:'two'},
  {time:4,invoked:false},
  {time:5,invoked:false},
  {time:6,invoked:false},
  {time:7,invoked:false}
  ],
 events:{
  'start':'.start-pop div',
 },
 view:{
  el:'#wrap',
  loadedCls:'loaded',
  tooSmallCls:'too-small',
  startCls:'start',
  fsCls:'fs',
  timerCls:'timer'
 },
 minViewport:'(min-width:600px)',
 mobViewport:'(max-width:1023px)'
};