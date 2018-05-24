import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import SearchForm from './app/components/searchForm';
import Hamburger from './app/components/hamburger';
import reducers from './app/reducers';

const store = createStore(reducers, applyMiddleware(thunk))
global.store = store;

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
          <View style={styles.container}>
            <Hamburger onClick={this.toggleSearchForm} />
            <MapView
              style={StyleSheet.absoluteFill}
              initialRegion={{
                latitude: 42.3617131,
                longitude: -71.0921,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {this.state.data.events.map(event => (
                <Marker
                  title={event.name}
                  description={event.description}
                  key={event.id}
                  coordinate={{ latitude: Number(event.venue.latitude), longitude: Number(event.venue.longitude) }}
                />
              ))}
            </MapView>
          </View>
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
