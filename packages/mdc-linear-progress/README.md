ember-cli-mdc-form
======================

ember-cli addon for [@material/linear-progress](https://github.com/material-components/material-components-web/tree/master/packages/mdc-linear-progress).

Installation
------------

    ember install ember-cli-mdc-linear-progress

Components
-------------

This package contains the following top-level components.

* [`mdc-linear-progress`](#mdc-linear-progress)

mdc-linear-progress
--------------------

### Description

Add a [Material Linear Progress](https://material.io/design/components/sliders.html) component to 
the parent element.

### Usage

```handlebars
{{mdc-linear-progress indeterminate=[true|false]
                      progress=value
                      buffer=value
                      reversed=[true|false]
                      closed=[true|false]
}}
```

### Attributes

* `indeterminate` - Run the linear progress in indeterminate mode.
* `progress` - The current progress value, must be between 0 and 1.
* `buffer` - The current value of the buffer, must be between 0 and 1.
* `reversed` - Reverse the display of the linear progress.
* `closed` - Hide the linear progress on the page.

### Examples

```handlebars
{{mdc-linear-progress progess=0.66}}
{{mdc-linear-progress progess=0.35 buffer=89.5}}
{{mdc-linear-progress indeterminate=true reversed=true}}
```
