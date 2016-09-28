import React, { Component, PropTypes } from 'react';
import { Grid } from 'reflexbox';
import KentikInput from './KentikInput';
import { observer } from 'mobx-react';

@observer
class ItemEditForm extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(name, value) {
    this.updateProperty(name, value);
  }

  updateProperty = (key, value) => {
    this.props.item[key] = value;
  }

  render() {
    const { item } = this.props;
    return (
      <div>
        <form>
          <Grid col={12} px={1}>
            <KentikInput
              type="text"
              placeholder="Panel Title"
              name="panel_title"
              value={item.panel_title}
              onChange={this.onChange} />
          </Grid>
          <Grid col={6} px={1}>
            <KentikInput
              type="number"
              placeholder="Flex"
              name="flex"
              value={item.flex}
              onChange={this.onChange} />
          </Grid>
          <Grid col={6} px={1}>
            <KentikInput
              type="number"
              placeholder="Order"
              name="order"
              value={item.order}
              onChange={this.onChange} />
          </Grid>
        </form>
      </div>
      );
  }
}

export default ItemEditForm;
