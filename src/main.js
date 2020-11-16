import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCxMyIuupx_YykaEXd6IXUHBeaAzfgXCBE",
  authDomain: "osp20-2017.firebaseapp.com",
  databaseURL: "https://osp20-2017.firebaseio.com",
  projectId: "osp20-2017",
  storageBucket: "osp20-2017.appspot.com",
  messagingSenderId: "129664680143",
  appId: "1:129664680143:web:8fba8fa46d64d0c6b877ba"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

import { store } from './store/store.js'

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
