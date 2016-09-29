import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Page, DashboardItem } from './';
import DashboardStore from '../store/DashboardStore';

// import ReactGridLayout from 'react-grid-layout';
// const ResponsiveReactGridLayout = WidthProvider(ReactGridLayout);
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

@observer
class Dashboard extends Component {

  static defaultProps = {
      className: "layout",
      // cols: 12,
      rowHeight: 100,
      // cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      cols: { lg: 12 },
      breakpoints: { lg: 1200 }
  }

  onLayoutChange(layout) {
    DashboardStore.saveLayout(layout);
  }

  render() {
    const itemLayout = DashboardStore.data.values().map((val, key, map) => {
      return val.layout;
    });

    // @TODO maybe figure out real responsive layouts?
    const layouts = { 'lg': itemLayout };

    console.log('layout', layouts);

    const items = DashboardStore.data.values().map((val, index) => {
      const itemId = val.id;
      return (
        <div key={itemId}>
          <DashboardItem store={DashboardStore} item={val} />
        </div>
      );
    });

    return (
      <div>
        <Page>
          {/* <EditItemModal open={isEditting} item={this.props.item} toggle={() => this.props.item.toggleEditItem()} /> */}
          <ResponsiveReactGridLayout
            {...this.props}
            layouts={layouts}
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
