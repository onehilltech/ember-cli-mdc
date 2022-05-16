import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { camelize } from '@ember/string';

export default class MdcDataTableHeaderCellComponent extends Component {
  @tracked
  ascending;

  get sorted () {
    if (isEmpty (this.sortDesc)) {
      return false;
    }

    const sortKey = this.sortKey;
    const sortKeyWithColon = `${sortKey}:`;
    return !!this.sortDesc.find (desc => desc === sortKey || desc.startsWith (sortKeyWithColon));
  }

  get sortKey () {
    return this.args.sortKey || camelize (this.args.label);
  }

  @action
  didInsert () {
    const { ascending = false } = this.args;
    this.ascending = ascending;
  }

  get sortable () {
    const { sortable, sortDesc } = this.args;
    return sortable !== false && !!sortDesc;
  }

  get sortDesc () {
    return this.args.sortDesc;
  }

  @action
  sortBy () {
    const sortBy = `${this.sortKey}:${this.ascending ? 'asc' : 'desc'}`;
    this.sortDesc.setObjects ([sortBy]);
    this.ascending = !this.ascending;
  }
}
