import Component from '@ember/component';
import layout from '../templates/components/mdc-layout-grid-cell';

import { computed } from '@ember/object';
import { isPresent, isNone } from '@ember/utils';

import { assert } from '@ember/debug';

const ALIGNMENTS = ['top','middle','bottom'];

function computedColumns (dependent, device) {
  return computed (dependent, function () {
    const columns = this.get (dependent);

    if (isNone (columns)) {
      return null;
    }

    assert (`The ${dependent} must be between 1 and 12.`, columns >= 1 && columns <= 12);
    return isPresent (device) ? `mdc-layout-grid__cell--span-${columns}-${device}` : `mdc-layout-grid__cell--span-${columns}`;
  });
}

export default Component.extend({
  layout,

  classNames: ['mdc-layout-grid__cell'],

  classNameBindings: [
    'alignmentClassName',
    'orderClassName',
    'columnsClassName',
    'phoneColumnsClassName',
    'tabletColumnsClassName',
    'desktopColumnsClassName'
  ],

  /// The alignment of the entire grid.
  alignment: null,

  /// The order of the cell.
  order: null,

  /// The number of columns the cell spans.
  columns: null,

  /// The number of columns the cell spans on a phone.
  phoneColumns: null,

  /// The number of columns the cell spans on a tablet.
  tabletColumns: null,

  /// The number of columns the cell spans on a desktop.
  desktopColumns: null,

  alignmentClassName: computed ('alignment', function () {
    const alignment = this.get ('alignment');

    if (isNone (alignment)) {
      return null;
    }

    assert ('The alignment must be one of the following: top, middle, bottom.', ALIGNMENTS.includes (alignment));
    return `mdc-layout-grid__cell--align-${alignment}`;
  }),

  orderClassName: computed ('order', function () {
    const order = this.get ('order');

    if (isNone (order)) {
      return;
    }

    assert ('The order must be between 1 and 12.', order >= 1 && order <= 12);
    return `mdc-layout-grid__cell--order-${order}`;
  }),

  columnsClassName: computedColumns ('columns'),
  phoneColumnsClassName: computedColumns ('phoneColumns', 'phone'),
  tabletColumnsClassName: computedColumns ('tabletColumns', 'tablet'),
  desktopColumnsClassName: computedColumns ('desktopColumns', 'desktop')
});
