import React from 'react';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';
import { observer } from "mobx-react";

import { LoadingIndicator } from './';

/**
 * Implements the drag source contract.
 */
const dashboardItemSource = {
    beginDrag(props) {
        return {
            item: props.item,
            oldContainer: props.container
        }
    },
    endDrag(props, monitor, component) {
        // console.info('endDrag', props)
    }
};


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

const DashboardItem = (props) => {
    const { container } = props;
    const { flex, panel_title, id, loading} = props.item;
    const { isDragging, connectDragSource, connectDragPreview } = props;
    const dashboardItemClass = classNames({
        'box': true,
        'loading': loading,
        [`flex-${flex}`]: true
    });

    const controlsClass = classNames({
        'controls': true,
        'display-none': loading
    });

    const isLoading = loading ? <LoadingIndicator /> : '';

    return connectDragPreview(
        <div className={dashboardItemClass} data-id={id}>
            { isLoading }
            {connectDragSource(
                <div className="drag-handle">
                    <img alt="drag" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4yLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cG9seWdvbiBwb2ludHM9IjQ4MCwyNTYgMzg0LDE2MCAzODQsMjM2IDI3NiwyMzYgMjc2LDEyOCAzNTIsMTI4IDI1NiwzMiAxNjAsMTI4IDIzNiwxMjggMjM2LDIzNiAxMjgsMjM2IDEyOCwxNjAgMzIsMjU2IDEyOCwzNTIgDQoJMTI4LDI3NiAyMzYsMjc2IDIzNiwzODQgMTYwLDM4NCAyNTYsNDgwIDM1MiwzODQgMjc1LjgsMzg0IDI3NS40LDI3NS41IDM4NCwyNzUuOCAzODQsMzUyICIvPg0KPC9zdmc+DQo=" />
                </div>
            )}
            <h4>{panel_title} (ID: {id}) {isDragging && ` (and I am being dragged from ${container.id} now)`}</h4>
            <p>flex: {flex}</p>
            <div className={controlsClass}>
                <button className="btn btn-primary h6"
                    onClick={() => props.item.increaseFlex()}>
                    Increase Flex
                </button>
                <button className="btn red h6"
                    onClick={() => props.item.removeItem(container)}>
                    Delete
                </button>
                <button className="btn h6"
                    onClick={() => props.item.logDetails()}>
                    Log Details
                </button>
            </div>
        </div>
    );
}


// Export the wrapped component:
export default DragSource('dashboardItem', dashboardItemSource, collect)(observer(DashboardItem));
