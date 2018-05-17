import React from 'react';
import { requireNativeComponent, StyleSheet, Text, View, TouchableHighlight, DatePickerIOS, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class Hamburger extends React.Component {
  render() {
    return (
      <TouchableHighlight style={styles.hamburger} onPress={this.props.onClick}>
        <View style={styles.burgerLineContainer}>
          <Text style={styles.burgerLine}></Text>
          <Text style={styles.burgerLine}></Text>
          <Text style={styles.burgerLine}></Text>
        </View>
      </TouchableHighlight>
    )
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startAfterDate: new Date(),
      endBeforeDate: new Date(),
    };
  }

  setStartDate = (newDate) => {
    this.setState({startAfterDate: newDate})
  }

  setEndDate = (newDate) => {
    this.setState({endBeforeDate: newDate})
  }

  render() {
    return (
      <View style={styles.container}>
        <DatePickerIOS
          date={this.state.startAfterDate}
          onDateChange={this.setStartDate}
        />
        <DatePickerIOS
          date={this.state.endBeforeDate}
          onDateChange={this.setEndDate}
        />
        <Button title="Search" onPress={this.props.onClick} />
      </View>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectingDate: false,
      data: {
        events: []
      },
    }
    fetch('https://rovu.herokuapp.com/api/v1/events?category_id=120', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        res.json().then(data => {
          this.setState({ data })
        })
      })
      .catch(console.warn)
  }

  toggleSearchForm = () => {
    this.setState({ selectingDate: !this.state.selectingDate })
  }

  render() {
    return (
      this.state.selectingDate ?
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
  hamburger: {
    backgroundColor: '#fdfdfd',
    position: 'absolute',
    top: 50,
    left: 30,
    height: 60,
    width: 60,
    zIndex: 2,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowRadius: 15,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  burgerLineContainer: {
    padding: 10,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    flex: 1,
  },
  burgerLine: {
    width: '100%',
    height: 8,
    backgroundColor: '#343434',
    borderRadius: 30,
  },
});
