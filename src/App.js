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
      items:[{text:"g", done:false}, {text:"u", done:false}]
    };
  }

  deleteItem = (index) => {
    const leftItems = [];
    const deletedItems = [];
    const allItems = this.state.items;
    for (let i = 0; i < allItems.length; i++) {
      if(i == index) {
        deletedItems.push(allItems[i]);
      }
      else if (i != index) {
        leftItems.push(allItems[i]);
      }
    }
    this.setState({
      items: leftItems
    });
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

  toggleAll = () => {
    const items = this.state.items;
    const doneItems = [];
    const newDone = !this.areAllItemsDone(); 
    for(let i=0; i<items.length; i++) {
      const doneItem = {...items[i], done:newDone}; 
      doneItems.push(doneItem);
    }
    this.setState({
      items: doneItems,
      buttonClicked:!this.state.buttonClicked
    })
  }

  areAllItemsDone() {
    let allDone = true;
    const items = this.state.items;
    for(let i=0; i<items.length; i++) {
      if(items[i].done == false) {
        allDone = false;
      }
    }
    return allDone;
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
        onDelete={() => { this.deleteItem(i)} }
      />;
      if (this.state.filter === "active" && !item.done ) {
        items.push(todo);
      }
      else if (this.state.filter === "completed" && item.done) {
        items.push(todo);
      }
      else if (this.state.filter === "all"){
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

        <button className={classNames({
          "v-button": true,
          "blackButton": this.areAllItemsDone()
        })}
            onClick={this.toggleAll}
        >v</button>
         
          <input type="text" className="todos-writingSpace" 
          placeholder="What needs to be done?"
            onKeyPress={this.handleKeyPress}/>
        </div>

        <div className="items">
          {this.renderItems()} 
        </div>

        <section className="itemCounter-section">
          <span className="itemCounter-element items-left">
            {this.countCompletedItems()}</span>
          <div className="filter">
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
        </div>
          <button className="itemCounter-element clear"
          onClick={this.clearCompleted} 
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
      <button className={classNames({
          "button-x":true
      })}
      onClick={this.props.onDelete}
      >X</button>
    </div>
   );
 }
}

export default App;
