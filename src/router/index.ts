import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from './../utils/cache'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/main'
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('./../views/login/login.vue')
	},
	{
		path: '/main',
		name: 'main',
		component: () => import('./../views/main/main.vue'),
		children: [
			{
				path: '/:pathMatch(.*)*',
				name: 'not-found',
				component: () => import('@/views/not-found/not-found.vue')
			}
		]
	}
]

const router = createRouter({
	routes,
	history: createWebHistory()
})

router.beforeEach((to) => {
	const firstMenu = localCache.getCache('firstMenu')
	if (to.path !== '/login') {
		const token = localCache.getCache('token')
		if (!token) {
			return '/login'
		}
	}
	if (to.path === '/main') {
		return firstMenu.path
	}
})

export default router
