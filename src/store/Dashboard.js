import {observable} from 'mobx';

export class DashboardStore {

}

export class DashboardContainer {
  id = null;
  @observable flex = 1;
  @observable layout = 'column';

  constructor(json) {
    this.id = json.id;
  }
}

export class DashboardItem {

    /**
     * unique id of this todo, immutable.
     */
    id = null;

    @observable flex = 1;
    @observable panel_title = "";

    store = null;

    constructor(json) {
        this.id = json.id;
    }

}
