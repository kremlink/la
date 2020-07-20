export const data={
 waitLoad:5000,
 timecodes:[
  {start:1,end:1,invoked:false,vibrate:'two',rem:30,remText:'Минус полминуты'},
  /*{start:1,end:2,invoked:false},
  {start:3,end:4,invoked:false,vibrate:'one'},
  {start:5,end:6,invoked:false,vibrate:'two'},
  {start:7,end:8,invoked:false},
  {start:9,end:10,invoked:false},
  {start:11,end:12,invoked:false},
  {start:13,end:14,invoked:false}*/

  /*{start:426.94,end:457,invoked:false},
  {start:480.94,end:491.24,invoked:false,vibrate:'one'},
  {start:581.86,end:592.36,invoked:false,vibrate:'two'},
  {start:867.54,end:890.76,invoked:false},
  {start:1203.22,end:1215.52,invoked:false},
  {start:726.3,end:782.8,invoked:false},
  {start:625.7,end:655.2,invoked:false}*/
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