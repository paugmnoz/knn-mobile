import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {observable} from 'mobx'
import { mobStore } from '../../store/MobileStore';
import './MobileHome.css'

@observer class MobileHome extends Component {

    constructor(props) {
        super(props);
  
    }
    
    render(){
      
      return <div className='App'>  
          <div className='page1' 
          onTouchStart={(e)=> {
            mobStore.startX = e.touches[0].clientX;
            mobStore.touch();
          }}
          onTouchMove={(e)=> {
            mobStore.touchX = e.touches[0]
            mobStore.changeX = mobStore.startX - mobStore.touchX.clientX;
            if(mobStore.changeX<0){
                return;
            }
            document.getElementsByClassName('page1')[0].left = '-' + mobStore.changeX + 'px'
            document.getElementsByClassName('page2')[0].style.display = 'block'
            document.getElementsByClassName('page2')[0].style.left = (window.screen.width - mobStore.changeX) + 'px'
            e.preventDefault();
          }}
          onTouchEnd={(e)=> {
            let changed = mobStore.startX - e.changedTouches[0].clientX;
            let treeshold = window.screen.width /6;
            if(changed < treeshold) {
                document.getElementsByClassName('page1')[0].left = 0
                document.getElementsByClassName('page2')[0].left = '100%'
                document.getElementsByClassName('page2')[0].style.display = 'none'
            } else {
                document.getElementsByClassName('page1')[0].style.transition = 'all .8s'
                document.getElementsByClassName('page2')[0].style.transition = 'all .8s'
                document.getElementsByClassName('page1')[0].left = '-100%'
                document.getElementsByClassName('page2')[0].left = 0
                document.getElementsByClassName('page2')[0].style.display = 'block'

            }
          }}>
            <h1>Page 1, {mobStore.startX}</h1>
          </div>
          <div className='page2' 
               onTouchStart={(e)=> {
                mobStore.startX = e.touches[0].clientX;
                mobStore.touch();
                document.getElementsByClassName('page1')[0].style.display = 'none'
                document.getElementsByClassName('page1')[0].style.transition = ''
                document.getElementsByClassName('page2')[0].style.transition = ''
            }}
              onTouchMove={(e)=> {
                 let touchX = e.touches[0]
                let changeX = touchX.clientX - mobStore.startX ;
                if(changeX<0){
                    return;
                }
                document.getElementsByClassName('page1')[0].style.display = 'block'
                document.getElementsByClassName('page1')[0].style.left = ( changeX - window.screen.width ) + 'px'
                document.getElementsByClassName('page2')[0].left = changeX + 'px'
                e.preventDefault();
              }}
              onTouchEnd={(e)=> {
                let changed = e.changedTouches[0].clientX -  mobStore.startX ;
                let half = window.screen.width /4;
                if(changed < half) {
                    document.getElementsByClassName('page2')[0].left = 0
                    document.getElementsByClassName('page1')[0].style.display = 'none'
                    document.getElementsByClassName('page1')[0].left = '-100%'
                } else {
                    document.getElementsByClassName('page1')[0].style.transition = 'all .8s'
                    document.getElementsByClassName('page2')[0].style.transition = 'all .8s'
                    document.getElementsByClassName('page1')[0].left = 0    
                    document.getElementsByClassName('page2')[0].left = '100%'
                }
              }}
          >
            <h1>Page 2</h1>
          </div>
        </div>
    }
}
export default MobileHome;