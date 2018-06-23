import React, { Component } from 'react';
import classNames from 'classnames';
import './reset.css';
import './App.css';
import './oop'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "all",
      items:[{text:"g", done:true}, {text:"u", done:false}]
    };
  }
  
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

  onMouse = () => {
    
  }

  handleToggleItem = (index) => {
    console.log(">>>handleToggleItem");
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

  countCompletedItems() {
    const items = this.state.items;
    let itemsCount = 0;
    for(let i = 0; i < items.length; i++) {
      if(items[i].done == false) {
        itemsCount++;
      }
    }
    if (itemsCount != 1) {
      return itemsCount + " items left";
    }
    else {
      return itemsCount + " item left";
    }
  }

  clearCompleted = () => {
    const leftItems = [];
    const items = this.state.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].done == false) {
        leftItems.push(items[i]);
      }
    }
    this.setState({
      items: leftItems
    });
  }
  

  renderItems() {
    const items = [];
    for (let i = 0; i < this.state.items.length; i++) {
      let item = this.state.items[i];
      const todo = <TodoItem
        text={item.text}
        done={item.done}
        onToggle={() => { this.handleToggleItem(i)} }
      />;
      if(this.state.filter === "active" && !item.done ) {
        items.push(todo);
      }
      else if (this.state.filter === "completed" && item.done) {
        items.push(todo);
      }
      else if (this.state.filter === "all"){
        items.push(todo);
      }
      else if (this.state.filter === "clear" && !item.done) {
        items.push(todo);
      } 
    }
    return items;
  }

  setFilter(filter) {
    this.setState({
      filter: filter
    });
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
        <div className="items">
        
          {this.renderItems()} 
       

        </div>


        <section className="itemCounter-section">
          <span className="itemCounter-element items-left">
            {this.countCompletedItems()}</span>
          <button
            className={classNames({
              "itemCounter-element":true,
              "all":true,
              "selected": this.state.filter === "all"
            })}
            onClick={()=>{this.setFilter("all")}}
          >All
          </button>
          <button className={classNames({
            "itemCounter-element":true,
            "active":true,
            "selected": this.state.filter === "active"
          })}
          onClick={()=>{this.setFilter("active")}}
          >Active
          </button>
          <button className={classNames({
            "itemCounter-element":true,
            "completed":true,
            "selected": this.state.filter === "completed"
          })}
          onClick={()=>{this.setFilter("completed")}}
          >Completed</button>

          <button className="itemCounter-element clear"
         /* onClick={()=>{this.setFilter("clear")}}*/
         onClick={this.clearCompleted} 
         //funkcja
          >Clear completed</button>
        </section> 
      </div>
    );
  }
}


class TodoItem extends React.Component {
 render() {
   return (
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
      <span className="todo-text">
        {this.props.text}
      </span>
      <button className="button-x"
   //   onMouseOver={this.props.onMouse}
      >X</button>
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
    );
  }

}

export default App;
