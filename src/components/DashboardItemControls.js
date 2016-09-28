import React, { Component, PropTypes } from 'react';
import { ButtonOutline } from 'rebass';

class DashboardItemControls extends Component {

  static propTypes = {
      item: PropTypes.object.isRequired,
      container: PropTypes.object.isRequired
  }

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
