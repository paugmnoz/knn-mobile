import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {observable} from 'mobx'
import { store } from '../../store/DataStore';
import Slider from '../../components/Slider/Slider';

@observer class Home extends Component {
    @observable squad = [];
    @observable vecinos = [];
    @observable puntajes = {}
    @observable frase1 =  '...'
    @observable frase2 = '...'
    @observable frase3 = '...'
    @observable tempusers = {}

    constructor(props) {
        super(props);
        this.handleSquad = this.handleSquad.bind(this);
        this.imgID  = this.imgID.bind(this);
        this.tempusers = store.data
    }
  
    handleSquad(e) {
        let value = e.target.value;
        this.squad.push(value)
        console.log(this.squad);
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
          
       return  <section id='head' className='planrecomendation'>
            <div className='people abcd'>
                {  
                    this.tempusers.map( (e, i) => {
                      return <img className='arrayImg' id={i} src={require('../../components/GenViz/photos/' + e.foto)} 
                      onClick={(e) => {  this.imgID(e.target.id);
                     this.tempusers.splice(i,1);
                   }} ></img>
                 })
                }
            </div>
            <div className='selectedsquad'>
            {
                store.squadlist.map( (e,i) => {
                    return <img className='selectedSquadImg' id={i} src={require('../../components/GenViz/photos/' + e.foto)}></img>
                })
            }
            </div>
            <div  className='abcd btns'>
            <button className='mbtn defaultbtn'  onClick={(e) => {
             store.squadPlan();
             this.frase1 = store.finalplanOne;
             this.frase2 = store.finalplanTwo;
             this.frase3 = store.finalplanThree;
             this.squad = [];
         }}> Plan</button>

           <button className='mbtn defaultbtn' onClick={(e) => {
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
         }}> Reset</button>
            </div>
           <Slider color='#F49672' plantext={this.frase1}><h1 className='h1White' >El mejor plan es</h1></Slider>
        <div id='planresults' className='abcd'>
            <div className='plandiv uno'>
            <h1 className='h1White tleft'>La mejor opción es</h1>
            <p className='white' >{this.frase1}</p>
            </div>
            <div className='plandiv dos'>
                <h1 className='h1White tleft'>Una Buena opción es</h1>
                <p className='white'>{this.frase2}</p>
            </div>
            <div className='plandiv tres'>
                <h1 className='h1dark tleft'>Si lo otro falla</h1>
                <p className='dark'>{this.frase3}</p>
            </div>
            </div>
        </section>
    }
}
export default Home;