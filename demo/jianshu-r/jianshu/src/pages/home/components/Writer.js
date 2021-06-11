import React from "react"
import { connect } from "react-redux"
import { WriterHeader, WriterList, ShowAll } from "../style"
import { actionCreator } from "../store"

const WriterUI = (props) => {
  const { writerList, page, changeWriterList } = props
  let spin
  const iconRotate = () => {
    const {
      style: { transform },
    } = spin
    // spin.style.transform = "rotate(30deg)"
    spin.style.transform = transform || "rotate(60deg)"
    let rotateDeg = spin.style.transform.replace(/[^\d+]/gi, "")
    spin.style.transform = `rotate(${+rotateDeg + 360}deg)`
  }
  const getRenderWriterList = () => {
    const renderList = []
    const jsList = writerList.toJS()
    if (jsList.length) {
      for (let i = (page - 1) * 5; i < page * 5; i++) {
        const item = (
          <li key={jsList[i].id}>
            <a href="/" className="pic">
              <img src={jsList[i].pic} alt="" />
            </a>
            <a href="/" className="follow">
              <i className="iconfont">&#xe611;</i>
              关注
            </a>
            <a href="/" className="writerName">
              {jsList[i].name}
            </a>
            <p>{`写了${jsList[i].words}k字 · ${jsList[i].like}喜欢`}</p>
          </li>
        )
        renderList.push(item)
      }
    }
    return renderList
  }
  return (
    <>
      <WriterHeader>
        <div className="left">推荐作者</div>
        <div
          className="right"
          onClick={() => changeWriterList(page, () => iconRotate(spin))}
        >
          <i ref={(icon) => (spin = icon)} className="iconfont">
            &#xe606;
          </i>
          换一批
        </div>
      </WriterHeader>
      <WriterList>
        {getRenderWriterList()}
        {/* {writerList.map((item) => {
          return (
            <li key={item.get("id")}>
              <a href="/" className="pic">
                <img src={item.get("pic")} alt="" />
              </a>
              <a href="/" className="follow">
                <i className="iconfont">&#xe611;</i>
                关注
              </a>
              <a href="/" className="writerName">
                {item.get("name")}
              </a>
              <p>{`写了${item.get("words")}k字 · ${item.get("like")}喜欢`}</p>
            </li>
          )
        })} */}
      </WriterList>
      <ShowAll>
        查看全部
        <i className="iconfont">&#xe61f;</i>
      </ShowAll>
    </>
  )
}

const mapStateToProps = (store) => ({
  writerList: store.getIn(["home", "writerList"]),
  page: store.getIn(["home", "page"]),
})

const mapDispatchToProps = (dispatch) => ({
  changeWriterList(page, cb) {
    console.log(page)
    dispatch(actionCreator.changeWriterListAction())
    cb()
  },
})

export const Writer = connect(mapStateToProps, mapDispatchToProps)(WriterUI)
