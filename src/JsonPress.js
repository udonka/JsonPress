import React,{Component} from 'react';
import './App.scss';

function isBlock(value){
  if(typeof value == "object"){ //オブジェクトや配列はブロック
    return true;
  }
  else if(typeof value == "string" && value.length > 100){ //長いテキストもブロック
    return true;
  }
  else{
    return false;
  }
}

export default class JsonPress extends Component{
  constructor(props){
    super(props);


    this.state = {
      json:[]
    }
    console.log("props.url");
    console.log(props.url);
    fetch(props.url)
      .then((res)=> res.text())
      .then((text)=>{
        console.log("text");
        console.log(text);
        try{
          const parsedJson = JSON.parse(text);

          this.setState({
            json: parsedJson
          });

        }
        catch(e){
          console.log(props.url +"のjsonがパースできませんでした。");
        }
      });
  }


  ValuePress(value){
    return pug`
      if Array.isArray(value)
        = this.ArrayPress(value)
      else if typeof value == "object"
        = this.ObjectPress(value)
      else if typeof value == "string"
        = this.StringPress(value)
      else if typeof value == "number"
        = this.NumberPress(value)
      else if typeof value == "boolean"
        = this.BooleanPress(value)
      //
        else
          p(style={background:"red"})= value
    `;
  }

  //// refarence types ////
  ObjectPress(object){
    return pug`
      .e-value.m-object
        - const keys = Object.keys(object)
        each key in keys
          .e-pair(key=key className=isBlock(object[key]) ? "m-block":"")
            .e-key
              = this.ValuePress(key)
            .e-cont
              = this.ValuePress(object[key])
    `;
  }

  ArrayPress(array){

    return pug`
      .e-value.m-array
        each item,index in array
          .e-cont(key=index className=isBlock(item) ? "m-block":"")
            =this.ValuePress(item)

    `;
  }



    //// value types ////
  StringPress(string){
    return pug`
      .e-value.m-string(contentEditable=true)= string
    `;
  }

  NumberPress(number){
    return pug`
      .e-value.m-number(contentEditable=true)= number
    `;
  }


  BooleanPress(bool){
    console.log("bool");
    console.log(bool);
    return pug`
      .e-value.m-boolean(contentEditable=true)= bool ? "true":"false"
    `
  }

  JsonPress(json){


    return pug`
      .c-json-press
        if Array.isArray(json )
          = this.ArrayPress(json)
        else if typeof json == "object"
          = this.ObjectPress(json)

    `;
  }

  render(){
    return  pug`
      =this.JsonPress(this.state.json)
    `;
  }
}

