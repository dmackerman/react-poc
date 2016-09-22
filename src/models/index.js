import { extendObservable } from 'mobx';

export class Item {
  constructor(json) {
    this.type = 'item';
    extendObservable(this, {
      id: json.id,
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

  toggleLayout() {
    console.log('toggle layout', this);
    return this.layout === 'column' ? this.layout = 'row' : this.layout = 'column';
  }

  increaseFlex() {
    console.log('increase flex');
    return this.flex++;
  }
}