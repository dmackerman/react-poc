import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Page, DashboardContainer, DashboardItem } from './';
import DashboardStore from '../store/DashboardStore';

const dashboardNotInContainerTarget = {
  canDrop(props, monitor) {
    return monitor.isOver({
      shallow: true
    });
  },

  // hover(props, monitor, component) {
  //   const isOver = monitor.isOver({
  //     shallow: true
  //   });
  //   console.log(isOver);
  // },

  // if this is the case, we have to create a new container.
  drop(props, monitor, component) {
    const { item, oldContainer } = monitor.getItem();
    const newContainer = DashboardStore.createContainer();
    newContainer.moveItem(item, oldContainer);
  }
};

@DropTarget('dashboardItem', dashboardNotInContainerTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver(),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
}))
@observer
class Dashboard extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.renderContainer = this.renderContainer.bind(this);
  }

  renderContainer(container) {
    return (
      <DashboardContainer key={container.id} store={DashboardStore} container={container}>
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
          item={child} />
        );
    });
  }

  render() {
    const { connectDropTarget } = this.props;
    return (connectDropTarget(
      <div>
        <Page>
          {DashboardStore.data.values().map((val, key, map) => {
             return this.renderContainer(val);
           })}
        </Page>
      </div>
    ));
  }

}

export default DragDropContext(HTML5Backend)(observer(Dashboard));
