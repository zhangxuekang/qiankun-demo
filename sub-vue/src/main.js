/* eslint-disable */
import './public-path'
import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import { store as commonStore } from 'common'
import store from './store'
import VueRouter from 'vue-router'
import setStore from './store'

Vue.config.productionTip = false
let instance = null

function render(props = {}) {
  const { container, routerBase } = props
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: 'history',
    routes
  })

  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  const store = setStore()
  console.log(store.getValue(), '---32vue--mark2021')
  console.log(store.getValue('user'), '---32vue--mark2021')
  setTimeout(() => {
    console.log(
      '%c子应用vue修改user的值',
      'color:rgb(21,27,155)background-color:#9c2',
      '---34vue--mark2021'
    )
    store.setValue('user', 'zhangsanvue')
    console.log(store.getValue(), '---35vue--mark2021')
  }, 1000)

  render()
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
  const store = setStore(props)
  console.log(store.getValue(), '---subvue--mark2021')
  setTimeout(() => {
    console.log(
      '%csubvue修改user的值',
      'color:rgb(21,27,155)background-color:#9c2',
      '---34--mark2021'
    )
    store.setValue('user', 'zhangsan-vue')
  }, 1000)

  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
