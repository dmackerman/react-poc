import { observable, computed, action, map, toJS } from 'mobx';
import Item from './Item';
import ItemPlaceholder from './ItemPlaceholder';

class Container {
  @observable flex;
  @observable height;
  @observable width;
  @observable children;
  @observable layout;
  @observable placeholder;
  @observable itemDropPosition;

  constructor(data) {

    // since our data structure is a hash, Mobx needs to use Maps to
    // identify when new Objects are added or removed.
    // https://mobxjs.github.io/mobx/refguide/map.html
    const children = map();
    const childrenIds = Object.keys(data.children);
    childrenIds.forEach(childId => {
      let child = data.children[childId]
      children.set(childId, new Item(child));
    });

    this.type = 'container';
    this.id = data.id;
    this.flex = data.flex;
    this.height = data.height;
    this.width = data.width;
    this.children = children;
    this.layout = data.layout;

    // each Container will have a placeholder component which renders where items
    // will be dropped.
    this.placeholder = new ItemPlaceholder();
  }

  @computed get numChildren() {
      return this.children.size;
  }

  @computed get childrenIds() {
      return this.children.keys();
  }

  // check whether or not this item is already in the container
  @action canDropItem(item) {
      return !this.children.has(item.id);
  }

  @action showItemPlaceholder(position, item) {
      this.placeholder.order = position;
      this.placeholder.item = item;

      // temporarily set a dropPosition for this container so we know where
      // to put the new item.
      this.itemDropPosition = position;
  }

  // check if the item exists in this container
  @action existsInContainer(item) {
      return this.children.has(item.id);
  }

  @action reorderItems(item) {
      this.children.forEach((value, key, map) => {
          console.log(value);
      });
  }

  // moves an item into this container, will figure out position later
  @action moveItem(item, oldContainer) {
      item.order = this.itemDropPosition;
      this.children.set(item.id, item);

      if (oldContainer) {
          oldContainer.children.delete(item.id);
      }

      this.dropPosition = null;
  }

  @action toggleLayout() {
    this.layout = this.layout === 'column' ? 'row' : 'column';
  }

  @action removeItem(item) {
    this.children.delete(item.id);
  }

  @action increaseFlex() {
    this.flex++;
  }

  @action logDetails() {
    console.log(toJS(this));
  }

}

export default Container;
