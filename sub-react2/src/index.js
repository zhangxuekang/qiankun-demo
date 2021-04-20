import "./public-path";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import setStore from "./store";

function render(props) {
  const { container } = props
  ReactDOM.render(<App />, container ? container.querySelector('#root') : '#root');
}

if (!window.__POWERED_BY_QIANKUN__) {
  const store = setStore();
  console.log(store.getValue(), "---subreact--mark2021");
  setTimeout(() => {
    console.log(
      "%csubreact修改user的值",
      "color:rgb(21,27,155);background-color:#9c2",
      "---34--mark2021"
    );
    store.setValue("user", "zhangsan-react");
  }, 1000);
  render();
}
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("react app bootstraped");
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log(JSON.parse(JSON.stringify(props)), '---37--mark2021');
  const store = setStore(props);
  console.log(store.getValue(), "---32-react-mark2021");
  console.log(store.getValue("user"), "---32react--mark2021");
  setTimeout(() => {
    console.log(
      "%c子应用修改user的值",
      "color:rgb(21,27,155);background-color:#9c2",
      "---34react--mark2021"
    );
    store.setValue("user", "zhangsanreact");
    console.log(store.getValue(), "---3react5--mark2021");
  }, 1000);
  render(props);
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  const { container } = props
  ReactDOM.unmountComponentAtNode(container.querySelector('#root'));
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log("update props", props);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
