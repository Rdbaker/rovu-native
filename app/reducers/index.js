import { combineReducers } from 'redux';
import searchReducers from './search';


export default combineReducers({
  search: searchReducers
})