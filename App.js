import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import SearchForm from './app/components/searchForm';
import EventMap from './app/components/map';
import reducers from './app/reducers';

const store = createStore(reducers, applyMiddleware(thunk))

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectingDate: false,
      data: {
        events: []
      },
    }
  }

  toggleSearchForm = () => {
    this.setState({ selectingDate: !this.state.selectingDate })
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.selectingDate ?
          <SearchForm onClick={this.toggleSearchForm} />
        :
          <EventMap onHamburgerClick={this.toggleSearchForm} />
        }
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});