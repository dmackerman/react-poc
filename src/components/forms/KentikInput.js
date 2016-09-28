// greater detail about Forms
// https://jsfiddle.net/royriojas/qp5p33cn/
import React, { Component, PropTypes } from 'react';
import { Input } from 'rebass';

export default class KentikInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event.target.name, event.target.value);
  }

  render() {
    const input = this.props;
    return (
      <Input id={input.id}
        name={input.name}
        label={input.placeholder}
        placeholder={input.placeholder}
        onChange={this.onChange}
        type={input.type}
        value={input.value} />
    );
  }
}

KentikInput.propTypes = {
  onChange: PropTypes.func.isRequired
};

KentikInput.defaultProps = {
  type: 'text'
};
