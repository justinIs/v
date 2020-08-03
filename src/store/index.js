import Vue from "vue";
import Vuex from 'vuex'
import locations from './modules/locations'
import liveStream from './modules/liveStream'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    modules: {
        locations,
        liveStream
    },
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    }
})
