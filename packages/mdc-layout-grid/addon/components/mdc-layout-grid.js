import Component from '@ember/component';
import layout from '../templates/components/mdc-layout-grid';

import { computed } from '@ember/object';
import { isPresent, isNone } from '@ember/utils';
import { assert } from '@ember/debug';

const ALIGNMENTS = ['right', 'left'];

export default Component.extend({
  layout,

  classNames: ['mdc-layout-grid'],
  classNameBindings: ['alignmentClassName', 'fixedColumnWidth:mdc-layout-grid--fixed-column-width'],

  alignmentClassName: computed ('alignment', function () {
    const alignment = this.get ('alignment');
    assert ('The alignment must be one of the following: right, left.', isNone (alignment) || ALIGNMENTS.includes (alignment));

    return isPresent (alignment) ? `mdc-layout-grid--align-${alignment}` : null;
  }),

  /// The grid should have fixed column width.
  fixedColumnWidth: false,

  /// The alignment of the entire grid.
  alignment: null
});
