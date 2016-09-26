import { observable } from 'mobx';
import uuid from 'uuid-v4';

class ItemPlaceholder {
  @observable flex;
  @observable order = 0;
  @observable visible = false;

  // duplicate of the data so we can show a preview.
  @observable item;

  constructor(position) {
    this.type = 'placeholder';
    this.id = uuid();
  }
}

export default ItemPlaceholder;
