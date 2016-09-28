import React, { Component } from 'react';
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
  render() {
    const { sheet:{ classes }, children } = this.props;
    return (
      <div className={classes.page}>
        {children}
      </div>
      );
  }
}

export default Page;
