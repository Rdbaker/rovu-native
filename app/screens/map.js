import React from 'react';

import EventMap from './app/components/map';


class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Event Map',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <EventMap onHamburgerClick={() => nativate('Search')} />
    );
  }
};


export default MapScreen