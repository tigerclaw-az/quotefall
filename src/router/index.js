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
		path: '/puzzles/create',
		name: 'new-puzzle',
		component: () =>
			import(
				/* webpackChunkName: "puzzle-create" */ '../views/PuzzleCreate.vue'
			),
	},
	{
		path: '/puzzles/:id',
		name: 'puzzle',
		props: true,
		component: () =>
			import(/* webpackChunkName: "puzzle" */ '../views/Puzzle.vue'),
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
