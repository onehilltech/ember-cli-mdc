ember-cli-mdc-linear-progress
=============================

ember-cli addon for [@material/linear-progress](https://github.com/material-components/material-components-web/tree/master/packages/mdc-linear-progress).

Installation
------------

    ember install ember-cli-mdc-linear-progress

<<<<<<< HEAD
Components
-------------
=======
* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above
>>>>>>> 520bd251 (v3.18.0...v3.28.6)

This package contains the following top-level components.

* [`MdcLinearProgress`](#MdcLinearProgress)

MdcLinearProgress
--------------------

### Description

Add a linear progress component to the page.

### Usage

```handlebars
<MdcLinearProgress @indeterminate={{[true|false]}}
                   @min={{min}}
                   @max={{max}}   
                   @value={{value}}
                   @buffer={{buffer}}
                   @reversed={{[true|false]}}
                   @closed={{[true|false]}} />
```

### Attributes

* `indeterminate` - Run the linear progress in indeterminate mode.
* `min` - The min value of progress bar, default is 0.
* `max` - The min value of progress bar, default is 1.
* `value` - The current progress value, must be between `@min` and `@max`.
* `buffer` - The current value of the buffer, must be `@min` 0 and `@max`.
* `reversed` - Reverse the display of the linear progress.
* `closed` - Hide the linear progress on the page.

### Examples

```handlebars
<MdcLinearProgress @value={{0.66}} />

<MdcLinearProgress @min={{0}} @max={{100}} @value={{42}} @buffer={{89}} />

<MdcLinearProgress @indeterminate={{true}} @reversed={{true}} />
```

