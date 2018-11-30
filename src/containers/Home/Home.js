import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {observable} from 'mobx'
import { store } from '../../store/DataStore';
import Slider from '../../components/Slider/Slider';
import logo from '../../logo.png'
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Fade from 'react-reveal/Fade';


var classNames = require('classnames');

@observer class Home extends Component {
    @observable squad = [];
    @observable vecinos = [];
    @observable puntajes = {}
    @observable frase1 =  '...'
    @observable frase2 = '...'
    @observable frase3 = '...'
    @observable tempusers = {}
    @observable pressed = false
    

    constructor(props) {
        super(props);
        this.handleSquad = this.handleSquad.bind(this);
        this.imgID  = this.imgID.bind(this);
        this.tempusers = store.data
        this.handleButtonPress = this.handleButtonPress.bind(this)
        this.handleButtonRelease = this.handleButtonRelease.bind(this)
   
        this.groupProps = {
            appear: true,
            enter: true,
            exit: false,
          };
    }
  
    handleSquad(e) {
        let value = e.target.value;
        this.squad.push(value)
        console.log(this.squad);
    }

    handleButtonPress(e, i) {
        console.log(e, i, 'holi')
    }

    handleButtonRelease(e) {

    }

    imgID(e){
        console.log(e);
        this.squad = [];
        let name = store.data[e].nombre
        this.squad.push(name)
        store.tempsquad = this.squad;
        store.updateSquad();
    }
  
      render(){
        var imgClass = classNames({
            'arrayImg': true,
            'arrayImg pressed': this.pressed,
            'arrayImg': !this.pressed 
          });
          
       return  <section className='contApp'> 

           <div className='mbheader'  >
           <img id='logo' src={logo}></img>

                        <button className='mbtn reset' onClick={(e) => {
               store.squadlist.map((e,i) =>{
                   this.tempusers.push(e)
               })
               console.log(this.tempusers.length, this.props.data.length)
               this.frase1 = '...';
               this.frase2 = '...';
               this.frase3 = '...';
               var elems = document.querySelectorAll(".selectedUser");
               [].forEach.call(elems, function(el) {
                el.classList.remove("selectedUser");
                el.className = ('arrayImg')
            });
         this.squad = [];
         store.tempsquad = this.squad;
         store.squadlist = [];
         }}> Reset</button>        </div>
        <section id='head' className='planrecomendation'>
        <h1 className='title dark'>Escoge el parche</h1>
            <div className='people abcd'>

                {  
                    this.tempusers.map( (e, i) => {
                      return  <img className={imgClass} id={i} src={require('../../components/GenViz/photos/' + e.foto)} 
                      onClick={(e) => {     this.imgID(e.target.id)

                        this.tempusers.splice(i,1); }}
                    onTouchStart={ (e) => { 
                        store.startX = e.touches[0].clientX;
                        console.log(e.target.id)
                        this.pressed =true;
                        
                    }} 
                    onTouchMove={(e)=> {
                        store.touchX = e.touches[0]
                        store.changeX = store.startX - store.touchX.clientX;
                    }}   
                    
                    onTouchEnd= { (e) => {
                        this.pressed = false;
                    }}
                    ></img> 
                }) 
            }      
          
                
            </div>

            <Zoom>

            <div id='squadplann' className='selectedsquad'>
            <TransitionGroup {...this.groupProps}  className='newparent'>

            {
                store.squadlist.map( (e,i) => {
                    return <Fade  ><div  className='childsquad'> 
                                                <img className='selectedSquadImg' id={i}  alt={e.nombre} src={require('../../components/GenViz/photos/' + e.foto)}></img>
                            <p>{e.nombre}</p>
                    </div> </Fade>  
                })
            }
                      </TransitionGroup>

            </div>
            </Zoom>

            <div  className='abcd btns'>
            <button className='mbtn planbtn defaultbtn'  onClick={(e) => {
             store.squadPlan();
             this.frase1 = store.finalplanOne;
             this.frase2 = store.finalplanTwo;
             this.frase3 = store.finalplanThree;
             this.squad = [];
             window.location.href='#planresults'
        
         }}> Plan</button>

            </div>
        
            <Slide left>
        <div id='planresults' className='abcd'>
            <div className='plandiv uno'>
            <h1 className='h1White  planh1 tleft'>La mejor opción es</h1>
            <p className='white tleft' >{this.frase1}</p>
            </div>
            <div className='plandiv dos'>
                <h1 className='h1White planh1 tleft'>Una Buena opción es</h1>
                <p className='white tleft'>{this.frase2}</p>
            </div>
            <div className='plandiv tres'>
                <h1 className='h1dark planh1 tleft'>Si lo otro falla</h1>
                <p className='dark tleft'>{this.frase3}</p>
            </div>
            </div>
            </Slide>
            <Slider>Hello</Slider>
        </section>
       </section>
       
    }
}
export default Home;

/**
 *            <Slider color='#F49672' plantext={this.frase1}><h1 className='h1White' >El mejor plan es</h1></Slider>

 */