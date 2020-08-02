import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'assets/app.styl'

/* eslint-disable-next-line no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
