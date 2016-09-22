import _ from 'lodash';
import React, { Component } from 'react';
import { observer } from 'mobx-react';

// import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import { DashboardContainer, DashboardItem, DashboardToolbar } from './components';
import DashboardStore from './store/DashboardStore';

class App extends Component {
    constructor(props) {
      super(props);
      this.renderContainer = this.renderContainer.bind(this);
    }

    componentDidMount() {
        DashboardStore.loadData();
    }

    renderContainer(container) {
        return (
            <DashboardContainer
                key={container.id}
                store={DashboardStore}
                container={container}>
                    {this.renderChildren(container)}
            </DashboardContainer>
        );
    }

    renderChildren(container) {
        return container.children.map(child => {
            if (child.children) {
                return this.renderContainer(child)
            }
            return (
                <DashboardItem
                    key={child.id}
                    store={DashboardStore}
                    item={child}
                />
            )
        });
    }

    render() {
        const layout = DashboardStore.data.map(this.renderContainer);
        console.log(layout);

        return (
            <div>
                <DashboardToolbar store={DashboardStore} />
                <div className="page">
                    {layout}
                </div>
            </div>
        );
    }
}

// export default DragDropContext(HTML5Backend)(App);
export default observer(App);
