export const data={
 wait:2000,
 choose:[{text:'Aaaa',yes:true,msg:['Good1','Bad1']},{text:'Bbbb',yes:true,msg:['Good2','Bad2']},{text:'Cccc',hidden:true,msg:['Bad3','Good3']},
  {text:'Dddd',hidden:true,msg:['Bad4','Good4']},{text:'Eeee',yes:true,msg:['Good5','Bad5']},{text:'Ffff',yes:true,msg:['Good6','Bad6']},
  {text:'Gggg',yes:true,msg:['Good7','Bad7']}],
 endText:'Работаем',
 events:{
  'yes':'.next-block .yes',
  'no':'.next-block .no'
 },
 view:{
  el:'.ov-wrap.qs',
  shownCls:'shown',
  goCls:'go',
  goodCls:'good',
  badCls:'bad',
  msg:'.next-msg',
  text:'.w-p-text',
  list:'.n-l-inner',
  liTemplate:'#next-list-item-template'
 }
};