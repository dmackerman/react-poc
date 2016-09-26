import { observable, action, when, toJS } from 'mobx';
import { random } from 'lodash';
import uuid from 'uuid-v4';

class Item {
  @observable flex;
  @observable height;
  @observable panel_title;
  @observable loading = true;
  @observable order;
  @observable added = false;
  @observable removed = false;

  constructor(json) {
    this.type = 'item';
    this.id = json.id || uuid();
    this.flex = json.flex;
    this.height = json.height;
    this.panel_title = json.panel_title;
    this.order = json.order;

    when(
        () => this.added,
        () => this.clearAddedFlag()
    );

    setTimeout(() => {
        this.loading = false;
    }, random(500, 2000))

  }

  clearAddedFlag() {
      setTimeout(() => {
        this.added = false;
      }, 500);
  }

  @action increaseHeight() {

  }

  @action increaseFlex() {
    this.flex++;
  }

  @action removeItem(container) {
    this.removed = true;
    container.removeItem(this);
  }

  @action logDetails(e) {
    console.log(toJS(this));
  }
}

export default Item;
