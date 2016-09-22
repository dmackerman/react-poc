import React from 'react';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';
import {observer} from "mobx-react";

/**
 * Implements the drag source contract.
 */
const cardSource = {
    beginDrag(props) {
        return { ...props.item }
    },
    endDrag(props, monitor, component) {
        console.info('endDrag', props)
    }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const DashboardItem = (props) => {
    const { container } = props;
    const { flex, panel_title, id } = props.item;
    const { isDragging, connectDragSource } = props;
    const boxClass = classNames({
        'box': true,
        [`flex-${flex}`]: true
    });

    return connectDragSource(
        <div className={boxClass} data-id={id}>
            <h4>{panel_title} {isDragging && ` (and I am being dragged from ${container.id} now)`}</h4>
            <div className="controls">
                <button onClick={() => props.item.increaseFlex()}>Increase Flex</button>
            </div>
        </div>
    );
}


// Export the wrapped component:
export default DragSource('dashboardItem', cardSource, collect)(observer(DashboardItem));
