import React, { Component } from "react"
import { connect } from "react-redux"
import { Topic, List, Recommend, Writer } from "./components"
import { HomeWrapper, HomeLeft, HomeRight } from "./style"
import { actionCreator } from "./store"

class HomeUI extends Component {
  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img
            className="banner-image"
            src="//upload.jianshu.io/admin_banners/web_images/4318/60781ff21df1d1b03f5f8459e4a1983c009175a5.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
            alt=""
          />
          <Topic></Topic>
          <List></List>
        </HomeLeft>
        <HomeRight>
          <Recommend></Recommend>
          <Writer></Writer>
        </HomeRight>
      </HomeWrapper>
    )
  }
  componentDidMount() {
    this.props.initData(actionCreator.initComponentsData())
  }
}

const mapDispatchToProps = (dispatch) => ({
  initData(action) {
    dispatch(action)
  }
})

const Home = connect(null, mapDispatchToProps)(HomeUI)

export default Home
