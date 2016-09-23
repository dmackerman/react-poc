import React from 'react';
import { observer } from 'mobx-react'

const ItemPlaceholder = (props) => {
    const style = {
        order: props.data.order
    };
    // console.log(props.data);
    return (
        <div className='box placeholder' style={style}>
            {/* <h4>Placeholder</h4> */}
            Order: {props.data.order}
        </div>
    );
}

export default observer(ItemPlaceholder);
