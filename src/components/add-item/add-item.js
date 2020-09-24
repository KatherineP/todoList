import React, { Component } from 'react';
import './add-item.css';

export default class AddItem extends Component {

  state = {
    label: '',
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdded(this.state.label);
    this.setState({
      label: '',
    })
 };


  render() {
    return (
<form className="input-group mb-3 add-item"
      onSubmit={this.onSubmit}>
  <input type="text" className="form-control" placeholder="Add your Item"
        onChange={this.onLabelChange} value={this.state.label} />
  <button className="btn btn-success" type="submit">Add</button>
</form>
    );
  }
};
