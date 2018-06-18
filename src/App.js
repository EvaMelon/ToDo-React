import React, { Component } from 'react';
import classNames from 'classnames';
import './reset.css';
import './App.css';
import './oop'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      items:[{text:"g", done:true}, {text:"u", done:false}]
    };
  }
  //  this.state={
    //  className="button"}
 // }
  
  handleKeyPress = (event) => { 
    const enterKey = 13;
    if (event.which == enterKey) {
      const items = this.state.items;
      const newItem = {text:event.target.value, done:false};
      const newItems = items.concat(newItem); 
      this.setState({
        items: newItems
      });
      event.target.value="";
    }
  }

  handleToggleItem = (index) => {
    const oldItems = this.state.items;
    const updatedItems = [];
    for (let i = 0; i < oldItems.length; i++) {
      if (i == index) {
        const itemToUpdate = oldItems[index];
        const updatedItem = {...itemToUpdate, done:!itemToUpdate.done};
        updatedItems.push(updatedItem);
      }
      else {
        updatedItems.push(oldItems[i]);
      }
    }
    this.setState({
      items: updatedItems
    });
  }

  renderItems() {
    const items = [];
    for(let i = 0; i < this.state.items.length; i++) {
        let itemArray = <TodoItem
                          text={this.state.items[i].text}
                          done={this.state.items[i].done}
                          onToggle={() => { this.handleToggleItem(i)} }
                        />;
        items.push(itemArray);
    }
    return items;
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">todos</h1>
        <div className="fieldSet">
          <ButtonColorChange>v</ButtonColorChange>
          <input type="text" className="todos-writingSpace" placeholder="What needs to be done?"
                 onKeyPress={this.handleKeyPress}/>
        </div>
        <div>
          {this.renderItems()}
        </div>

    {/*    <section className="itemCounter-section">
          <span>0 items left</span>
          <span>All</span>
          <span>Active</span>
          <span>Completed</span>
          <span>Completed</span>
          <span>Clear completed</span>
    </section> */}


      </div>
    );
  }
}

class TodoItem extends React.Component {
 render() {
   return (
  <div>

    <div 
      className={
        classNames({
          "todo":true,
          "done": this.props.done
          //w JS do false jest obliczne (falsy): null, undefined, 0, NaN, "", false.
          //Wszystko inne do true (truthy)
      })}>

      <label className="check-container">
          <input 
            type="checkbox" className="checkbox" checked={this.props.done}
            onChange={this.props.onToggle}
          /> 
          <span className="checkmark"></span>
      </label>

      <span className="items-section">{this.props.text}</span>

    </div>

  </div>

    
    
   );
 }
}

class ButtonColorChange extends React.Component {
  state = {
    isBlack:false
  }

  handleClick = (event) => { 
    this.setState({
      isBlack:!this.state.isBlack
    });
  }

  render() {
    return (
      <button
      className={classNames({
        "button":true,
        "blackButton": this.state.isBlack
      })}
      onClick={(this.handleClick)}>{this.props.children} { /* class maja this*/ }
      </button>
    )
  }
}

export default App;
