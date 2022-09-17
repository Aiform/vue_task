import { createRouter, createWebHistory } from "vue-router";
import Home from '../view/home'
import Login from '../view/login'
import Registered from '../view/registered'
import Homepagedata from '../view/Homepagedata'
import Native from '../view/native'
import Nonlocal from '../view/nonlocal'
import protect from '../view/protect'
import isolatepersonnel from '../view/isolatepersonnel'
import Information from '../view/nonlocal/information'
import localinfordata from '../view/native/localinfordata'
import newprotectivepersonnel from '../view/protect/newprotectivepersonnel'
import newisolationpersonnel from '../view/isolatepersonnel/newisolationpersonnel'
import newlyaddedoverseas from '../view/nonlocal/newlyaddedoverseas'
import epidemicriskranking from '../view/epidemicriskranking'
import newaddress from '../view/epidemicriskranking/newaddress'
import epidemicsituationinquiry from '../view/epidemicsituationinquiry'
import distributionofepidemicareas from '../view/distributionofepidemicareas'
import epidemictrendanalysis from '../view/epidemictrendanalysis'
const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/home",
      name: 'home',
      redirect: "/homepagedata",
      component: Home,
      children: [
        {
          path: '/homepagedata',
          name: 'homepagedata',
          component: Homepagedata,
          meta: {
            title: '疫情数据'
          },
        },
        {
          path: '/native',
          name: 'native',
          component: Native,
          meta: {
            title: '本地人员信息管理'
          },
        },
        {
          path: '/nonlocal',
          name: 'nonlocal',
          component: Nonlocal,
          meta: {
            title: '外地人员信息管理'
          },

        },
        {
          path: '/information',
          name: 'information',
          component: Information,
          meta: {
            title: "添加国内人员信息"
          }
        },
        {
          path: '/localinfordata',
          name: 'localinfordata',
          component: localinfordata,
          meta: {
            title: '添加本地人员信息'
          },
        },

        {
          path: '/protect',
          name: 'protect',
          component: protect,
          meta: {
            title: '防护人员信息管理'
          },
        },
        {
          path: '/newprotectivepersonnel',
          name: 'newprotectivepersonnel',
          component: newprotectivepersonnel,
          meta: {
            title: "添加境外人员信息"
          }
        },
        {
          path: '/isolatepersonnel',
          name: 'isolatepersonnel',
          component: isolatepersonnel,
          meta: {
            title: '隔离人员信息管理'
          },
        },
        {
          path: "/newisolationpersonnel",
          name: "newisolationpersonnel",
          component: newisolationpersonnel,
          meta: {
            title: "添加防护人员信息"
          }
        },
        {

          path: "/newlyaddedoverseas",
          name: "newlyaddedoverseas",
          component: newlyaddedoverseas,
          meta: {
            title: "添加隔离人员信息"
          }

        },
        {

          path: "/epidemicriskranking",
          name: "epidemicriskranking",
          component: epidemicriskranking,
          meta: {
            title: "疫情数据排行"
          }
        },
        {

          path: "/newaddress",
          name: "newaddress",
          component: newaddress,
          meta: {
            title: "新增地区"
          }
        },
        {

          path: "/epidemicsituationinquiry",
          name: "epidemicsituationinquiry",
          component: epidemicsituationinquiry,
          meta: {
            title: "疫情信息查询"
          }
        },
        {

          path: "/distributionofepidemicareas",
          name: "distributionofepidemicareas",
          component: distributionofepidemicareas,
          meta: {
            title: "疫情区域分布"
          }
        },
        {

          path: "/epidemictrendanalysis",
          name: "epidemictrendanalysis",
          component: epidemictrendanalysis,
          meta: {
            title: "疫情趋势分析"
          }
        },
       
      ]
    },
    {
      path: "/login",
      name: 'login',
      component: Login
    },
    {
      path: "/registered",
      name: 'registered',
      component: Registered
    }
  ],
})
// 本都有token 的时候自动跳转
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('TOKEN')
  if (token) {
    if (to.path == '/login') {
      next('/home')
    } else {
      next()
    }
  } else {
    next()
  }
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('TOKEN')//存储token
  if (!token && to.fullPath != '/login' && to.fullPath != '/registered') {
    next('/login')
  } else {
    next()
  }

});
export default router