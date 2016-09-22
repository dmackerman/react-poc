import React from 'react';
import { observer } from "mobx-react";
import { Link } from 'react-router'

const DashboardToolbar = ({ store }) => {
    console.log(store);
    return (
        <div className="toolbar">
            <Link className="btn" to="/">Dashboard</Link>
            <Link className="btn" to="/about">About</Link>
        </div>
    );
}

export default observer(DashboardToolbar);
