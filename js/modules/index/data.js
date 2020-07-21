export const data={
 waitLoad:5000,
 timecodes:[
  {start:1,end:1,invoked:false,vibrate:'two',rem:-30,remText:'Минус полминуты'},
  /*{start:1,end:2,invoked:false,rem:-40,remText:'Минус 40 секунд'},
  {start:3,end:4,invoked:false,vibrate:'one',rem:-30,remText:'Минус полминуты'},
  {start:5,end:6,invoked:false,vibrate:'two',rem:-30,remText:'Минус полминуты'},
  {start:7,end:8,invoked:false,rem:-60,remText:'Минус 2 минуты'},
  {start:9,end:10,invoked:false,rem:-30,remText:'Минус полминуты'},
  {start:11,end:12,invoked:false,rem:-180,remText:'Минус 3 минуты'},
  {start:13,end:14,invoked:false,rem:-300,remText:'Минус 5 минут'}*/

  /*{start:426.94,end:457,invoked:false,rem:-40,remText:'Минус 40 секунд'},
  {start:480.94,end:491.24,invoked:false,vibrate:'one',rem:-30,remText:'Минус полминуты'},
  {start:581.86,end:592.36,invoked:false,vibrate:'two',rem:-30,remText:'Минус полминуты'},
  {start:867.54,end:890.76,invoked:false,rem:-60,remText:'Минус 2 минуты'},
  {start:1203.22,end:1215.52,invoked:false,rem:-30,remText:'Минус полминуты'},
  {start:726.3,end:782.8,invoked:false,rem:-180,remText:'Минус 3 минуты'},
  {start:625.7,end:655.2,invoked:false,rem:-300,remText:'Минус 5 минут'}*/
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