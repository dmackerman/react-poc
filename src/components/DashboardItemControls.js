import React, { Component } from 'react';

class DashboardItemControls extends Component {
    render() {
        const { item, container } = this.props;
        return (
            <div className="controls">
                <button className="btn btn-primary h6"
                    onClick={() => item.increaseFlex()}>
                    Increase Flex
                </button>
                <button className="btn red h6"
                    onClick={() => item.removeItem(container)}>
                    Delete
                </button>
                <button className="btn h6"
                    onClick={() => item.logDetails()}>
                    Log Details
                </button>
            </div>
        )
    }
}

export default DashboardItemControls;
