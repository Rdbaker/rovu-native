import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, TouchableHighlight, Button } from 'react-native';
import { connect } from 'react-redux';

import Hamburger from './hamburger';

const EventMap = ({
  events,
  facets,
  onHamburgerClick,
}) => (
  <View style={styles.container}>
    <Hamburger onClick={onHamburgerClick} />
    <MapView
      style={StyleSheet.absoluteFill}
      initialRegion={{
        latitude: 42.3617131,
        longitude: -71.0921,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {events.map(event => (
        <Marker
          title={event.get('name')}
          description={event.get('description')}
          key={event.get('id')}
          coordinate={{ latitude: Number(event.getIn(['venue', 'latitude'])), longitude: Number(event.getIn(['venue', 'longitude'])) }}
        />
      ))}
    </MapView>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    facets: state.search.getIn(['eventsData', 'facets'], []),
    events: state.search.getIn(['eventsData', 'events'], []),
  }
}

export default connect(mapStateToProps, null)(EventMap)