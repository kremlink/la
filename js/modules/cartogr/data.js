export const data={
 wait:300000,
 grid:[10,6],
 active:[0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1],
 win:{startIndex:11,picsAmount:35,wait:1500},
 seq:[35,14,22,43,24,12,33,25,17,36,28,16,18,26,13,34,42,44,23,27,32,45,11],
 start:['F',5],
 events:{
  'go':'.pulse-btn',
  'gItem':'.g-item'
 },
 view:{
  el:'.ov-wrap.cartogr',
  $grid:'.grid',
  $next:'.next',
  soundBg:'.sounds[data-what=cartogr-bg]',
  okCls:'ok',
  doneCls:'done',
  shownCls:'shown',
  mTmpl:'#cartogr-m-template',
  nextTmpl:'#cartogr-next-template',
  item:{
   tmpl:'#cartogr-item-template',
   activeCls:'active',
   goodCls:'good',
   badCls:'bad'
  }
 }
};