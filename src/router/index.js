import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/esriMap',
    name: 'EsriMap',
    children: [{
      path: 'esriMap',
      name: 'Map',
      component: () => import('@/views/esriMap/index'),
      meta: {
        title: '地图',
        icon: 'example',
        //keepAlive: true
      }
    }]
  },

  {
    path: '/dataManagement',
    component: Layout,
    children: [{
      path: 'dataManagement',
      name: 'DataManagement',
      component: () => import('@/views/dataManagement/index'),
      meta: {
        title: '数据管理',
        icon: 'form',
        //keepAlive: false
      }
    }]
  },

  {
    path: '/pivottable',
    component: Layout,
    redirect: '/pivottable/table',
    name: '统计分析',
    meta: {
      title: '统计分析',
      icon: 'table'
    },
    children: [{
        path: 'table',
        name: '统计分析表',
        component: () => import('@/views/pivottable/table/index'),
        meta: {
          title: '统计分析表',
          icon: 'table',
          //keepAlive: false
        }
      },
      {
        path: 'chart',
        name: '统计分析柱形图',
        component: () => import('@/views/pivottable/chart/index'),
        meta: {
          title: '统计分析柱形图',
          icon: 'table',
          //keepAlive: false
        }
      },
      {
        path: 'pie',
        name: '统计分析饼状图',
        component: () => import('@/views/pivottable/pie/index'),
        meta: {
          title: '统计分析饼状图',
          icon: 'table',
          //keepAlive: false
        }
      }
    ]
  },

  {
    path: '/systemManagement',
    component: Layout,
    redirect: '/systemManagement/systemParameters',
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'tree'
    },
    children: [{
        path: 'systemParameters',
        name: '系统参数',
        component: () => import('@/views/systemManagement/systemParameters/index'),
        meta: {
          title: '系统参数',
          icon: 'tree',
          //keepAlive: false
        }
      },
      {
        path: 'systemUser',
        name: '系统用户',
        component: () => import('@/views/systemManagement/systemUser/index'),
        meta: {
          title: '系统用户',
          icon: 'tree',
          //keepAlive: false
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
