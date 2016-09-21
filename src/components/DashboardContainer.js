import React from 'react';
import classNames from 'classnames';

const DashboardContainer = (props) => {
    const { layout, children, flex, toggleContainerLayout } = props;
    const containerClass = classNames({
        'container': true,
        [`flex-${flex}`]: flex,
        'column': layout === 'column'
    });

    return (
        <div className={containerClass}>
            <button className="container-toggle" onClick={toggleContainerLayout}>Toggle Layout</button>
            {children}
        </div>
    )
}

export default DashboardContainer;
