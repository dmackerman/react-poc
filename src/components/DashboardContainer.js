import React from 'react';
import classNames from 'classnames';
import { injectSheet } from '../utils/jss';
import { DropTarget } from 'react-dnd';
import { observer } from "mobx-react";
import ItemPlaceholder from  './ItemPlaceholder';

const dashboardContainerTarget = {
  canDrop(props, monitor) {
    return true;
  },

  drop(props, monitor, component) {
    const { container } = props;
    const { item, oldContainer } = monitor.getItem();

    if (monitor.didDrop()) {
      return;
    }

    if (container.existsInContainer(item)) {
        container.moveItem(item);
    }
    else {
        container.moveItem(item, oldContainer);
    }

  }
};

const containerWidths = {};
const containerHeights = {};

[25, 50, 75, 100].forEach(num => {
    containerWidths[[`width-${num}`]] = { width: `${num}%` };
});

[200, 300, 400, 500, 600].forEach(height => {
    containerHeights[[`height-${height}`]] = { minHeight: `${height}px` };
})

const styles = {
    container: {
        display: 'flex',
        border: '2px dashed transparent',
        borderRadius: '5px',
        position: 'relative',
        transition: 'all 2.s ease',
        width: '100%',
        flexDirection: 'row',
        '&:hover': {
          borderColor: '#ccc'
        }
    },
    toggleBtn: {
        position: 'absolute',
        height: '20px',
        top: '-10px',
        right: '0'
    },
    column: {
        flexDirection: 'column'
    },
    ...containerWidths,
    ...containerHeights
};

@DropTarget('dashboardItem', dashboardContainerTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
}))
@injectSheet(styles)
@observer class DashboardContainer extends React.Component {
    render() {
        const { container, children, sheet: {classes} } = this.props;
        const { isOver, connectDropTarget } = this.props;

        const containerClass = classNames({
          [classes.container]: true,
          [classes[`height-${container.height}`]]: true,
          [classes[`width-${container.width}`]]: true,
          [classes.column]: container.layout === 'column'
        });

        return connectDropTarget(
          <div className={containerClass}>
              <button style={styles.toggleBtn} onClick={() => container.toggleLayout()}>
                  Toggle Layout
              </button>
              { children }
              { isOver ? <ItemPlaceholder data={container.placeholder} /> : '' }
          </div>
        )
    }
}


export default DashboardContainer;
