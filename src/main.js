import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import moment from 'moment';

Vue.use(iView)

Vue.config.productionTip = false

Vue.prototype.$moment = moment

new Vue({
  render: h => h(App),
}).$mount('#app')
