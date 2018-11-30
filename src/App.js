import React, { Component, PropTypes  } from 'react';
import './App.css';
import Home from './containers/Home/Home';
import MobileHome from './containers/MobileHome/MobileHome';
import DeviceMotion from 'react-device-motion';
import Slider from './components/Slider/Slider';
import { store } from './store/DataStore';
import HeaderMobile from './components/HeaderMobile/HeaderMobile';
import Fade from 'react-reveal/Fade';

 class App extends Component {

  render() {
    
    return (
      <div className="App">
                  <Fade>

        <Home data = {store.data}></Home>
        </Fade>

      </div>
    );
  }
}

export default App;
/**
 *       <Home></Home>

 *   <Slider>
        <img  src={require('./components/GenViz/photos/luke.jpg')} ></img>
        </Slider>

       <DeviceMotion>
    {({
      acceleration,
      accelerationIncludingGravity,
      interval,
      rotationRate
    }) =>    
    (
      <div>
        {`Acceleration: ${JSON.stringify(acceleration)}`}
        {`Acceleration including gravity: ${JSON.stringify(accelerationIncludingGravity)}`}
        {`Interval: ${interval}`}
        {`Rotation rate: ${JSON.stringify(rotationRate)}`}
      </div>
    )}
  </DeviceMotion>
 */