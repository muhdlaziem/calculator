import React, { Component } from 'react';
import Button from './components/Button'
import "./css/style.css";
class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      current :'0',
      previous: [],
      nextIsReset: false,
      last:null
    }
  }
  reset = () =>{
    this.setState({current:'0', previous:[], last:null})
  }

  addToCurrent = (symbol) => {
    console.log("Symbol",symbol, "Previous", this.state.previous)

    if(["/","-","+","*"].indexOf(symbol)> -1){
      let {previous} = this.state;

      if(this.state.last){
        previous.push(this.state.last + symbol);

      }
      else{
      previous.push(this.state.current + symbol);}
      this.setState({previous: previous , nextIsReset: true})
    }
    else{
      if((this.state.current === "0" && symbol !== ".") || this.state.nextIsReset)
        this.setState({current: symbol, nextIsReset: false})
      else{
        this.setState({current: this.state.current +symbol})
      }
    }
  }

  calculate = (symbol) =>{
    let {current,previous, nextIsReset} = this.state
    if(previous.length > 0){
      // console.log(eval(String(previous + current)));
      let res="";
      for (let i = 0; i < previous.length; i++) {
        res+=previous[i];
      }
      res = res.replace('=','');

      let last = current;
      current = eval(String(res + current));
      this.setState({current: res + last + '=' + current, previous:[], nextIsReset: true, last:current})
    }
  }
  render(){
    const buttons = [
      {symbol: 'C', cols:3, action: this.reset},
      {symbol: '/', cols:1, action: this.addToCurrent},
      {symbol: '7', cols:1, action: this.addToCurrent},
      {symbol: '8', cols:1, action: this.addToCurrent},
      {symbol: '9', cols:1, action: this.addToCurrent},
      {symbol: '*', cols:1, action: this.addToCurrent},
      {symbol: '4', cols:1, action: this.addToCurrent},
      {symbol: '5', cols:1, action: this.addToCurrent},
      {symbol: '6', cols:1, action: this.addToCurrent},
      {symbol: '-', cols:1, action: this.addToCurrent},
      {symbol: '1', cols:1, action: this.addToCurrent},
      {symbol: '2', cols:1, action: this.addToCurrent},
      {symbol: '3', cols:1, action: this.addToCurrent},
      {symbol: '+', cols:1, action: this.addToCurrent},
      {symbol: '0', cols:2, action: this.addToCurrent},
      {symbol: '.', cols:1, action: this.addToCurrent},
      {symbol: '=', cols:1, action: this.calculate},
    ];
    return (
      <div className="App">
         {this.state.previous.length > 0 ?
         <div className="floaty-last">{this.state.previous}</div>
         :null}
        <input className="result" type ="text" value={this.state.current}/>




        {buttons.map((btn,i)=>{
          return <Button key={i} symbol ={btn.symbol} cols ={btn.cols} action={(symbol)=>btn.action(symbol)}/>
        })}


        
      </div>
    );
  }
  
}

export default App;
