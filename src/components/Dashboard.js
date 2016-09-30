import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Page, DashboardItem } from './';
import DashboardStore from '../store/DashboardStore';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

@observer
class Dashboard extends Component {

  static defaultProps = {
      className: "layout",
      rowHeight: 100,
      cols: { lg: 12 },
      breakpoints: { lg: 1200 },
      verticalCompact: false
  }

  onLayoutChange(layout) {
    DashboardStore.saveLayout(layout);
  }

  render() {
    console.log(this);
    const itemLayout = DashboardStore.data.values().map((val, key, map) => {
      return val.layout;
    });

    // @TODO maybe figure out real responsive layouts?
    const layouts = { 'lg': itemLayout };
    const items = DashboardStore.data.values().map((val, index) => {
      const itemId = val.id;
      return (
        <div key={itemId}>
          <DashboardItem store={DashboardStore} item={val} />
        </div>
      );
    });

    const { isDraggable, isResizable, verticalCompact } = DashboardStore;

    return (
      <div>
        <Page>
          {/* <EditItemModal open={isEditing} item={this.props.item} toggle={() => this.props.item.toggleEditItem()} /> */}
          <ResponsiveReactGridLayout
            {...this.props}
            layouts={layouts}
            isDraggable={isDraggable}
            isResizable={isResizable}
            verticalCompact={verticalCompact}
            onDragStart={this.onDragStart}
            onLayoutChange={this.onLayoutChange}>
            {items}
          </ResponsiveReactGridLayout>
        </Page>
      </div>
      );
  }

}

export default Dashboard;
