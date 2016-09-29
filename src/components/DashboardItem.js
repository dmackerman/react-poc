import React, { Component, PropTypes } from 'react';
import { injectSheet } from '../utils/jss';
import classNames from 'classnames';
import { observer } from "mobx-react";
import { Flex } from 'reflexbox';
import { Space, Toolbar, NavItem, Button, DropdownMenu, Dropdown, Arrow } from 'rebass';
import { LoadingIndicator } from './';
import { DashboardItemControls } from './';
// import EditItemModal from './modal/EditItemModal';

export const dashboardItemStyles = {
  item: {
    height: '100%'
  },
};

@injectSheet(dashboardItemStyles)
@observer
export class DashboardItem extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    sheet: PropTypes.object,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      loading: PropTypes.bool.isRequired,
      panel_title: PropTypes.string.isRequired,
      toggleEditMenu: PropTypes.func,
      showEditMenu: PropTypes.bool
    }),
    editting: PropTypes.bool,
    classes: PropTypes.object
  }

  render() {
    const { store } = this.props;
    const { editting } = this.props.store;
    const { classes } = this.props.sheet;
    const { item } = this.props;
    const { panel_title, id, loading, showEditMenu } = this.props.item;

    const dashboardItemClass = classNames({
      [classes.item]: true,
    });

    const isLoading = loading ? <LoadingIndicator /> : '';
    const itemControls = editting ? <DashboardItemControls item={this.props.item} store={store} /> : '';

    return (
      <div className={dashboardItemClass}>
        <Flex flexColumn flexAuto style={{ height: '100%' }} data-panel-id={id}>
          {isLoading}
          <Toolbar backgroundColor="transparent" color="black">
            <NavItem is="h1" color="blue" style={{ fontSize: 16 }}>
              {panel_title || 'Unnamed Panel'}
            </NavItem>
            <Space auto x={1} />
            <Dropdown>
              <Button
                onClick={() => this.props.item.toggleEditMenu()}
                backgroundColor="transparent"
                color="gray">
                  Settings
                <Arrow direction="down" />
              </Button>
              <DropdownMenu open={showEditMenu} onDismiss={() => this.props.item.toggleEditMenu()}>
                <NavItem is="a" theme="primary" onClick={(e) => item.toggleEditItem(e)}>
                  Edit
                </NavItem>
                <NavItem is="a" theme="error" onClick={() => store.removeItem(item)}>
                  Delete
                </NavItem>
              </DropdownMenu>
            </Dropdown>
          </Toolbar>
          <Space auto />
          {itemControls}
        </Flex>
      </div>
      );
  }
}
