ember-cli-mdc-typography
=========================

ember-cli addon for [`@material/typography`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-typography).

Installation
------------

    ember install ember-cli-mdc-typography

Usage
-----------------------

### Mixins

* [`{{Typography}}`](#typography-mixin)

### Other Topics
* [Configuring automatic integration](#configuring-automatic-integration)

Typography Mixin
------------------

The `Typography` mixin, when applied to a component, adds a `typography` attribute
to the component. The typography attribute allows you to programmatically customize
the typography of the component.

```javascript
// app/components/mdc-foo
import Component from '@ember/component';
import Typography from 'ember-cli-mdc-typography/mixins/typography';

export default Component.extend (Typography, {
 
});
```

The `typography` attribute must be one of the following values:

* headline1
* headline2
* headline3
* headline4
* headline5
* headline6
* subtitle1
* subtitle2
* body1
* body2
* caption
* button
* overline

```handlebars
{{mdc-foo typography="headline4"}}
```

Configuring Automatic Integration
------------------------------------

The typography package automatically adds the `mdc-typography` class to the 
[root of the ember application](https://guides.emberjs.com/release/configuring-ember/embedding-applications/#toc_changing-the-root-element).
By default, this is the `body` HTML element. You an change the root element 
by changing the `rootElement` property in `config/environment.js`.

### Disable integration

You can disable automatic typography integration by setting the `ember-cli-mdc.typography.disabled`
property in `config/environment.js`.

```javascript
let ENV = {
  // ...
  
  'ember-cli-mdc': {
    typography: {
      disabled: false
    }
  }
};
```
