import React, { Component } from 'react';
import './reset.css';
import './App.css';
import './oop'; 



class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      items:[{text:"g", done:false}, {text:"u", done:false}]
    };
  }
  // Tak deklarujemy metody, ktore chcemy przekazac innym komponentom np. w onKeyPress etc.
  handleKeyPress = (event) => { //event listener onkeypress
    const enterKey = 13;
    if (event.which == enterKey) {
      const items = this.state.items;
      const newItem = {text:event.target.value, done:false};
      const newItems = items.concat(newItem); //zwraca tablice, ktora jest sklejeniem items i argumentow, ktore przekazesz
      this.setState({
        items: newItems
      });
      event.target.value="";
    }
  }
  renderItems() {
    const items = [];
    for(let i=0; i<this.state.items.length; i++) {
        let itemArray = <TodoItem text={this.state.items[i].text} />;
        items.push(itemArray);
    }
    return items;
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">todos</h1>
        <div className="fieldSet">
          <button type="button" className="button" 
          onClick={this.buttonColorChange()}>v</button>
          <input type="text" className="todos-writingSpace" placeholder="What needs to be done?"
                 onKeyPress={this.handleKeyPress}/>
        </div>
        <div className="items-section">
          {this.renderItems()}
        </div>
      </div>
    );
    
  }
}

buttonColorChange = (event) => {
  const button = this.button;
  button.onClick.classList.add("blackButton");
}

class TodoItem extends React.Component {
 render() {
   return (
     <div className="todo">{this.props.text}</div>
   );

 }
}



export default App;

//znalzec przycisk i zmienic mu kolor na czarny po kliknieciu, bedzie mial dodawana klase z kolorem





