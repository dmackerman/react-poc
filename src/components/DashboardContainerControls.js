import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Flex } from 'reflexbox';
import { Button } from 'rebass';

const style = {
  position: 'absolute',
  left: '0px',
  top: '0px',
  width: '100%',
  zIndex: '999',
  background: "#eee"
};

const disabledButton = {
  opacity: '0.5',
  pointerEvents: 'none'
};

@observer
class DashboardContainerControls extends Component {
  static propTypes = {
    container: PropTypes.object.isRequired
  }

  render() {
    const { container } = this.props;
    const otherLayout = container.layout === 'row' ? 'Column' : 'Row';
    // console.log(container.width);
    return (
      <div style={style}>
        <Flex align="center">
          <Button ml={1} theme="primary" onClick={() => container.toggleLayout()}>
            Switch to {otherLayout}
          </Button>
          <Button ml={1} theme="error" onClick={() => container.removeContainer()}>
            Delete
          </Button>
          <Button style={container.width === 100 ? disabledButton : {}} ml={1} rounded="left" theme="secondary" onClick={() => container.increaseWidth()}>
            Width +
          </Button>
          <Button style={container.width === 10 ? disabledButton : {}} rounded="right" theme="secondary" onClick={() => container.decreaseWidth()}>
            Width -
          </Button>
          <Button style={container.height === 900 ? disabledButton : {}} ml={1} rounded="left" theme="secondary" onClick={() => container.increaseHeight()}>
            Height +
          </Button>
          <Button style={container.height === 100 ? disabledButton : {}} rounded="right" theme="secondary" onClick={() => container.decreaseHeight()}>
            Height -
          </Button>
        </Flex>
      </div>
      );
  }
}

export default DashboardContainerControls;
