export const data={
 wait:3000000,
 winWait:1500,
 game:{
  width:31.88,
  height:29.8
 },
 grid:{
  size:8,
  shiftX:0.1,
  shiftY:2.28
 },
 radarSize:3,
 cells:[1,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,0,1,1,1,1,1,1,1,0,1,0,0,0,1,1,0,0,1,0,2,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
 events:{
  'go':'.pulse-btn',
  'moveL':'.left',
  'moveR':'.right',
  'moveT':'.top',
  'moveB':'.bottom'
 },
 view:{
  video:'.ov-video',
  el:'.ov-wrap.boat',
  game:'.game',
  grid:'.grid',
  radar:'.radar',
  doneCls:'done',
  shownCls:'shown',
  okCls:'ok',
  posCls:{l:'l',u:'u',r:'r'}
 }
};