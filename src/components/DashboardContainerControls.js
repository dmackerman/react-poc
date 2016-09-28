import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Flex } from 'reflexbox';
import { Button } from 'rebass';

const style = {
  position: 'absolute',
  right: '10px',
  top: '-20px',
  width: '100%'
};

@observer
class DashboardContainerControls extends Component {
  render() {
    const { container } = this.props;
    return (
      <div style={style}>
        <Flex align="center" justify="flex-end">
          <Button ml={1} theme="primary" onClick={() => container.toggleLayout()}>
            Toggle Layout
          </Button>
          <Button ml={1} theme="error" onClick={() => container.removeContainer()}>
            Delete
          </Button>
          <Button ml={1} theme="secondary" onClick={() => container.increaseWidth()}>
            Width +
          </Button>
          <Button ml={1} theme="secondary" onClick={() => container.decreaseWidth()}>
            Width -
          </Button>
          <Button ml={1} theme="secondary" onClick={() => container.increaseHeight()}>
            Height +
          </Button>
          <Button ml={1} theme="secondary" onClick={() => container.decreaseHeight()}>
            Height -
          </Button>
        </Flex>
      </div>
      );
  }
}

export default DashboardContainerControls;
