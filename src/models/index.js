import { extendObservable } from 'mobx';
import uuid from 'uuid-v4';

export class Item {
  constructor(json) {
      console.log(uuid());
    this.type = 'item';
    this.id = json.id || uuid();

    extendObservable(this, {
      flex: json.flex,
      panel_title: json.panel_title
    });
  }

  increaseFlex() {
    this.flex++;
  }
}

export class Container {
  constructor(json) {
    this.type = 'container';

    const children = json.children.map(child => {
      if (child.children) {
        return new Container(child)
      }
      return new Item(child);
    });

    extendObservable(this, {
      id: json.id,
      flex: json.flex,
      children: children,
      layout: json.layout,
      flex_children: function() {
        return this.children.map(child => {
          return {
            id: child.id,
            flex: child.flex,
            type: child.type
          }
        });
      }
    });
  }

  addItem(item) {
      this.children.push(item);
  }

  toggleLayout() {
    console.log('toggle layout', this);
    return this.layout === 'column' ? this.layout = 'row' : this.layout = 'column';
  }

  increaseFlex() {
    console.log('increase flex');
    return this.flex++;
  }
}
