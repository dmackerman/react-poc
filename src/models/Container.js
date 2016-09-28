import { observable, computed, action, map, toJS } from 'mobx';
import Item from './Item';
import ItemPlaceholder from './ItemPlaceholder';

// @TODO
// - when a child containers height is greather than it's parent, make them equal

class Container {
  @observable height;
  @observable width;
  @observable children;
  @observable layout;
  @observable placeholder;
  @observable itemDropPosition;
  @observable parent;

  constructor(data = {}, store) {

    // since our data structure is a hash, Mobx needs to use Maps to
    // identify when new Objects are added or removed.
    // https://mobxjs.github.io/mobx/refguide/map.html
    const children = map();
    let childrenIds;

    if (data.children) {
      childrenIds = Object.keys(data.children);
      console.log(childrenIds);
      childrenIds.forEach(childId => {
        let child = data.children[childId];
        if (child.children) {
          let nestedContainer = new Container(child);
          children.set(childId, nestedContainer);
        } else {
          children.set(childId, new Item(child));
        }

      });
    }

    this.type = 'container';
    this.id = data.id || Date.now();
    this.height = data.height || 400;
    this.width = data.width || 100;
    this.children = children;
    this.layout = data.layout || 'row';
    this.parent = data.parent || null;

    // our store
    this.store = store;

    // each Container will have a placeholder component which renders where items
    // will be dropped.
    this.placeholder = new ItemPlaceholder();

  // simple reaction to when our container has no items, remove it.
  // when(
  //   () => this.numChildren === 0,
  //   () => this.removeContainer()
  // );
  }

  @computed
  get data() {
    return toJS({
      type: this.type,
      id: this.id,
      height: this.height,
      width: this.width,
      children: this.children,
      layout: this.layout
    });
  }

  @computed
  get numChildren() {
    return this.children.size;
  }

  @computed
  get childrenIds() {
    return this.children.keys();
  }

  // check whether or not this item is already in the container
  @action
  canDropItem(item) {
    return !this.children.has(item.id);
  }

  @action
  showItemPlaceholder(position, item) {
    this.placeholder.order = position;
    this.placeholder.item = item;

    // temporarily set a dropPosition for this container so we know where
    // to put the new item.
    this.itemDropPosition = position;
  }

  // check if the item exists in this container
  @action
  existsInContainer(item) {
    return this.children.has(item.id);
  }

  @action
  reorderItems(item) {
    this.children.forEach((value, key, map) => {
      console.log(value);
    });
  }

  // moves an item into this container
  @action
  moveItem(item, oldContainer) {
    item.order = this.itemDropPosition;
    this.children.set(item.id, item);

    if (oldContainer) {
      oldContainer.children.delete(item.id);
    }

    this.dropPosition = null;
  }

  @action
  toggleLayout() {
    this.layout = this.layout === 'column' ? 'row' : 'column';
  }

  @action
  removeItem(item) {
    this.children.delete(item.id);
  }

  @action
  increaseFlex() {
    this.flex++;
  }

  @action
  increaseWidth() {
    this.width += 10;
  }

  @action
  decreaseWidth() {
    this.width -= 10;
  }

  @action
  increaseHeight() {
    if (this.height < 900) {
      this.height += 100;
    }
  }

  @action
  decreaseHeight() {
    if (this.height <= 900 && this.height > 100) {
      this.height -= 100;
    }
  }

  @action
  logDetails() {
    console.log(toJS(this));
  }

  @action
  removeContainer() {
    this.store.removeContainer(this);
  }

}

export default Container;
