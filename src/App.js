import _ from 'lodash';
import React, { Component } from 'react';
import data from './data/dashboard.json';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DashboardContainer, DashboardItem, DashboardToolbar } from './components';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
          data: data,
          editting: false
      };
      this.renderContainer = this.renderContainer.bind(this);
      this.moveItem = this.moveItem.bind(this);
    }

    // simple demonstration of toggling stuff.
    toggleContainerLayout(container) {
        container.layout = container.layout === 'row' ? 'column' : 'row';
        this.setState({
            data: this.state.data
        })
    }

    toggleFlex(item) {
        if (item.flex < 6) {
            item.flex++
        }
        this.setState({
            data: this.state.data
        })
    }

    moveItem(item, container) {
        console.log(item);

        const { data } = this.state;

        const dropContainer = _.find(data, { id: container.id });
        dropContainer.children.push(item);

        console.log(dropContainer);

        // const draggedItem = _.find(data, { id: item.id });
        // console.log(draggedItem);

        //    this.setState(update(this.state, {
        //      cards: {
        //        $splice: [
        //          [dragIndex, 1],
        //          [hoverIndex, 0, dragCard]
        //        ]
        //      }
        //    }));
        //
        // console.log(item, container);
    }

    renderContainer(container) {
        var toggleContainerLayout = this.toggleContainerLayout.bind(this, container);
        var toggleContainerFlex = this.toggleFlex.bind(this, container);
        return (
            <DashboardContainer key={container.id} {...container }
                toggleContainerLayout={toggleContainerLayout}
                toggleContainerFlex={toggleContainerFlex}
                moveItem={this.moveItem}>
                {this.renderChildren(container)}
            </DashboardContainer>
        );
    }

    renderChildren(container) {
        return container.children.map(child => {
            var toggleItemFlex = this.toggleFlex.bind(this, child);
            if (child.children) {
                return this.renderContainer(child)
            }
            return (
                <DashboardItem
                    key={child.id}
                    containerId={container.id}
                    toggleItemFlex={toggleItemFlex}
                    {...child}
                />
            )
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

export default DragDropContext(HTML5Backend)(App);
