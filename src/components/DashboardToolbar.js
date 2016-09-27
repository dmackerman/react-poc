import React from 'react';
import { observer } from "mobx-react";
import { Link } from 'react-router'
import { injectSheet } from '../utils/jss';
import { Flex } from 'reflexbox'
import { Button, ButtonOutline, Space } from 'rebass'
import Icon from 'react-geomicons';

const style = {
    toolbar: {
        position: 'fixed',
        top: '0',
        right: '0',
        left: '0',
        background: '#383944',
        color: '#fff',
        padding: '20px'
    }
};

const DashboardToolbar = ({ store, sheet: {classes} }) => {
    const { editting } = store;
    const editText = editting ? 'Done Editting' : 'Enter Edit Mode';

    return (
        <div className={classes.toolbar}>
            <Flex align="center">
                <Link to="/">
                    <Button backgroundColor="transparent" color="white" mx={1}>Dashboard</Button>
                </Link>
                <Button
                    mx={1}
                    theme={editting ? 'success' : 'secondary' }
                    color="white"
                    onClick={() => store.toggleEditMode()}>
                    <Icon name={editting ? 'check' : 'compose'} />
                    {editText}
                </Button>
                <Space px={2} />
                <ButtonOutline
                    mx={1}
                    color="white"
                    onClick={() => store.logStoreData()}>
                    Log Serialized Data
                </ButtonOutline>
                <ButtonOutline
                    mx={1}
                    color="white"
                    onClick={() => store.resetToDefaultData()}>
                    Restore Default Data
                </ButtonOutline>
                <Space auto></Space>
                <Link to="/about">
                    <Button
                        mx={1}
                        color="white">
                        About
                    </Button>
                </Link>
            </Flex>
        </div>
    );
}

export default injectSheet(style)(observer(DashboardToolbar));
