import React, { Component, PropTypes } from 'react';
import { injectSheet } from '../utils/jss';

const styles = {
  page: {
    display: ' flex',
    flexDirection: ' row',
    flexWrap: ' wrap',
    overflowY: ' auto',
    height: ' calc(100vh)',
    paddingTop: ' 85px',
    flexShrink: ' 0',
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
