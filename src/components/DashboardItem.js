import React from 'react';
import classNames from 'classnames';

const DashboardItem = (props) => {
    const { flex, panel_title } = props;
    const boxClass = classNames({
        'box': true,
        [`flex-${flex}`]: true
    });

    return (
        <div className={boxClass}>
            <h4>{panel_title}</h4>
        </div>
    );
}

export default DashboardItem;
