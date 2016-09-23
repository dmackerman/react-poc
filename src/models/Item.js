import { observable, action, toJS } from 'mobx';
import { random } from 'lodash';
import uuid from 'uuid-v4';

class Item {
  @observable flex;
  @observable panel_title;
  @observable loading = true;

  constructor(json) {
    this.type = 'item';
    this.id = json.id || uuid();
    this.flex = json.flex;
    this.panel_title = json.panel_title;

    setTimeout(() => {
        this.loading = false;
    }, random(1000, 3000))

  }

  @action increaseFlex() {
    this.flex++;
  }

  @action removeItem(container) {
    container.removeItem(this.id);
  }

  @action logDetails(e) {
    console.log(toJS(this));
  }
}

export default Item;
