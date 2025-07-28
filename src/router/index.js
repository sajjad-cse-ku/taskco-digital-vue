import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import BlogPage from '../views/BlogPage.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/blog/:id', component: BlogPage }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
