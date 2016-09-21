import 'lodash';
import React, { Component } from 'react';
import data from './data/dashboard.json';

import { DashboardContainer, DashboardItem, DashboardToolbar } from './components';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
          data: data,
          editting: false
      };
      this.renderContainer = this.renderContainer.bind(this);
    }

    // simple demonstration of toggling stuff.
    toggleContainerLayout(container) {
        container.layout = container.layout === 'row' ? 'column' : 'row';
        this.setState({
            data: this.state.data
        })
    }

    renderContainer(container) {
        var toggleContainerLayout = this.toggleContainerLayout.bind(this, container);
        return (
            <DashboardContainer key={container.id} {...container } toggleContainerLayout={toggleContainerLayout}>
                {this.renderChildren(container.children)}
            </DashboardContainer>
        );
    }

    renderChildren(children) {
        return children.map(child => {
            if (child.children) {
                return this.renderContainer(child)
            }
            return <DashboardItem key={child.id} {...child} />
        });
    }

    render() {
        const layout = this.state.data.map(this.renderContainer);

        return (
            <div>
                <DashboardToolbar />
                <div className="page">
                    {layout}
                </div>
            </div>
        );
    }
}

export default App;
