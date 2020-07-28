export const data={
 wait:30000,
 twoMoveBtnTime:{when:6,where:6.4},
 events:{
  'click':'.w-p-outer,.pulse-btn',
 },
 view:{
  video:'.ov-video',
  el:{
   one:'.ov-wrap.vibrate.v1',
   two:'.ov-wrap.vibrate.v2'
  },
  soundBg:{
   one:'.sounds[data-what=v1-bg]',
   two:'.sounds[data-what=v2-bg]'
  },
  shownCls:'shown',
  twoMoveBtnCls:'shifted'
 },
 button:{
  spread:100,
  timerDivider:39,
  wobbleDuration:{spread:1.5,shift:0.5},
  wobble:'.w-p-wrap',
  pText:'.w-p-p-text',
  pDiv:'.w-p-p div'
 }
};