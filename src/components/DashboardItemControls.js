import React, { Component } from 'react';
import { ButtonOutline } from 'rebass';

class DashboardItemControls extends Component {
  render() {
    const { item, container } = this.props;
    return (
      <div className="controls">
        <ButtonOutline theme="primary" mr={1} onClick={() => item.toggleEditItem()}>
          Edit
        </ButtonOutline>
        <ButtonOutline theme="error" mr={1} onClick={() => item.removeItem(container)}>
          Delete
        </ButtonOutline>
      </div>
    );
  }
}

export default DashboardItemControls;
