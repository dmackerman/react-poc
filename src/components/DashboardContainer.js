import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { injectSheet } from '../utils/jss';
import { DropTarget } from 'react-dnd';
import { observer } from 'mobx-react';
import ItemPlaceholder from './ItemPlaceholder';
import DashboardContainerControls from './DashboardContainerControls';

const X_THRESHOLD = 100;

const dashboardContainerTarget = {
  canDrop(props, monitor) {
    return true;
  },

  hover(props, monitor, component) {
    let dropX;
    let dropY;

    const containerBoundingRect = findDOMNode(component).getBoundingClientRect();

    const containerMiddleX = Math.round(containerBoundingRect.width / 2);
    const containerMiddleY = (containerBoundingRect.bottom - containerBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    if ( (clientOffset.y >= containerMiddleY) ) {
      dropY = 'bottom';
    } else {
      dropY = 'top';
    }

    // in the middle
    if ((clientOffset.x >= containerMiddleX - X_THRESHOLD) && (clientOffset.x <= containerMiddleX + X_THRESHOLD)) {
      dropX = 'middle';
    }

    // left side?
    if (clientOffset.x <= (containerMiddleX - X_THRESHOLD)) {
      dropX = 'left';
    }

    // right
    if (clientOffset.x > (containerMiddleX + X_THRESHOLD)) {
      dropX = 'right';
    }

    console.log(dropX, dropY);
  },

  drop(props, monitor, component) {
    const { container } = props;
    const { item, oldContainer } = monitor.getItem();

    if (monitor.didDrop()) {
      return;
    }

    if (container.existsInContainer(item)) {
      container.moveItem(item);
    } else {
      container.moveItem(item, oldContainer);
    }

  }
};

const containerWidths = {};
const containerHeights = {};

[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].forEach(num => {
  containerWidths[[`width-${num}`]] = {
    width: `${num}%`
  };
});

[100, 200, 300, 400, 500, 600, 700, 800, 900].forEach(height => {
  containerHeights[[`height-${height}`]] = {
    height: `${height}px`
  };
});

const styles = {
  container: {
    display: 'flex',
    position: 'relative',
    border: '2px dashed transparent',
    borderRadius: '5px',
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
  editting: {
    borderColor: '#ccc',
    margin: '25px 0',
    padding: '25px 0 0 0'
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
@observer
class DashboardContainer extends React.Component {

  static propTypes = {
    container: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired,
    children: PropTypes.node,
    isOver: PropTypes.bool,
    connectDropTarget: PropTypes.func
  }

  render() {
    const { container, store, children, sheet } = this.props;
    const { classes } = sheet;
    const { isOver, connectDropTarget } = this.props;

    const containerClass = classNames({
      [classes.container]: true,
      [classes[`height-${container.height}`]]: true,
      [classes[`width-${container.width}`]]: true,
      [classes.column]: container.layout === 'column',
      [classes.editting]: store.editting
    });

    return connectDropTarget(
      <div className={containerClass}>
        {store.editting ? <DashboardContainerControls container={container} /> : ''}
        {children}
        {isOver ? <ItemPlaceholder data={container.placeholder} /> : ''}
      </div>
    );
  }
}


export default DashboardContainer;
