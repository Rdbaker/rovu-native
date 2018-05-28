import { searchEventsSuccess, searchEventsFailed } from '../actions/search'

export const searchEvents = () => {
  return (dispatch, getState) => {
    const startAfter = getState().search.getIn(['eventsQuery', 'startAfterDate']) || new Date()
    const endBefore = getState().search.getIn(['eventsQuery', 'endBeforeDate']) || new Date()
    const categoryId = getState().search.getIn(['eventsQuery', 'categoryId'])
    const URL = `https://rovu.herokuapp.com/api/v1/events?event_start_after=${startAfter.toISOString()}&event_end_before=${endBefore.toISOString()}&categoryId=${categoryId}`
    console.log('fetching:')
    console.log(URL)
    return fetch(URL, {
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