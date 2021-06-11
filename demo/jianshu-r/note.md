## 创建项目

### 1. 生成项目文件

```shell
npx create-react-app jianshu
```



### 2. 为解决 css 会对全局生效, 使用 styled-components 插件

```shell
yarn add styled-components
```

安装完成之后, css 文件就写成 js 文件了.

先写一个全局的样式来清除不同的浏览器的默认值使项目在任何浏览器都是统一的样式.



```js
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	// 在网上搜索 reset.css 样式粘贴在这里
	html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`

```

注意 index.js 中不要给 GlobalStyle 组件里面放组件, 可以认为就单独设置这个组件来设置全局样式



```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { GlobalStyle } from './style.js'

ReactDOM.render(
  <React.StrictMode>
    {/* GlobalStyle 只是设置样式不要认为它是 body */}
    {/* 所以其他组件没必要被他包裹 */}
    <GlobalStyle/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```

### 3. 编写导航栏

1. 使用 styled-components 编写带样式的元素作为一个一个的小组件

2. 页面中的图标使用 iconfont 的图标

> iconfont 在 styled-components 中的使用方法:
>
> - 把字体文件和 css 文件都放到项目的 static 文件夹下, 把 css 文件用 styled-components 改写成 js 文件.(注意现在样式是 js 写的, 里面关于路径的使用都是字符串而已, 要注意用 es6 导入的方式引入, 通过模板字符串插入变量的方式插入, 而且字符的编码什么的也要注意转义.)

3. 引入 react-transition-group 实现搜索框的动画效果.
4. 引入 redux 和 react-redux 来管理状态.

```js
import React from "react"
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { getSearchFocusStateAction } from '../../store/actionCreators'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  SearchWrapper,
  NavSearch,
  Addition,
  Button,
} from "./style"

const Header = (props) => {
  const { focused, handleFocus, handleBlur } = props
  return (
    <HeaderWrapper>
      <Logo href="/" />
      <Nav>
        <NavItem className="left active">首页</NavItem>
        <NavItem className="left">下载App</NavItem>
        <NavItem className="right">登录</NavItem>
        <NavItem className="right">
          <i
            className="iconfont"
            style={{ fontWeight: 500, fontSize: "20px" }}
          >
            &#xe636;
          </i>
        </NavItem>
        <CSSTransition timeout={200} in={focused} classNames={'slide'}>
          <SearchWrapper className={focused ? 'focused' : ''} onFocus={handleFocus} onBlur={handleBlur}>
            <NavSearch placeholder="搜索" />
            <i className="iconfont">&#xe662;</i>
          </SearchWrapper>
        </CSSTransition>
      </Nav>
      <Addition>
        <Button>
          <i className="iconfont">&#xe6eb;</i>
          &nbsp;写文章
        </Button>
        <Button>注册</Button>
      </Addition>
    </HeaderWrapper>
  )
}

