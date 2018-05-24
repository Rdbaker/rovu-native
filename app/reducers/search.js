import { Map, fromJS } from 'immutable';

const defaultState = Map({
  eventsQuery: Map({
    startAfterDate: null,
    endBeforeDate: null,
    categoryId: null,
  }),
});

export default function searchReducer(state = defaultState, action) {
  switch(action.type) {
    case 'SET_START_AFTER_DATE':
      return state.setIn(['eventsQuery', 'startAfterDate'], fromJS(action.payload));
    case 'SET_END_BEFORE_DATE':
      return state.setIn(['eventsQuery', 'endBeforeDate'], fromJS(action.payload));
    case 'SET_CATEGORY_ID':
      return state.setIn(['eventsQuery', 'categoryId'], fromJS(action.payload));
    case 'SEARCH_EVENTS_SUCCESS':
      return state.set('eventsData', fromJS(action.payload));
    default:
      return state;
  }
}