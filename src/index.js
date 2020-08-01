import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'assets/app.styl'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        locations: []
    },
    getters: {

    },
    mutations: {
        /**
         * @param {object} state
         * @param {Location} location
         */
        addLocation(state, location) {
            state.locations.push(location)
        },
        removeLocation(state, index) {
            state.locations.splice(index, 1)
        }
    },
    actions: {
        /**
         * @param commit
         * @param {Location} location
         */
        addLocation({commit}, location) {
            commit('addLocation', location)
        },
        /**
         * @param commit
         * @param {number} index
         */
        removeLocation({commit}, index) {
            commit('removeLocation', index)
        }
    }
})

/* eslint-disable-next-line no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
