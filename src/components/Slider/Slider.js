import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { store } from '../../store/DataStore';

import { withGesture } from 'react-with-gesture'
import { Spring, animated } from 'react-spring'
@withGesture 
class Slider extends Component {
 
 constructor(props){
    super(props);
 }
    render(){
        const { xDelta, down, children } = this.props
    return (
        <Spring native to={{ x: down ? xDelta : 0,  }} immediate={name => down && name === 'x'}>
        {({ x }) => (
              <div className="item"   style={{ backgroundColor: xDelta < 0 ? '#FF1C68' : '#14D790'
       
       }} >
        
                  
          <animated.div
                className="bubble"
                style={{
                  transform: x
                    .interpolate({ map: Math.abs, range: [50, 300], output: [0.5, 1], extrapolate: 'clamp' })
                    .interpolate(x => `scale(${x})`),
                  justifySelf: xDelta < 0 ? 'end' : 'start'
                }}
            > {this.props.plantext}</animated.div> 
              <animated.div className="fg" style={{ transform: x.interpolate(x => `translate3d(${x}px,0,0)`), backgroundColor: this.props.color }}>
                {down && Math.abs(xDelta) > 50 ? (xDelta < 0 ? '' : '') : children}
              </animated.div>
            </div>)}
      </Spring>
    )}
}
export default Slider

