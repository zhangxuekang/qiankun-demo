import { Emitter } from '@tutor/tutor-microfrontend-libs'

export default function setStore (props) {
  let action = null
  let key = ''
  if (!props) {
    // 子应用单独运行
    const communication = new Emitter()
    const propDataA = { app: 'main', user: 'zhangxk' }
    action = communication.propsEmitter('main', propDataA)()
  } else {
    action = props.ation()
    key = props.key
  }
  const { emitter, propData } = action
  setValue('list', [...getValue('list'), key])

  function getValue (key) {
    return key ? propData[key] : propData
  }

  function setValue (key, value) {
    emitter.emit(key, value)
  }

  function listener (key, value) {
    console.log(
      '%csubvue监听到的变化',
      'color:rgb(21,27,155)background-color:#9c2',
      '---27--mark2021'
    )
    console.log(key, value, '---subvue--mark2021')
  }

  for (const key in propData) {
    if (Object.prototype.hasOwnProperty.call(propData, key)) {
      emitter.on(key, (arg) => {
        listener(key, arg)
      })
    }
  }

  return {
    getValue,
    setValue
  }
}
