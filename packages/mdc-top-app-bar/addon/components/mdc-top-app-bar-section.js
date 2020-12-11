import Component from '@glimmer/component';

import { isNone } from '@ember/utils';
import { assert } from '@ember/debug';
import { dasherize } from '@ember/string';

const POSITIONS = ['alignStart', 'alignEnd'];

export default class MdcTopAppBarSection extends Component {
  get position () {
    const { position = 'alignStart' } = this.args;

    if (isNone (position)) {
      return null;
    }

    assert ('The position property must be one of the following values: alignStart, alignEnd.', POSITIONS.includes (position));
    return `mdc-top-app-bar__section--${dasherize (position)}`;
  }
}
