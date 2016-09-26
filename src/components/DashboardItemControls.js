import React, { Component } from 'react';
import { Button, ButtonOutline } from 'rebass'

class DashboardItemControls extends Component {
    render() {
        const { item, container } = this.props;
        return (
            <div className="controls">
                <Button mr={1}
                    onClick={() => item.increaseFlex()}>
                    Increase Flex
                </Button>
                <ButtonOutline color="red" mr={1}
                    onClick={() => item.removeItem(container)}>
                    Delete
                </ButtonOutline>
                <ButtonOutline mr={1}
                    onClick={() => item.logDetails()}>
                    Log Details
                </ButtonOutline>
            </div>
        )
    }
}

export default DashboardItemControls;
