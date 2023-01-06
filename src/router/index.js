import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'main',
			component: () => import('../pages/Car.vue'),
		}
		// {
		// 	path: '/',
		// 	name: 'main',
		// 	redirect: '/car',
		// 	component: () => import('../App.vue'),
		// 	children: [
		// 		{
		// 			path: '/car',
		// 			name: 'car',
		// 			component: () => import('../pages/Car.vue'),
		// 		}
		// 	]
		// }
	]
})

export default router
