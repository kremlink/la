export const data={
 wait:{
  one:0,
  two:0,
  three:0
 },
 yesIndex:0,
 two:{
  showBtnsTime:{when:0},
  hideBtnTime:{when:0}
 },
 fourBtnsData:[],
 events:{
  'circleClick':'.circle',
  'chooseClick':'.pulse-btn:not(.start)',
  'go':'.pulse-btn.start'
 },
 view:{
  video:'.ov-video',
  el:{
   one:'.ov-wrap.map',
   two:'.ov-wrap.map.v2',
   three:'.ov-wrap.map.v3',
   four:'.ov-wrap.map.v4',
   learn:'.ov-wrap.map.learn'
  },
  soundBg:{
   two:'.sounds[data-what=map_v2-bg]',
   three:'.sounds[data-what=map_v3-bg]',
   four:'.sounds[data-what=map-v4-bg]'
  },
  learn:'.w-p-t-ov div',
  fourTemplate:'#map-four-item-template',
  okCls:'ok',
  doneCls:'done',
  errCls:'err',
  shownCls:'shown',
  showBtnsTimeCls:'show-btns',
  hideBtnTimeCls:'hide-btn'
 }
};