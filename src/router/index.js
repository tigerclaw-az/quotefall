import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/puzzles/archives',
		name: 'archives',
		component: () => import(/* webpackChunkName: "puzzles-archives" */ '../views/puzzles/Archives.vue'),
	},
	{
		path: '/puzzles/create',
		name: 'puzzles-create',
		component: () => import(/* webpackChunkName: "puzzles-create" */ '../views/puzzles/Create.vue'),
	},
	{
		path: '/puzzles/:id',
		name: 'puzzles-id',
		props: true,
		component: () => import(/* webpackChunkName: "puzzles-id" */ '../views/puzzles/Puzzle.vue'),
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
