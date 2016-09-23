import { observable, action, toJS } from 'mobx';
import uuid from 'uuid-v4';

class ItemPlaceholder {
  @observable flex;
  @observable order = 0;
  @observable visible = false;

  constructor(position) {
    this.type = 'placeholder';
    this.id = uuid();
  }
}

export default ItemPlaceholder;
