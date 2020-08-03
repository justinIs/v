import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'pages/Home'
import GoCoords from 'pages/GoCoords'
import LiveStream from 'pages/LiveStream';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Home
}, {
    path: '/coords',
    component: GoCoords
}, {
    path: '/livestream',
    component: LiveStream
}]

export default new VueRouter({
    routes
})
