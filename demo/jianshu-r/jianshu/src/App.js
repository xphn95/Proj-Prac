import React, { Component } from "react"
import { Provider } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom"
import Header from "./common/header"
import store from "./store"
import { Detail, Home } from "./pages"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <BrowserRouter>
          {/* 根路径会显示home和detail, 因为2个路径都包含'/', 添加 exact 就是完全相等的匹配, 可以解决这种问题 */}
          {/* BrowserRouter代表路由, Route代表路由规则 */}
          {/* <Route path="/" exact render={() => <div>home</div>}></Route>
          <Route path="/detail" exact render={() => <div>detail</div>}></Route> */}
          <Route path="/" exact component={Home.default}></Route>
          <Route path="/detail" exact component={Detail.default}></Route>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