const mapStateToProps = (store) => {
  return {
    focused: store.focused
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFocus() {
      const action = getSearchFocusStateAction(true)
      dispatch(action)
    },
    handleBlur() {
      const action = getSearchFocusStateAction(false)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

```

5. 拆分 reducer

可以在各自组件的文件夹下创建 store 里面写组件自己使用的 reducer/actionCreator/actionTypes , 全局的 reducer 通过 redux 的 combineReducer 函数把小的 reducer 收集起来.

```js
import { combineReducers } from 'redux'
import headerReducer from '../common/header/store/reducer'

export default combineReducers({
  header: headerReducer
})
```

### 4. 使用 immutable.js 管理 store 中的数据

#### 4.1 安装 immutable

```shell
yarn add immutable
```

#### 4.2 修改分 reducer 用这个库来管理状态

```js
import { fromJS } from 'immutable'
import { SAVE_SEARCH_FOCUS_STATE } from './actionTypes'

const defaultState = fromJS({
  focused: false
})

export const reducer = (state = defaultState, action) => {
  if (action.type === SAVE_SEARCH_FOCUS_STATE) {
    /* const newState = JSON.parse(JSON.stringify(state))
    newState.focused = action.value
    return newState */
    // state 现在是 immutable 对象, 要用 immutable 的方式设置新的状态
    // 注意: 并没有违背不修改的原则, immutable 的 set 方法不是修改而是提供把原来的状态和新的状态结合成全新的状态
    return state.set('focused', action.value)
  }
  return state
}

```

#### 4.3 改变组件获取 store 数据的方式

```js
const mapStateToProps = (store) => {
  return {
    // 使用了 immutable 就要用 immutable对象的方式访问属性
    // focused: header.focused // 之前这种就不要了
    focused: store.header.get('focused') // 要用 get 方法读取
  }
}
```

现在只有分 reducer 是使用 immutable 使 state 成为不可改变的, 这样不协调, store 是普通对象, store.header 是 immutable 对象.

#### 4.4 使用 redux-immutable 使 store 的数据也是不可修改的对象

##### 4.4.1 安装

```shell
yarn add redux-immutable
```

##### 使用

```js
import { combineReducers } from 'redux-immutable'
import { reducer as headerReducer } from '../common/header/store'

// redux-immutable 提供了同名的 combineReducer
// 这样总的 reducer 记录的数据也是不可修改的了
export default combineReducers({
  header: headerReducer
})

```

##### 4.4.2 组件读取 store 的数据也要修改

```js
const mapStateToProps = (store) => {
  return {
    // 使用了 immutable 就要用 immutable对象的方式访问属性
    // focused: header.focused // 之前这种就不要了
    // focused: header.get('focused') // 要用 get 方法读取
    // 使用了 redux-immutable 使 store 中的数据也是不可修改的
    focused: store.getIn(['header', 'focused'])
  }
}
```

### 5. 编写 SearchInfo 的内容

这个没有什么记录的, 就是一些 css 样式, 就是控制这块的显示用一个函数来实现

```js
const getSearchInfo = (show) => {
  if (show) {
    return (
      <SearchInfo>
        <SearchInfoTitle>
          热门搜索
          <SearchInfoChange>换一批</SearchInfoChange>
        </SearchInfoTitle>
        <div>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
          <SearchInfoItem>教育</SearchInfoItem>
        </div>
      </SearchInfo>
    )
  }
  return null
}
```

### 6. 聚焦搜索框异步请求 SearchInfo 中的数据

#### 6.1 安装 axios 和 redux-thunk 

#### 6.1.1 模拟数据

在项目文件的 public 下创建 api/headerList.json 里面可以写模拟的请求数据.



```js
axios
  .get("/api/headerList.json")  // localhost:3000/api/headerList.json
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
```

#### 6.1.2 编写步骤

1. 组件触发的 action 方法, 返回的不是一个对象是一个函数, 那么就需要用到 redux-thunk.
2. 请求到的 data 是我们要的 list , 是一个普通的数组, 而初始的 store 中的 list 是一个空数组但是是不可修改对象, 在更新 store 中的 list 时肯定要传入请求到的 list , 这样我们就破坏了 store 中的数据是不可修改对象, 所以需要用 immutable 库的 fromJS 把这个普通的数组转化成不可修改对象.

### 7. 代码优化

reducer 中使用了太多的 if else 语句, 用 switch 更加优雅.



### 8. SearchInfo 分页显示

在 store(reducer) 中添加 page(当前页) 和 totalPage(总页数) 的存储.

请求过来数据更新 store 中的 list, page, totalPage . 

组件中根据页数渲染一部分 list .

```js
const getSearchInfo = (show, list, page) => {
  // 用一个空数组存放待渲染的 list
  const newList = []
  // 把immutable对象转化为普通数组(为了循环体中用下标访问)
  const jsList = list.toJS()
  // console.log(jsList) // []
  // 这里初始渲染会运行一次, 此时 list 是空数组, 因为请求数据是异步的, list 还没获取到数据
  // 加个判断避免无效的循环
  if (jsList.length) {
    for (let i = (page - 1) * 10; i < page * 10; i++) {
      newList.push(<SearchInfoItem key={jsList[i]}>{jsList[i]}</SearchInfoItem>)
    }
  }
  if (show) {
    return (
      <SearchInfo>
        <SearchInfoTitle>
          热门搜索
          <SearchInfoChange>换一批</SearchInfoChange>
        </SearchInfoTitle>
        <div>{newList}</div>
      </SearchInfo>
    )
  }
  return null
}
```

### 9. 处理点击 SearchInfo 框时满足 input 框失焦导致 SearchInfo 消失的问题

之前 SearchInfo 是通过 input 框是否获得焦点决定, 现在鼠标在 SearchInfo 上就不消失移开就消失, 所以要在 store 中添加 mouseIn 字段, 创建修改这个字段的对应的方法, 这个方法分别通过组件的 mouseEnter 和 mouseLeave 触发.

```js
const getSearchInfo = (
  show,
  showInfo,
  list,
  page,
  handleMouseEnter,
  handleMouseLeave,
  handleChangeTag
) => {
  // 用一个空数组存放待渲染的 list
  const newList = []
  // 把immutable对象转化为普通数组(为了循环体中用下标访问)
  const jsList = list.toJS()
  // console.log(jsList) // []
  // 这里好像初始化会运行一次, 此时 jsList 是空数组
  // 加个判断避免无效的循环
  if (jsList.length) {
    for (let i = (page - 1) * 10; i < page * 10; i++) {
      newList.push(<SearchInfoItem key={jsList[i]}>{jsList[i]}</SearchInfoItem>)
    }
  }
  // input 框聚焦和鼠标停在 SearchInfo 上都可以
  if (show || showInfo) {
    return (
      <SearchInfo
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
      >
        <SearchInfoTitle>
          热门搜索
          <SearchInfoChange onClick={() => handleChangeTag()}>
            换一批
          </SearchInfoChange>
        </SearchInfoTitle>
        <div>{newList}</div>
      </SearchInfo>
    )
  }
  return null
}

...

handleMouseEnter() {
  dispatch(headerAction.getHandleMouseEnterAction(true))
},
handleMouseLeave() {
  dispatch(headerAction.getHandleMouseEnterAction(false))
},
```

### 10. 完成换一换功能

就是根据当前的页数取余总页数+1

```js
case CHANGE_INFO_TAG:
      return state.set("page", (state.get("page") % state.get("totalPage")) + 1)
```

### 11. 新的 immutable api merge 代替连续的 set 方法

```js
case MODIFY_LIST_DATA:
  // return state.set("list", action.data).set("totalPage", action.totalPage)
  return state.merge({
    list: action.data,
    totalPage: action.totalPage,
  })
```

### 12. 换一批图标的动画效果

```js
if (show || showInfo) {
  let spin
  return (
    <SearchInfo
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      <SearchInfoTitle>
        热门搜索
        <SearchInfoChange onClick={() => handleChangeTag(spin)}>
          {/* 把 ref 赋值给局部变量, 方便上面点击事件传值 */}
          <i ref={(icon) => (spin = icon)} className="iconfont changeTag">
            &#xe606;
          </i>
          换一批
        </SearchInfoChange>
      </SearchInfoTitle>
      <div>{newList}</div>
    </SearchInfo>
  )
}

...

handleChangeTag(spin) {
  let {
    style: { transform },
  } = spin
  transform = transform || "rotate(0deg)" // 设置默认值
  let oldAngle = +transform.replace(/[^\d+]/gi, "") // 取角度里面的数字
  oldAngle += 180
  spin.style.transform = `rotate(${oldAngle}deg)`
  dispatch(headerAction.getChangeInfoTagAction())
},
```

### 13. 减少不必要的 ajax 请求

发送请求是 handleFocus 函数做的, 给请求 list 数据的 action 添加派发条件, 通过判断组件从 store 中获取的 list 的 size 大小判断是否已经请求到 list 的数据, 这个数据获取一次即可无需每次 input 聚焦时都重新发送请求重复 merge store 中的 list 数据.



```js
handleFocus({ size }) {
  size === 0 && dispatch(headerAction.getRequestListDataAction())
  dispatch(headerAction.getSearchFocusStateAction(true))
},
```

### 14. 使用路由

#### 14.1 安装

```shell
yarn add react-router-dom
```

#### 14.2 简单使用

在 App.js 中引入插件, 并设置路由规则



```js
import React, { Component } from "react"
import { Provider } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom"
import Header from "./common/header"
import store from "./store"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <BrowserRouter>
          {/* 根路径会显示home和detail, 因为2个路径都包含'/', 添加 exact 就是完全相等的匹配, 可以解决这种问题 */}
          {/* BrowserRouter代表路由, Route代表路由规则 */}
          <Route path="/" exact render={() => <div>home</div>}></Route>
          <Route path="/detail" exact render={() => <div>detail</div>}></Route>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App

```

#### 14.3 项目页面文件结构

~~~shell
```pages
pages           
├─ detail       
│  └─ index.js  
├─ home         
│  └─ index.js  
└─ index.js     

```
---
~~~

上一小节, Route 的 render 属性是针对 jsx 的, 如果是组件就要用 component 属性.



```js
import { Detail, Home } from "./pages"

...

<Route path="/" exact component={Home.default}></Route>
<Route path="/detail" exact component={Detail.default}></Route>
```

### 15. 设计首页的组件

~~~shell
```home
home                
├─ components       
│  ├─ index.js      
│  ├─ List.js       
│  ├─ Recommend.js  
│  ├─ Topic.js      
│  └─ Writer.js     
├─ index.js         
└─ style.js         

```
---
~~~

```js
import React, { Component } from "react"
import Components from "./components"
import { HomeWrapper, HomeLeft, HomeRight } from "./style"

class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img
            className="banner-image" src="//upload.jianshu.io/admin_banners/web_images/4318/60781ff21df1d1b03f5f8459e4a1983c009175a5.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
            alt=""
          />
          <Components.Topic></Components.Topic>
          <Components.List></Components.List>
        </HomeLeft>
        <HomeRight>
          <Components.Recommend></Components.Recommend>
          <Components.Writer></Components.Writer>
        </HomeRight>
      </HomeWrapper>
    )
  }
}

