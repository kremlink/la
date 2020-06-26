import {app} from './bf/base.js';

import * as index from './modules/index/view.js';

//import {Toggle} from './bf/lib/toggle.js';
//------------------------
const modules=app.get('helpers.html').data('app').split(',');
//------------------------
app.init({
 //plugins:[Toggle],
 plugins:[],
 settings:{}
});

app.set({dest:'objects.aggregator',object:_.extend({},Backbone.Events)});
app.set({dest:'objects.isMobile',object:matchMedia(index.data.mobViewport).matches});
//------------------------
$(()=>{
 index.init(app,modules);
});