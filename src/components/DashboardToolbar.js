import React, { PropTypes } from 'react';
import { observer } from "mobx-react";
import { Link } from 'react-router';
import { injectSheet } from '../utils/jss';
import { Flex } from 'reflexbox';
import { Button, ButtonOutline, Space, Checkbox } from 'rebass';
// import Icon from 'react-geomicons';

const style = {
  toolbar: {
    position: 'fixed',
    top: '0',
    right: '0',
    left: '0',
    background: '#383944',
    color: '#fff',
    padding: '20px',
    zIndex: '9999'
  }
};

const DashboardToolbar = ({ store, sheet }) => {
  const { editing } = store;
  const { classes } = sheet;
  const editText = editing ? 'Done Editing' : 'Enter Edit Mode';

  return (
    <div className={classes.toolbar}>
      <Flex align="baseline">
        <Link to="/">
          <Button backgroundColor="transparent" color="white" mx={1}>
            Dashboard
          </Button>
        </Link>
        <Button
          mx={1}
          theme="success"
          color="white"
          onClick={() => store.addNewItem()}>
          Add New Item
        </Button>
        <Button
          mx={1}
          theme={editing ? 'success' : 'secondary'}
          color="white"
          onClick={() => store.toggleEditMode()}>
          {editText}
        </Button>
        { editing && <Checkbox
          mx={1}
          label="Compact Layout Vertically?"
          name="compact_vertically"
          theme="success"
          checked={store.verticalCompact}
          value={store.verticalCompact}
          onChange={() => store.toggleVerticalCompact()}
        />}

        <Space auto />
        <ButtonOutline mx={1} color="white" onClick={() => store.logStoreData()}>
          Log Serialized Data
        </ButtonOutline>
        <ButtonOutline mx={1} color="white" onClick={() => store.resetToDefaultData()}>
          Restore Default Data
        </ButtonOutline>
        <Space auto />
        <Link to="/about">
          <Button mx={1} color="white">
            About
          </Button>
        </Link>
      </Flex>
    </div>
    );
};

DashboardToolbar.propTypes = {
  store: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired
};

export default injectSheet(style)(observer(DashboardToolbar));
