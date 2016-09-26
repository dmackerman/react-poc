import React from 'react';
import { observer } from "mobx-react";
import { Link } from 'react-router'
import { injectSheet } from '../utils/jss';
import { Flex } from 'reflexbox'
import { Button, ButtonOutline, Space, Dropdown, DropdownMenu, Arrow, NavItem } from 'rebass'

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
                    <Button color="white" mx={1}>Dashboard</Button>
                </Link>
                <Button
                    mx={1}
                    backgroundColor={editting ? "primary" : 'green' }
                    color="white"
                    onClick={() => store.toggleEditMode()}>
                    {editText}
                </Button>
                <ButtonOutline
                    mx={1}
                    color="white"
                    onClick={() => store.logStoreData()}>
                    Log Serialized Data
                </ButtonOutline>
                <Space auto></Space>
                <Dropdown>
                  <Button
                    backgroundColor="primary"
                    color="white"
                    inverted
                    rounded
                  >
                    Dropdown
                    <Arrow direction="down" />
                  </Button>
                  <DropdownMenu onDismiss={function noRefCheck() {}}>
                    <NavItem is="a">
                      Hello
                    </NavItem>
                    <NavItem is="a">
                      Hi
                    </NavItem>
                  </DropdownMenu>
                </Dropdown>
                <Link to="/about">
                    <Button
                        mx={1}
                        color="white"
                        onClick={() => store.logStoreData()}>
                        About
                    </Button>
                </Link>
            </Flex>
        </div>
    );
}

export default injectSheet(style)(observer(DashboardToolbar));
