import React, { Component, PropTypes } from 'react';
import { ButtonOutline } from 'rebass';
import { Flex } from 'reflexbox';

class DashboardItemControls extends Component {

  static propTypes = {
      item: PropTypes.object.isRequired,
      store: PropTypes.object
  }

  render() {
    const { item, store } = this.props;
    return (
      <Flex p={2}>
        <ButtonOutline theme="primary" mr={1} onClick={(e) => item.toggleEditItem(e)}>
          Edit
        </ButtonOutline>
        <ButtonOutline theme="error" mr={1} onClick={() => store.removeItem(item)}>
          Delete
        </ButtonOutline>
      </Flex>
    );
  }
}

export default DashboardItemControls;
