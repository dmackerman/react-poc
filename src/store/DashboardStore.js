import { observable, action, map, toJS, computed } from 'mobx';
import defaultDashboardHashData from '../data/dashboard-hash.json';
import { Container } from '../models/';

class DashboardStore {
  @observable data;
  @observable saving = false
  @observable editting = false;
  @observable dirty = false;

  constructor() {
    const dashboardData = this.storedDashboardData || defaultDashboardHashData;
    this.generateData(dashboardData)
  }

  generateData(source) {
      const dataMap = map();
      Object.keys(source).forEach(containerId => {
        const container = source[containerId];
        dataMap.set(containerId, new Container(container));
      });

      this.data = dataMap;
  }

  @computed get dataJSON () {
      return JSON.stringify(toJS(this.data), null, 2);
  }

  @computed get storedDashboardData() {
      return JSON.parse(localStorage.getItem('data'));
  }

  @action resetToDefaultData() {
      this.generateData(defaultDashboardHashData);
      this.dirty = false;
      this.editting = false;
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
