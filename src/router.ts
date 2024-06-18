import { createWebHistory } from 'vue-router'
import IndexView from './views/index-view.vue'

export const routerConfig = {
	history: createWebHistory(),
	routes: [
		{
			name: 'Опрос',
			path: '/:pollId?',
			component: IndexView,
		},
	],
}
