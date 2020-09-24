import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list/todo-list';
import AppFilter from '../item-status-filter';
import AddItem from '../add-item';
import './app.css';

export default class App extends Component {
  randomIndex = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink milk'),
      this.createTodoItem('Drink tea'),
      this.createTodoItem('Learn React'),
    ],
    term: '',
    filter: 'all',
  };

  createTodoItem(label) {
    return {
        label: label,
        important: false,
        done: false,
        id: this.randomIndex++,
    }
  }

  toggleProperty(arr, id, propName) {
    return arr.map(el => {
      if (el.id === id) {
        // return { 
        //   ...el,
        //   'important': !el['important']
        //  }
        el[propName] = !el[propName]
      }
      return el;
    });
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const result = todoData.filter(el => el.id !== id);
      return {
        todoData: result,
      };
    });
  };

  addItem = (text) => {
      const newElement = this.createTodoItem(text);
      this.setState(({todoData}) => {
      let newArr = [...todoData, newElement];
      console.log(newArr);

      return {
        todoData: newArr,
      };
    });
  };

  searchItems = (term) => {
    this.setState({ term });
  }

  applyFilter = (filterValue) => {
    this.setState({ filter: filterValue });
  };

  filter (items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
        default:
        return items
    }
  }

  search = (arrItems, term) => {
    if(term.length === 0) {
      return arrItems;
    }
    return arrItems.filter((el) => {
      return el.label.toLowerCase().includes(term.toLowerCase());
    })
  };

  onToggleImportant = (id) =>  {
    this.setState(({todoData}) => {
      const arr = this.toggleProperty(todoData, id, 'important');
      return {
        todoData: arr,
      }
    });
    };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      const arr = this.toggleProperty(todoData, id, 'done');
      return {
        todoData: arr,
      }
    });
  };

  render() {

    const {todoData, term, filter} = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData.filter((item) => item.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchInput={(text) => this.searchItems(text)}/>
          <AppFilter filter={filter} onFilter={(filterValue) => this.applyFilter(filterValue)}/>
        </div>
  
        <TodoList todos={visibleItems}
        onDeleted={(id) => this.deleteItem(id)}
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone}
        />
        <AddItem onAdded ={(text) => this.addItem(text)}/>
      </div>
    );
  }
};

ReactDOM.render(<App />, 
  document.getElementById('root'));

