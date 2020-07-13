export const data={
 wait:2000,
 choose:[{text:'Прозвонить больницы?',yes:true,msg:['Да, надо убедиться, что пропавший туда не поступал.','Bad1']},
  {text:'Отправить людей на разведку?',yes:true,msg:['Да, время дорого, дети уходят далеко.','Bad2']},
  {text:'Искать в тишине?',hidden:true,msg:['Bad3',' Нет, это делается в последнюю очередь. Мысли позитивно.']},
  {text:'Использовать сирену для привлечения ребенка?',hidden:true,msg:['Bad4','Нет, опыт показывает, что это нам ничего не даст.']},
  {text:'Расклеить ориентировки?',yes:true,msg:['Да, ребенка могли видеть даже те, кто там не живёт постоянно.','Bad5']},
  {text:'Проверить колодцы и уличные туалеты?',yes:true,msg:[' Да, мальчик мог провалиться в незакрытый люк.','Bad6']},
  {text:'Проверить заброшенные здания?',yes:true,msg:['Да, детей туда тянет, лучше проверить.','Bad7']}],
 endText:'Работаем!',
 events:{
  'yes':'.next .yes',
  'no':'.next .no'
 },
 view:{
  video:'.ov-video',
  el:'.ov-wrap.qs',
  shownCls:'shown',
  goCls:'go',
  goodCls:'good',
  badCls:'bad',
  msg:'.msg',
  text:'.w-p-text',
  list:'.l-inner',
  liTemplate:'#qs-list-item-template'
 }
};