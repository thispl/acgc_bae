import { createRouter, createWebHistory } from 'vue-router'
import DeskView from '@/views/Desk.vue'
import TestView from '@/views/TestView.vue'
import Management from '@/sidebar_tabs/Management.vue'
import Maintenance from '@/sidebar_tabs/Maintenance.vue'
import HR from '@/sidebar_tabs/HR.vue'
import Safety from '@/sidebar_tabs/Safety.vue'
import Warehouse from '@/sidebar_tabs/Warehouse.vue'
import CustomerSLA from '@/sidebar_tabs/CustomerSLA.vue'
import Operations from '@/sidebar_tabs/Operations.vue'

const routes = [
  {
    path: '/test',
    name: 'test',
    component: TestView,
  },
  {
    path: '/',
    component: DeskView,
    children: [
      {
        path: '',
        redirect: 'maintenance'
      },
      {
        path: 'management',
        redirect: 'maintenance'
      },
      {
        path: 'maintenance',
        name: 'maintenance',
        component: Maintenance,
      },
      {
        path: 'hr',
        name: 'hr',
        component: HR,
      },
      {
        path: 'safety',
        name: 'safety',
        component: Safety,
      },
      {
        path: 'warehouse',
        name: 'warehouse',
        component: Warehouse,
      },
      {
        path: 'customer-sla',
        name: 'customer-sla',
        component: CustomerSLA,
      },
      {
        path: 'operations',
        redirect: 'maintenance'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/bae'),
  routes,
})

export default router
