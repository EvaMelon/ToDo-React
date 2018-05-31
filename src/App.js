import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './oop';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">todos</h1>
        <button type="button" class="button">v</button>
        <input type="text" class="todos-writingSpace" placeholder="What needs to be done?"/>
        <ul>
          <li class="itemList">jfd</li>
        </ul>
      
      </div>
    );
    
  }
}

function adder() {
  let button = document.querySelector("button");
  let singleItem = document.querySelector("itemList");

}

//jezeli ktos kliknie na button, to zmienia sie visibility singleitem i 
//dodaje sie to co jest w input text

export default App;
