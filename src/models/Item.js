import { observable, action, computed, toJS } from 'mobx';
import { random } from 'lodash';
import uuid from 'uuid-v4';

class Item {
  @observable panel_title;
  @observable loading = true;

  @observable x;
  @observable y;
  @observable w;
  @observable h;

  @observable isDraggable = false;
  @observable isResizable = false;
  @observable isEditting = false;
  @observable showEditMenu = false;

  constructor(json) {
    this.type = 'item';
    this.id = json.id || uuid();
    this.panel_title = json.panel_title || '';
    this.x = json.x;
    this.y = json.y;
    this.w = json.w;
    this.h = json.h;
    this.isResizable = json.isResizable;
    this.isDraggable = json.isDraggable;
    this.minH = 3;

    console.log('new item created', toJS(this));

    setTimeout(() => {
      this.loading = false;
    }, random(500, 1300));
  }

  @action toggleEditMenu() {
    this.showEditMenu = !this.showEditMenu;
  }

  @action toggleDragAndResize(value) {
    this.isResizable = !this.isResizable;
    this.isDraggable = !this.isDraggable;
  }

  @computed get layout() {
    return {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
      i: this.id.toString(),
      isDraggable: this.isDraggable,
      isResizable: this.isResizable,
      minH: this.minH
    };
  }


  @action toggleEditItem(e) {
    this.isEditting = !this.isEditting;
  }

  @action
  logDetails(e) {
    console.log(toJS(this));
  }
}

export default Item;
