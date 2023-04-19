import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import BaiduMap from 'vue-baidu-map-3x';

createApp(App).use(store).use(router).use(ViewUIPlus).use(BaiduMap, {
    ak: '2OC0xV0xXFZ2P9DhOn26V8tQu7qyw24i'
}).mount('#app')
