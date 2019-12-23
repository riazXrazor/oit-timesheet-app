import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import RouteContainer from './routes';
class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return <RouteContainer />;
  }
}

export default App;