export default Home

```

#### 15.1 编写 topic 组件

##### 15.1.1 先完成组件的静态页面(styled-components)

##### 15.1.2 使用 reducer

前面完成的静态页面 TopicItem 是相同的而且写死的, 应该用循环来完成, 这里需要引入 reducer , 这些小的组件都属于 home 组件, 而且数据量并不是很大, 我们不需要每个小组件都包含一个 store 文件夹 一个 style.js 文件, 那样就过渡组件化了, 只需要给 home 一个 store 文件夹(包含 reducer , actionTypes, index.js 等) 和 style.js 样式组件文件. 小组件引入并使用即可.

这里有个小知识点, 使用 immutable 转化的引用类型里面的属性也不能像普通 js 对象直接访问, 要使用 get 方法.

```js
const Topic = (props) => {
  const { topicList } = props
  return (
    <TopicWrapper>
      {
        // topicList 是 immutable 对象
        // 不能使用 item.xx 访问, 要用 get 方法
        topicList.map(item => (
          <TopicItem key={item.get('id')}>
            <img
              className='topic-item-img'
              src={item.get('imgURL')} alt="" />
            {item.get('title')}
          </TopicItem>
        ))
      }
    </TopicWrapper>
  )
}

const mapStateToProps = (store) => {
  return {
    topicList: store.getIn(['home', 'topicList'])
  }
}
```

#### 15.2 编写 List 组件

##### 15.2.1 解决防盗链的问题

list 中有图片的内容, 使用图片时出现了图片单独可以访问, 在 img 标签中使用就会报 403 .

> 解决办法:
>
> html 头部添加 meta 标签
>
> ```html
> <!-- 与img标签的 referrer 配合使用可以解决403防盗链的错误 -->
> <meta name="referrer" content="no-referrer" />
> ```
>
> ```js
> <img
>   referrer="no-referrer|origin|unsafe-url"
>   src="https://upload-images.jianshu.io/upload_images/21325242-9df989a2192734ea.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240" alt="" />
> ```
>
> img 标签添加 referrer 属性.

