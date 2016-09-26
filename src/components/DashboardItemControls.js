import React, { Component } from 'react';
import { Button } from 'rebass'

class DashboardItemControls extends Component {
    render() {
        const { item, container } = this.props;
        return (
            <div className="controls">
                <Button
                    onClick={() => item.increaseFlex()}>
                    Increase Flex
                </Button>
                <Button
                    onClick={() => item.removeItem(container)}>
                    Delete
                </Button>
                <Button
                    onClick={() => item.logDetails()}>
                    Log Details
                </Button>
            </div>
        )
    }
}

export default DashboardItemControls;
