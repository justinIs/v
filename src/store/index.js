import Vue from "vue";
import Vuex from 'vuex'
import locations from './modules/locations'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    modules: {
        locations
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
