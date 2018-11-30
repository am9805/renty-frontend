import Vue from 'vue'
import App from './App.vue'
import router from './router'
import auth from './services/auth'
import {store} from './store/index.js'

Vue.config.productionTip = false;


new Vue({
    router,
    store,
    beforeCreate () {
        auth.init(this)
    },
    render: h => h(App)
}).$mount('#app');