import { fromJS } from "immutable"
import {
  INIT_HOME_DATA,
  CHANGE_WRITER_LIST
} from "./actionTypes"

const defaultState = fromJS({
  topicList: [],
  articleList: [],
  itemImgUrl: [],
  QRCode: "",
  infoTitle: "",
  infoDesc: "",
  writerList: [],
  totalPage: 1,
  page: 1,
})

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case INIT_HOME_DATA:
      console.log(action.data.totalPage, action.data.page)
      return fromJS(action.data)
    case CHANGE_WRITER_LIST:
      return state.set('page', (state.get('page') % state.get('totalPage')) + 1)
    default:
      return state
  }
}
