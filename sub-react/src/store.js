import { Emitter } from "@tutor/tutor-microfrontend-libs";

export default function setStore(props) {
  let action = null;
  if (!props) {
    // 子应用单独运行
    const communication = new Emitter();
    const propDataA = { app: "main", user: "zhangxkreact" };
    action = communication.propsEmitter("main", propDataA)();
  } else {
    action = props.ation();
  }
  const { emitter, propData } = action;

  function getValue(key) {
    return key ? propData[key] : propData;
  }

  function setValue(key, value) {
    emitter.emit(key, value);
  }

  function listener(key, value) {
    console.log(
      "%csubreact监听到的变化",
      "color:rgb(21,27,155);background-color:#9c2",
      "---14react--mark2021"
    );
    console.log(key, value, "---subreact--mark2021");
  }

  for (let key in propData) {
    if (propData.hasOwnProperty(key)) {
      emitter.on(key, (arg) => {
        listener(key, arg);
      });
    }
  }

  return {
    getValue,
    setValue,
  };
}
