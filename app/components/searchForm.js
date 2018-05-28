import React from 'react';
import { StyleSheet, Text, View, Button, Picker } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setEndBeforeDate, setStartAfterDate, setCategoryId } from '../actions/search';
import { searchEvents } from '../thunks/search';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
  },
})


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startAfterDate: this.props.startAfterDate || new Date(),
      endBeforeDate: this.props.endBeforeDate || new Date(),
      startDateSelectVisible: false,
      endDateSelectVisible: false,
    };
  }

  setStartDate = (newDate) => {
    this.setState({startAfterDate: newDate}, this.toggleStartSelectVisible)
  }

  setEndDate = (newDate) => {
    this.setState({endBeforeDate: newDate}, this.toggleEndSelectVisible)
  }

  toggleEndSelectVisible = () => {
    this.setState({endDateSelectVisible: !this.state.endDateSelectVisible})
  }

  toggleStartSelectVisible = () => {
    this.setState({startDateSelectVisible: !this.state.startDateSelectVisible})
  }

  dispatchSearch = () => {
    this.props.actions.setEndBeforeDate(this.state.endBeforeDate)
    this.props.actions.setStartAfterDate(this.state.startAfterDate)
    this.props.actions.searchEvents()
    this.props.onClick()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Search for events</Text>
        <Button title="Select Start After Date" onPress={this.toggleStartSelectVisible} />
        <Text>Current start after date: {this.state.startAfterDate.toLocaleString()}</Text>
        <DateTimePicker
          isVisible={this.state.startDateSelectVisible}
          onConfirm={this.setStartDate}
          onCancel={this.toggleStartSelectVisible}
          date={this.state.startAfterDate}
          mode='datetime'
          minuteInterval={15}
        />
        <Button title="Select End Before Date" onPress={this.toggleEndSelectVisible} />
        <Text>Current end before date: {this.state.endBeforeDate.toLocaleString()}</Text>
        <DateTimePicker
          isVisible={this.state.endDateSelectVisible}
          onConfirm={this.setEndDate}
          onCancel={this.toggleEndSelectVisible}
          date={this.state.endBeforeDate}
          mode='datetime'
          minuteInterval={15}
        />
        {!!this.props.facets &&
          <Picker style={{ height: 50, width: 280 }} selectedValue={this.props.categoryId} onValueChange={(id) => this.props.actions.setCategoryId(id)}>
            {this.props.facets.map(facet => (
              <Picker.Item key={facet.get('category_id')} value={facet.get('category_id')} label={`${facet.get('name')} (${facet.get('event_count')})`}/>
            ))}
          </Picker>
        }
        <Button title="Search" onPress={this.dispatchSearch} />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({
        setEndBeforeDate,
        setStartAfterDate,
        setCategoryId,
        searchEvents,
      },
      dispatch
    )
  }
)

const mapStateToProps = state => {
  return {
    endBeforeDate: state.search.getIn(['eventsQuery', 'endBeforeDate'], new Date()),
    startAfterDate: state.search.getIn(['eventsQuery', 'startAfterDate'], new Date()),
    categoryId: state.search.getIn(['eventsQuery', 'categoryId']),
    facets: state.search.getIn(['eventsData', 'facets']),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)