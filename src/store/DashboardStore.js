import { observable, action, map, toJS, computed } from 'mobx';
import defaultDashboardHashData from '../data/dashboard-hash.json';
import { Item } from '../models/';

class DashboardStore {
  @observable data;
  @observable saving = false
  @observable editting = false;
  @observable dirty = false;

  constructor() {
    const dashboardData = this.storedDashboardData || defaultDashboardHashData;
    this.generateData(dashboardData);
  }

  generateData(source) {
    const dataMap = map();
    Object.keys(source).forEach(itemId => {
      const item = source[itemId];
      dataMap.set(itemId, new Item(item, this));
    });

    this.data = dataMap;
  }

  saveLayout(layout) {
    console.log('save layout', ...layout);
    const data = toJS(this.data);

    layout.forEach(itemLayout => {
      this.data.get(itemLayout.i).x = itemLayout.x;
      this.data.get(itemLayout.i).y = itemLayout.y;
      this.data.get(itemLayout.i).w = itemLayout.w;
      this.data.get(itemLayout.i).h = itemLayout.h;
      let item = toJS(this.data.get(itemLayout.i));
      const { x, y, w, h, isResizable, isDraggable } = itemLayout;
      data[itemLayout.i] = { ...item, x, y, w, h, isResizable, isDraggable };
    });

    this.saveDashboardState(data);
  }

  saveDashboardState(data) {
    return localStorage.setItem('data', JSON.stringify(data));
  }

  @action addNewItem() {
    const item = new Item({
      x: 1,
      y: 2,
      w: 5,
      h: 3,
      minH: 2,
      static: false
    });
    this.data.set(item.id, item);
  }

  @action toggleEditMode() {
    this.editting = !this.editting;
    this.data.forEach(item => item.toggleDragAndResize());
  }

  @action removeItem(item) {
    this.data.delete(item.id);
  }

  @computed get dataJSON() {
    var json = {};
    this.data.forEach((value, key, map) => {
      json[key] = value;
    });
    return JSON.stringify(json, null, 2);
  }

  @computed get storedDashboardData() {
    let data;
    try {
      data = JSON.parse(global.localStorage.getItem('data')) || {};
    } catch(e) {/*Ignore*/}
    return data;
  }

  @action resetToDefaultData() {
    this.generateData(defaultDashboardHashData);
    this.dirty = false;
    this.editting = false;
    localStorage.removeItem('data');
  }

  @action logStoreData() {
    console.log(this.dataJSON, null, 4);
  }
}

const store = window.DashboardStore = new DashboardStore();
export default store;
