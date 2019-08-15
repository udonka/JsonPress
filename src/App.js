import React,{Component} from 'react';
import fetch from 'node-fetch';
import logo from './logo.svg';
import './App.scss';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import JsonPress from './JsonPress.js';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      url: "/",
      json: []
    }

  }


  componentDidUpdate(prevProps, prevState, snapshot){

  }


  render(){
    return  pug`
      .c-top-bar 
        .e-inner
          .e-title JsonPress
      .c-main-column.c-page-column
        Router
          Route(exact path="/" render=${(props)=>pug`p home`})
          Route(path="/edit/:id.json" render=${(props)=>{
            console.log("props.match.params.id")
            console.log(props.match.params.id)

            return pug`
              JsonPress(url="/"+props.match.params.id + ".json")
            `;
          }})


    `;
  }
}

export default App;
