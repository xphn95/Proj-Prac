import { fromJS } from "immutable"
import {
  SAVE_SEARCH_FOCUS_STATE,
  MODIFY_LIST_DATA,
  HANDLE_MOUSE_ENTER,
  CHANGE_INFO_TAG,
} from "./actionTypes"

const defaultState = fromJS({
  focused: false,
  list: [],
  page: 1,
  totalPage: 1,
  mouseIn: false,
})

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_SEARCH_FOCUS_STATE:
      return state.set("focused", action.value)
    case MODIFY_LIST_DATA:
      // return state.set("list", action.data).set("totalPage", action.totalPage)
      return state.merge({
        list: action.data,
        totalPage: action.totalPage,
      })
    case HANDLE_MOUSE_ENTER:
      return state.set("mouseIn", action.data)
    case CHANGE_INFO_TAG:
      return state.set("page", (state.get("page") % state.get("totalPage")) + 1)
    default:
      return state
  }
  // if (action.type === SAVE_SEARCH_FOCUS_STATE) {
  //   /* const newState = JSON.parse(JSON.stringify(state))
  //   newState.focused = action.value
  //   return newState */
  //   // state 现在是 immutable 对象, 要用 immutable 的方式设置新的状态
  //   // 注意: 并没有违背不修改的原则, immutable 的 set 方法不是修改而是提供把原来的状态和新的状态结合成全新的状态
  //   return state.set("focused", action.value)
  // } else if (action.type === MODIFY_LIST_DATA) {
  //   return state.set("list", action.data)
  // }
  // return state
}
