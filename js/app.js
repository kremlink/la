import {app} from './bf/base.js';

import * as index from './modules/index/view.js';

import {utils} from './bf/lib/utils.js';
//import {Toggle} from './bf/lib/toggle.js';
//------------------------
const dataApp=app.get('helpers.html').data('app'),
      modules=dataApp.modules;
//------------------------
app.init({
 //plugins:[Toggle],
 plugins:[{object:utils,name:'utils'}],
 settings:{}
});

app.set({dest:'objects.aggregator',object:_.extend({},Backbone.Events)});
app.set({dest:'objects.isMobile',object:matchMedia(index.data.mobViewport).matches});
app.set({dest:'objects.epIndex',object:dataApp.index});

app.set({dest:'objects._dev',object:true});//TODO:remove
//app.set({dest:'objects.isPomoi',object:/iPad|iPhone|iPod/.test(navigator.platform)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)});
//------------------------
$(()=>{
 index.init(app,modules);
});