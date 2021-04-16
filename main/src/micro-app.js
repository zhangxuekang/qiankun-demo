import store from './store'
import { Emitter } from '@tutor/tutor-microfrontend-libs'

const communication = new Emitter()
const propData = { app: 'main', user: 'zhangxk' }
const ation = communication.propsEmitter('main', propData)
const emitter = communication.getEmitter()
emitter.addListener('user', (value) => {
  console.log('%c主应用监听到user变化', 'color:rgb(21,27,155);background-color:#9c2', '---9--mark2021')
  console.log(propData, '---11--mark2021')
})

setTimeout(() => {
  console.log('%c主应用修改app的值', 'color:rgb(21,27,155);background-color:#9c2', '---14--mark2021')
  emitter.emit('app', 'main~')
}, 5000)

const microApps = [
  {
    name: 'sub-vue',
    entry: process.env.VUE_APP_SUB_VUE,
    activeRule: '/sub-vue'
  },
  {
    name: 'sub-react',
    entry: process.env.VUE_APP_SUB_REACT,
    activeRule: '/sub-react'
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState, // 下发getGlobalState方法
      ation
    }
  }
})

export default apps
