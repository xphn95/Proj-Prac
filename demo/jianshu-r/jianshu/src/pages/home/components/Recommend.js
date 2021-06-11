import React from "react"
import { connect } from "react-redux"
import { RecommendItemWrapper, RecommendItem, APPQRCode } from "../style"

const RecommendUI = (props) => {
  const { recommendItems, QRCode, infoTitle, infoDesc } = props
  return (
    <>
      <RecommendItemWrapper>
        {recommendItems.map((item) => {
          return (
            <RecommendItem href="/" alt="" key={item.get("id")}>
              <img src={item.get("img")} alt="" />
            </RecommendItem>
          )
        })}
      </RecommendItemWrapper>
      <APPQRCode>
        <a href="/">
          <div className="QRCodeHover">
            <img src={QRCode} alt="" />
            <i></i>
          </div>
          <img src={QRCode} alt="" />
          <div className="info">
            <div className="title">
              {infoTitle}
              <i className="iconfont">&nbsp;&nbsp;&#xe61f;</i>
            </div>
            <div className="desc">{infoDesc}</div>
          </div>
        </a>
      </APPQRCode>
    </>
  )
}

const mapStateToProps = (store) => {
  return {
    recommendItems: store.getIn(["home", "itemImgUrl"]),
    QRCode: store.getIn(["home", "QRCode"]),
    infoTitle: store.getIn(["home", "infoTitle"]),
    infoDesc: store.getIn(["home", "infoDesc"]),
  }
}

export const Recommend = connect(mapStateToProps, null)(RecommendUI)
