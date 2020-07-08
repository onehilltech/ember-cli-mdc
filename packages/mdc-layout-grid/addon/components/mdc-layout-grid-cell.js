import Component from '@glimmer/component';

import { computed } from '@ember/object';
import { assert } from '@ember/debug';

const ALIGNMENTS = ['top','middle','bottom'];

function span (argument, device) {
  return computed (`args.${argument}`, function () {
    let columns = this.args[argument];
    assert (`The ${columns} must be between 1 and 12.`, columns >= 1 && columns <= 12);

    return `mdc-layout-grid__cell--span-${columns}${!!device ? `-${device}` : ''}`;
  });
}

export default class MdcLayoutGridCellComponent extends Component {
  @span('columns')
  columnsClassName;

  @span('phoneColumns', 'phone')
  phoneColumnsClassName;

  @span('tabletColumns', 'tablet')
  tabletColumnsClassName;

  @span('desktopColumns', 'desktop')
  desktopColumnsClassName;

  get alignmentClassName () {
    let { alignment } = this.args;

    assert (`The alignment must be one of the following values.`, ALIGNMENTS.includes (alignment));
    return `mdc-layout-grid__cell--align-${alignment}`;
  }

  get orderClassName () {
    let { order } = this.args;

    assert ('The order must be between 1 and 12.', order >= 1 && order <= 12);
    return `mdc-layout-grid__cell--order-${order}`;
  }
}
