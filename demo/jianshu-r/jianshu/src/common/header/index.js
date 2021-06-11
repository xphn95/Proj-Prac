import React from "react"
import { CSSTransition } from "react-transition-group"
import { connect } from "react-redux"
import { headerAction } from "./store"
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  SearchWrapper,
  NavSearch,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoChange,
  SearchInfoItem,
  Addition,
  Button,
} from "./style"

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
  // 这里初始渲染会运行一次, 此时 list 是空数组, 因为请求数据是异步的, list 还没获取到数据
  // 加个判断避免无效的循环
  if (jsList.length) {
    for (let i = (page - 1) * 10; i < page * 10; i++) {
      newList.push(<SearchInfoItem key={jsList[i]}>{jsList[i]}</SearchInfoItem>)
    }
  }
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
  return null
}

const Header = (props) => {
  const {
    focused,
    showInfo,
    list,
    page,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
    handleChangeTag,
  } = props
  return (
    <HeaderWrapper>
      <Logo href="/" />
      <Nav>
        <NavItem className="left active">首页</NavItem>
        <NavItem className="left">下载App</NavItem>
        <NavItem className="right">登录</NavItem>
        <NavItem className="right">
          <i className="iconfont" style={{ fontWeight: 500, fontSize: "20px" }}>
            &#xe636;
          </i>
        </NavItem>
        <CSSTransition timeout={200} in={focused} classNames={"slide"}>
          <SearchWrapper
            className={focused ? "focused" : ""}
            onFocus={() => handleFocus(list)}
            onBlur={handleBlur}
          >
            <NavSearch placeholder="搜索" />
            <i className="iconfont searchIcon">&#xe662;</i>
            {getSearchInfo(
              focused,
              showInfo,
              list,
              page,
              handleMouseEnter,
              handleMouseLeave,
              handleChangeTag
            )}
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
    // 使用了 immutable 就要用 immutable对象的方式访问属性
    // focused: header.focused // 之前这种就不要了
    // focused: header.get('focused') // 要用 get 方法读取
    // 使用了 redux-immutable 使 store 中的数据也是不可修改的
    focused: store.getIn(["header", "focused"]),
    list: store.getIn(["header", "list"]),
    page: store.getIn(["header", "page"]),
    showInfo: store.getIn(["header", "mouseIn"]),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFocus({ size }) {
      size === 0 && dispatch(headerAction.getRequestListDataAction())
      dispatch(headerAction.getSearchFocusStateAction(true))
    },
    handleBlur() {
      dispatch(headerAction.getSearchFocusStateAction(false))
    },
    handleMouseEnter() {
      dispatch(headerAction.getHandleMouseEnterAction(true))
    },
    handleMouseLeave() {
      dispatch(headerAction.getHandleMouseEnterAction(false))
    },
    handleChangeTag(spin) {
      let {
        style: { transform },
      } = spin
      transform = transform || "rotate(0deg)"
      let oldAngle = +transform.replace(/[^\d+]/gi, "")
      oldAngle += 180
      spin.style.transform = `rotate(${oldAngle}deg)`
      dispatch(headerAction.getChangeInfoTagAction())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
