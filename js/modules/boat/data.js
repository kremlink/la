export const data={
 wait:3000000,
 winWait:500,
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
  soundBg:'.sounds[data-what=boat-bg]',
  game:'.game',
  grid:'.grid',
  radar:'.radar',
  anim:'.anim',
  doneCls:'done',
  shownCls:'shown',
  okCls:'ok',
  posCls:{l:'l',u:'u',r:'r'}
 },
 lottie:{"v":"5.7.3","fr":60,"ip":0,"op":600,"w":1093,"h":1093,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"3-21-aim-rot-out Outlines 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1.069]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[0]},{"i":{"x":[0.667],"y":[0.01]},"o":{"x":[0.333],"y":[0.336]},"t":139,"s":[189.129]},{"i":{"x":[0.667],"y":[3.985]},"o":{"x":[0.333],"y":[1.367]},"t":282,"s":[149.342]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0.14]},"t":458,"s":[113.902]},{"t":599,"s":[720]}],"ix":10},"p":{"a":0,"k":[546.5,546.5,0],"ix":2},"a":{"a":0,"k":[546.5,546.5,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-0.794,189.066],[0,0],[0,0],[0,0],[0,0],[191.919,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,191.918],[0,0],[0,0],[0,0],[0,0],[189.071,-0.796]],"v":[[890.951,547.955],[880.725,547.955],[880.725,544.955],[892.455,544.955],[893.955,546.455],[546.455,893.955],[544.955,893.955],[544.955,880.724],[547.955,880.724],[547.955,890.951]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0.794,-189.066],[0,0],[0,0],[0,0],[0,0],[-191.918,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,-191.918],[0,0],[0,0],[0,0],[0,0],[-189.07,0.796]],"v":[[201.959,544.955],[212.186,544.955],[212.186,547.955],[200.455,547.955],[198.955,546.455],[546.455,198.955],[547.955,198.955],[547.955,212.186],[544.955,212.186],[544.955,201.959]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0.898039221764,0.72549021244,0.615686297417,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":301,"s":[0.874509811401,0.537254929543,0.596078455448,1]},{"t":599,"s":[0.898039221764,0.72549021244,0.615686297417,1]}],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false}],"ip":0,"op":600,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"3-21-aim-rot-in Outlines 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[0.969]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[130]},{"i":{"x":[0.667],"y":[-2.792]},"o":{"x":[0.333],"y":[-0.533]},"t":139,"s":[361.927]},{"i":{"x":[0.667],"y":[0.805]},"o":{"x":[0.333],"y":[0.236]},"t":282,"s":[348.26]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0.138]},"t":458,"s":[77.549]},{"t":599,"s":[-230]}],"ix":10},"p":{"a":0,"k":[546.5,546.5,0],"ix":2},"a":{"a":0,"k":[546.5,546.5,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-0.798,205.64],[0,0],[0,0],[0,0],[0,0],[208.491,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,208.49],[0,0],[0,0],[0,0],[0,0],[205.644,-0.8]],"v":[[920.958,547.955],[892.951,547.955],[892.951,544.955],[922.461,544.955],[923.961,546.455],[546.455,923.961],[544.955,923.961],[544.955,892.951],[547.955,892.951],[547.955,920.958]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0.798,-205.64],[0,0],[0,0],[0,0],[0,0],[-208.49,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,-208.49],[0,0],[0,0],[0,0],[0,0],[-205.643,0.8]],"v":[[171.953,544.955],[199.959,544.955],[199.959,547.955],[170.45,547.955],[168.95,546.455],[546.455,168.949],[547.955,168.949],[547.955,199.959],[544.955,199.959],[544.955,171.952]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0.874509811401,0.537254929543,0.596078455448,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":300,"s":[0.898039221764,0.72549021244,0.615686297417,1]},{"t":599,"s":[0.874509811401,0.537254929543,0.596078455448,1]}],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false}],"ip":0,"op":600,"st":0,"bm":0}],"markers":[]}
};