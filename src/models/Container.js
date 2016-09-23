import { observable, computed, action, map, toJS } from 'mobx';
import Item from './Item';

class Container {
  @observable flex;
  @observable children;
  @observable layout;

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
    this.children = children;
    this.layout = data.layout;
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

  // moves an item into this container, will figure out position later
  @action moveItem(item, oldContainer) {
      this.children.set(item.id, item);
      oldContainer.children.delete(item.id);
  }

  @action toggleLayout() {
    this.layout = this.layout === 'column' ? 'row' : 'column';
  }

  @action removeItem(itemId) {
    this.children.delete(itemId);
  }

  @action increaseFlex() {
    this.flex++;
  }

  @action logDetails() {
    console.log(toJS(this));
  }

}

export default Container;
