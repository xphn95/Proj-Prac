import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { GlobalStyle } from "./style"
import { IconStyle } from "./static/iconfont/iconfont"

ReactDOM.render(
  <>
    {/* GlobalStyle 只是设置样式不要认为它是 body */}
    {/* 所以其他组件没必要被他包裹 */}
    <GlobalStyle />
    <IconStyle />
    <App />
  </>,
  document.getElementById("root")
)
