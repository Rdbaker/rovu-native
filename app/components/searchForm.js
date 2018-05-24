import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setEndBeforeDate, setStartAfterDate } from '../actions/search';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    this.props.onClick()
  }

  render() {
    return (
      <View style={styles.container}>
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
        <Button title="Search" onPress={this.dispatchSearch} />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({actions: bindActionCreators({ setEndBeforeDate, setStartAfterDate }, dispatch)})

const mapStateToProps = state => {
  return {
    endBeforeDate: state.search.getIn(['eventsQuery', 'endBeforeDate'], new Date()),
    startAfterDate: state.search.getIn(['eventsQuery', 'startAfterDate'], new Date()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)