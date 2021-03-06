import React, { PropTypes } from 'react';
import { Overlay, Panel, PanelHeader, PanelFooter, Button, Close, Space } from 'rebass';

import ItemEditForm from '../forms/ItemEditForm';

const EditItemModal = ({ open, item, toggle }) => {
  return (
    <Overlay open={open}>
      <Panel theme="primary">
        <PanelHeader>
          Edit Item
          <Space auto />
          <Close onClick={toggle} />
        </PanelHeader>
        <ItemEditForm item={item} />
        <PanelFooter>
          <Space auto />
          <Button rounded mr={1} theme="primary">
            Save Changes
          </Button>
          <Button rounded backgroundColor="gray">
            Cancel
          </Button>
        </PanelFooter>
      </Panel>
    </Overlay>
    );
};

EditItemModal.propTypes = {
  open: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
};

export default EditItemModal;
