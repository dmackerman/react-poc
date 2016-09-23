import React from 'react';
import { observer } from "mobx-react";
import { Link } from 'react-router'
import classNames from 'classnames';

const DashboardToolbar = ({ store }) => {
    const { editting } = store;
    const editModeButtonClass = classNames({
        'btn': true,
        'btn-primary': !editting,
        'btn-primary bg-green': editting
    })
    const editText = store.editting ? 'Done Editting' : 'Enter Edit Mode';

    return (
        <div className="toolbar flex">
            <Link className="btn" to="/">Dashboard</Link>
            <button className={editModeButtonClass}
                onClick={() => store.toggleEditMode()}>{editText}</button>
            <div className="flex-auto"></div>
            <button className="btn"
                onClick={() => store.logStoreData()}>Log Serialized Data
            </button>
            <Link className="btn" to="/about">About</Link>
        </div>
    );
}

export default observer(DashboardToolbar);
