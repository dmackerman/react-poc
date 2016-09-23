import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DashboardContainer, DashboardItem } from './';
import DashboardStore from '../store/DashboardStore';

class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.renderContainer = this.renderContainer.bind(this);
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
        const children = container.children.values();
        return children.map(child => {
            if (child.children) {
                return this.renderContainer(child);
            }
            return (
                <DashboardItem
                    key={child.id}
                    store={DashboardStore}
                    container={container}
                    item={child}
                />
            )
        });
    }

    render() {
        return (
            <div className="page">
                {DashboardStore.data.values().map((val, key, map) => {
                    return this.renderContainer(val);
                })}
            </div>
        )
    }

}

export default DragDropContext(HTML5Backend)(observer(Dashboard));
