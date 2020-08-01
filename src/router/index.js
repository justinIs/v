import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'pages/Home'
import GoCoords from 'pages/GoCoords'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Home
}, {
    path: '/coords',
    component: GoCoords
}]

export default new VueRouter({
    routes
})
