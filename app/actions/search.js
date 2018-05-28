export const setStartAfterDate = date => ({
  type: 'SET_START_AFTER_DATE',
  payload: date,
});

export const setEndBeforeDate = date => ({
  type: 'SET_END_BEFORE_DATE',
  payload: date,
});

export const setCategoryId = categoryId => ({
  type: 'SET_CATEGORY_ID',
  payload: categoryId,
});

export const searchEventsSuccess = ({ data }) => ({
  type: 'SEARCH_EVENTS_SUCCESS',
  payload: data
});

export const searchEventsFailed = ({ err }) => ({
  type: 'SEARCH_EVENTS_FAILED',
  payload: err
});