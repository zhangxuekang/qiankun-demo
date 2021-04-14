import { registerMicroApps, start } from "qiankun";

registerMicroApps([
  {
    // 子应用唯一名称
    name: "vue",
    // 子应用入口
    entry: "//localhost:7777",
    // 子应用挂载的元素
    container: "#container",
    // 子应用匹配路径
    activeRule: "/vue",
  },
  {
    // 子应用唯一名称
    name: "react",
    // 子应用入口
    entry: "//localhost:7788",
    // 子应用挂载的元素
    container: "#container",
    // 子应用匹配路径
    activeRule: "/react",
  },
  {
    // 子应用唯一名称
    name: "ng",
    // 子应用入口
    entry: "//localhost:8899",
    // 子应用挂载的元素
    container: "#container",
    // 子应用匹配路径
    activeRule: "/ng",
  },
]);

// 启动 qiankun
start();
