import React from "react"
import { connect } from "react-redux"
import { ListItem, ListInfo } from "../style"

const ListUI = (props) => {
  const { articleList } = props
  return (
    <>
      {articleList.map((item) => {
        return (
          <ListItem key={item.get("id")}>
            <img
              className="list-item-img"
              referrer="no-referrer|origin|unsafe-url"
              src={item.get("picURL")}
              alt=""
            />
            <ListInfo>
              <h3>{item.get("title")}</h3>
              <p>{item.get("description")}</p>
              <div className="item-meta">
                <span>
                  <i className="iconfont">&#xe6e6;</i>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.get("diamond")}
                </span>
                <a href="/">{item.get("author")}</a>
                <a href="/">
                  <i className="iconfont">&#xe684;</i>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.get("comment")}
                </a>
                <span>
                  <i className="iconfont">&#xe637;</i>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.get("like")}
                </span>
              </div>
            </ListInfo>
          </ListItem>
        )
      })}
    </>
  )
}

const mapStateToProps = (store) => {
  return {
    articleList: store.getIn(["home", "articleList"]),
  }
}

export const List = connect(mapStateToProps, null)(ListUI)
