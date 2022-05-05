import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { camelize } from '@ember/string';

export default class MdcDataTableHeaderCellComponent extends Component {
  @tracked
  ascending = true;

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
    const { ascending = true } = this.args;
    this.ascending = ascending;
  }

  get sortable () {
    const { sortable = false } = this.args;
    return sortable;
  }

  get sortDesc () {
    return this.args.sortDesc;
  }

  @action
  sortBy () {
    const sortBy = `${this.sortKey}:${this.ascending ? 'asc' : 'desc'}`;
    this.sortDesc.setObjects ([sortBy]);

    // Negate the sorting direction.
    this.ascending = !this.ascending;
  }
}
