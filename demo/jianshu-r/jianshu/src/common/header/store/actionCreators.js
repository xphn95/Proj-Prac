import axios from "axios"
import { fromJS } from "immutable"
import * as actionTypes from "./actionTypes"

const getmodifySearchListAction = (data) => ({
  type: actionTypes.MODIFY_LIST_DATA,
  data: fromJS(data),
  totalPage: Math.ceil(data.length / 10),
})

export const getSearchFocusStateAction = (value) => ({
  type: actionTypes.SAVE_SEARCH_FOCUS_STATE,
  value,
})

export const getRequestListDataAction = () => {
  return (dispatch) => {
    axios
      .get("/api/headerList.json")
      .then((res) => {
        const data = res.data
        dispatch(getmodifySearchListAction(data.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const getHandleMouseEnterAction = (data) => ({
  type: actionTypes.HANDLE_MOUSE_ENTER,
  data,
})

export const getChangeInfoTagAction = () => ({
  type: actionTypes.CHANGE_INFO_TAG,
})
