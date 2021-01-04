import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ChangeShelf extends Component {
  static propTypes = {
    currentValue: PropTypes.string.isRequired,
    onChangeOption: PropTypes.func.isRequired
  }

  renderOptions = (options) => {
    return options.map((option) => (
        <option key={option.key} value = {option.value}>{option.name}</option>
    ))
  }

  handleChange = (event) => {
    const newOption = event.target.value
    this.props.onChangeOption(newOption)
  }

  render() {

    const options = [
      {key: '1', value: 'currentlyReading', name: 'Currently Reading'},
      {key: '2', value: 'wantToRead', name: 'Want to Read'},
      {key: '3', value: 'read', name: 'Read'},
      {key: '4', value: 'none', name: 'None'}
    ];

    return (
      <select defaultValue = {this.props.currentValue} onChange={this.handleChange}>
        {this.renderOptions(options)}
      </select>
    )
  }
}

export default ChangeShelf
