import React from 'react'
import { Overlay, Panel, PanelHeader, PanelFooter, Button, Close, Space, Input} from 'rebass';

import ItemEditForm from '../forms/ItemEditForm';

const EditItemModal = ({open, item, toggle}) => {
  return (
    <Overlay open={open}>
          <Panel theme='primary'>
              <PanelHeader>
                  Edit Item
                  <Space auto />
                  <Close onClick={toggle} />
              </PanelHeader>
            <ItemEditForm item={item} />
          <PanelFooter>
            <Space auto />
            <Button rounded mr={1} theme='primary'>Save Changes</Button>
            <Button rounded backgroundColor="gray">Cancel</Button>
          </PanelFooter>
        </Panel>
      </Overlay>
  )
}

export default EditItemModal
