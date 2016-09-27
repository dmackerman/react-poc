import { observable, action, map, toJS, computed }
from 'mobx';
import defaultDashboardHashData from '../data/dashboard-hash.json';
import { Container }
from '../models/';

class DashboardStore {
  @observable data;
  @observable saving = false
  @observable editting = false;
  @observable dirty = false;

  constructor() {
    const dashboardData = this.storedDashboardData || defaultDashboardHashData;
    console.log(this.storedDashboardData ? 'using stored data' : 'using default JSON');
    this.generateData(dashboardData)
  }

  generateData(source) {
    const dataMap = map();
    Object.keys(source).forEach(containerId => {
      const container = source[containerId];
      dataMap.set(containerId, new Container(container, this));
    });

    this.data = dataMap;
  }

  removeContainer(container) {
    this.data.delete(container.id);
  }

  createContainer() {
    const container = new Container();
    this.data.set(container.id, container);
    return container;
  }

  @computed get numContainers() {
    return this.data.size;
  }

  @computed get dataJSON() {
    var json = {};
    this.data.forEach((value, key, map) => {
      json[key] = value.data;
    })
    return JSON.stringify(json, null, 2);
  }

  @computed get storedDashboardData() {
    return JSON.parse(localStorage.getItem('data'));
  }

  @action resetToDefaultData() {
    this.generateData(defaultDashboardHashData);
    this.dirty = false;
    this.editting = false;
    localStorage.removeItem('data');
  }

  // saves the current Dashboard state to localStorage.
  @action saveDashboardState() {
    return localStorage.setItem('data', this.dataJSON);
  }

  @action toggleEditMode() {
    this.editting = !this.editting;
    if (!this.editting) {
      console.log(toJS(this.data));
      this.saveDashboardState();
    }
  }

  @action logStoreData() {
    console.log(this.dataJSON, null, 4);
  }
}

const store = window.DashboardStore = new DashboardStore();
export default store;
