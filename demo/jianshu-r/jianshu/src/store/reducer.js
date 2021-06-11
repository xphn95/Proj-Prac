import { combineReducers } from 'redux-immutable'
import { reducer as headerReducer } from '../common/header/store'
import { reducer as homeReducer } from '../pages/home/store'

// redux-immutable 提供了同名的 combineReducer
// 这样总的 reducer 记录的数据也是不可修改的了
export default combineReducers({
  header: headerReducer,
  home: homeReducer
})
