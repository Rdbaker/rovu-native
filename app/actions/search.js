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


export const searchEvents = () => {
  return (dispatch, getState) => {
    const startAfter = getState().search.getIn(['eventsQuery', 'startAfterDate']) || new Date()
    const endBefore = getState().search.getIn(['eventsQuery', 'endBeforeDate']) || new Date()
    console.log(getState().search.getIn(['eventsQuery', 'endBeforeDate']) || new Date())
    return fetch(`https://rovu.herokuapp.com/api/v1/events?event_start_after=${startAfter.toISOString()}&event_end_before=${endBefore.toISOString()}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        res.json().then(data => {
          dispatch(searchEventsSuccess({ data }))
        })
      })
      .catch(err => {
        dispatch(searchEventsFailed({ err }))
      })
  }
};