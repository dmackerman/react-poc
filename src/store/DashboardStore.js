import { observable, map } from 'mobx';
import dashboardHashData from '../data/dashboard-hash.json';
import { Container } from '../models/';

class DashboardStore {
    @observable data;
    @observable editting = false;

    constructor() {
        const dataMap = map();
        Object.keys(dashboardHashData).forEach(containerId => {
            const container = dashboardHashData[containerId];
            dataMap.set(containerId, new Container(container));
        });

        this.data = dataMap;
    }
}

const store = window.DashboardStore = new DashboardStore();
export default store;
