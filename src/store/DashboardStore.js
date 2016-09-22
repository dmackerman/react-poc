import { extendObservable } from 'mobx';
import dashboardData from '../data/dashboard.json';
import { Container } from '../models/';

export class DashboardStore {
    constructor() {
        extendObservable(this, {
          data: [],
          editting: false
        });
    }

    loadData() {
        const data = dashboardData.map(item => {
            return new Container(item);
        });
        this.data = data;
    }
}

const store = window.DashboardStore = new DashboardStore();
export default store;
