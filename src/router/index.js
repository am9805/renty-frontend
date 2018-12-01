import Vue from 'vue'
import Router from 'vue-router'

import Login from './../components/Login.vue'
import Home from './../components/Home.vue'
import Profile from '../components/Profile.vue'
import auth from "../services/auth";




Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/home'
        },
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            redirect: '/home'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                guestOnly: true
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                requireAuth: true
            }
        },
        
    ]
});

export default router

router.beforeEach((to, from, next) => {
    let currentUser = auth.user();
    let requireAuth = to.matched.some(record => record.meta.requireAuth);
    let guestOnly = to.matched.some(record => record.meta.guestOnly);

    if (requireAuth && !currentUser) {
        next('login');
    } else if (guestOnly && currentUser) {
        next('profile');
    } else {
        next()
    }
});