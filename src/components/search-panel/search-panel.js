import React, {Component} from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    text: '',
  }

  onLabelChange = (e) => {
    const text = e.target.value;
    this.setState({ text }); //update this.state.text
    this.props.onSearchInput(text);
  }

  render() { 
    return <input className="search-input" placeholder="search"
            onChange={this.onLabelChange}
            value={this.state.text} />;
  }
 };
