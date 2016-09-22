import React from 'react';
import { observer } from "mobx-react";

const DashboardToolbar = ({ store }) => {
    console.log(store);
    return (
        <div className="toolbar">
            I am toolbar
            Are we editting? {store.editting ? 'YES': 'NO' }
        </div>
    );
}

export default observer(DashboardToolbar);
