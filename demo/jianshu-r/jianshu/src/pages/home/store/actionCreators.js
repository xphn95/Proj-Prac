import axios from "axios"
import {
  INIT_HOME_DATA,
  CHANGE_WRITER_LIST
} from "./actionTypes"

const updateComponentsData = (data) => ({
  type: INIT_HOME_DATA,
  data,
})

export const initComponentsData = () => {
  return (dispatch) => {
    axios
      .get("/api/home.json")
      .then(({ data: { data } }) => {
        data.totalPage = Math.ceil(data.writerList.length / 5)
        data.page = 1
        dispatch(updateComponentsData(data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const changeWriterListAction = (data) => ({
  type: CHANGE_WRITER_LIST,
  data
})
