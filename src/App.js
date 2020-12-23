import React, { Component } from 'react';
import './App.css';
import Input1 from './components/input1';

class App extends Component {
  constructor(){
    super();
    this.state = { }
  }

 

  

  render() {
    return (
      <div className="App">
        
        <Input1/>
      </div>
    );
  }
}

export default App;
