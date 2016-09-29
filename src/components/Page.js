import React, { Component, PropTypes } from 'react';
import { injectSheet } from '../utils/jss';

const styles = {
  page: {
    paddingTop: ' 85px',
  }
};

@injectSheet(styles)
class Page extends Component {

  static propTypes = {
    children: PropTypes.node,
    sheet: PropTypes.shape({
      classes: PropTypes.object
    })
  }

  render() {
    const { children } = this.props;
    const { classes } = this.props.sheet;

    return (
      <div className={classes.page}>
        {children}
      </div>
      );
  }
}

export default Page;
