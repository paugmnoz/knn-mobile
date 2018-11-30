import React, { Component } from 'react';
import './HeaderMobile.css'
import { store } from '../../store/DataStore';

class HeaderMobile extends Component {
             
                
constructor(props){
    super(props);
  }
 render(){
 const back = {
     backgroundImage: `url(${this.props.image})`

 };

 const overcolor = {
    backgroundColor: this.props.color,
    opacity: '0.6'


}
 return (
      <div className='mbheader' >
            <img></img>
            <button>Reset</button>
        </div>
                )}
            }
            
export default   HeaderMobile
            
            