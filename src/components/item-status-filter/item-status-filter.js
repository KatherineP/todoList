import React, { Component } from 'react';
import './item-status-filter.css';

export default class AppFilter extends Component {

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];
  onFilter = (e) => {
    this.props.onFilter(e.target.innerText.toLowerCase());
  }

  render() {
    const { filter } = this.props;

    const buttons = this.buttons.map(({name, label}) => {
        const isActive = filter === name;
        const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
        return <button type="button" className={`btn ${clazz}`} key={name} onClick={this.onFilter}>{label}</button>
    });

    return (
    <div className="btn-group">
     {buttons}
    </div>
    );
  }
};