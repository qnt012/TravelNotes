import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'app',
            component: () => import("./views/Home.vue")
        },
        {
            path: '/note',
            name: 'note',
            component: () => import("./views/Note.vue")
        },
        {
            path: '/browse',
            name: 'browse',
            component: () => import("./views/Browse.vue")
        },
        {
            path: '/login',
            name: 'login',
            component: () => import("./views/Login.vue")
        },
        {
            path: '/roadmap',
            name: 'roadmap',
            component: () => import("./views/RoadMap.vue")
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: () => import("./views/Calendar.vue")
        }
    ]
})