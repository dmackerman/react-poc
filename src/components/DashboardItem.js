import React from 'react';
import classNames from 'classnames';
// import { DragSource } from 'react-dnd';
import {observer} from "mobx-react";

// /**
//  * Implements the drag source contract.
//  */
// const cardSource = {
//     beginDrag(props) {
//         return { ...props }
//     },
//     endDrag(props, monitor, component) {
//         console.info('endDrag', props)
//     }
// };
//
// /**
//  * Specifies the props to inject into your component.
//  */
// function collect(connect, monitor) {
//   return {
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging()
//   };
// }

const DashboardItem = ({ item, store }) => {
    console.log(item);
    const { flex, panel_title, id } = item;
    // const { isDragging, connectDragSource } = props;
    const boxClass = classNames({
        'box': true,
        [`flex-${flex}`]: true
    });

    return (
        <div className={boxClass} data-id={id}>
            {/* <h4>{panel_title} {isDragging && ` (and I am being dragged from ${containerId} now)`}</h4> */}
            <h4>{panel_title}</h4>
            <div className="controls">
                <button onClick={() => item.increaseFlex()}>Increase Flex</button>
            </div>
        </div>
    );
}

// DashboardItem.propTypes = {
//   id: PropTypes.number.isRequired,
//
//   // Injected by React DnD:
//   isDragging: PropTypes.bool.isRequired,
//   connectDragSource: PropTypes.func.isRequired
// };

// Export the wrapped component:
// export default DragSource('dashboardItem', cardSource, collect)(observer(DashboardItem));
export default observer(DashboardItem);
