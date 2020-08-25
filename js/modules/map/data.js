export const data={
 wait:{
  one:30000,
  two:4000
 },
 yesIndex:0,
 showBtnsTime:{when:2,where:2.5},
 hideBtnTime:{when:3.5,where:3.8},
 events:{
  'circleClick':'.circle',
  'btnClick':'.pulse-btn:not(.start)',
  'go':'.pulse-btn.start'
 },
 view:{
  vid:'.ov-video',//not 'video', which is auto-activated
  el:'.ov-wrap.map',
  okCls:'ok',
  doneCls:'done',
  errCls:'err',
  shownCls:'shown',
  showBtnsTimeCls:'show-btns',
  hideBtnTimeCls:'hide-btn'
 }
};