import React from "react"
import { connect } from "react-redux"
import { TopicWrapper, TopicItem } from "../style"

const TopicUI = (props) => {
  const { topicList } = props
  return (
    <TopicWrapper>
      {
        // topicList 是 immutable 对象
        // 不能使用 item.xx 访问, 要用 get 方法
        topicList.map((item) => (
          <TopicItem key={item.get("id")}>
            <img className="topic-item-img" src={item.get("imgURL")} alt="" />
            {item.get("title")}
          </TopicItem>
        ))
      }
    </TopicWrapper>
  )
}

const mapStateToProps = (store) => {
  return {
    topicList: store.getIn(["home", "topicList"]),
  }
}

export const Topic = connect(mapStateToProps, null)(TopicUI)
