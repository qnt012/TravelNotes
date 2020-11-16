import Vue from 'vue'
import App from './App.vue'
import naver from 'vue-naver-maps';

Vue.use(naver, {
  clientID: 'da5vvnjqyi',
  useGovAPI: false, //공공 클라우드 API 사용 (선택)
  subModules: '' // 서브모듈 (선택)
});

Vue.config.productionTip = false
import { store } from './store/store.js'

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
