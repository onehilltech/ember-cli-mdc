ember-cli-mdc-dialog
======================

ember-cli addon for [`@material/dialog`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-dialog).

Installation
------------

    ember install ember-cli-mdc-dialog

Components
-----------

This package contains the following top-level components.

* [`{{mdc-dialog}}`](#mdc-dialog)

mdc-dialog
---------------------

### Description

Adds a dialog to the document.

### Usage

```handlebars
{{#mdc-dialog title="Use Google's location service?"
              show=[true|false]
              scrollable=[true|false]
              positiveButton=(hash action="accept" label="Accept" default=[true|false] close=(action "accept") closing=(action "accepting"))
              negativeButton=(hash action="close" label="Decline" default=[true|false] close=(action "close") closing=(action "closing"))}}
  Let Google help apps determine location. This means sending anonymous
  location data to Google, even when no apps are running.
{{/mdc-dialog}}
```

### Attributes

* `title` - Optional title for the dialog.
* `show` - Show the dialog.
* `scrollable` - Optional mark the dialog content as scrollable.
* `positiveButton` - Positive button definition. No positive button if left off the table.
* `negativeButton` - Negative button definition. No negative button if left off the table.
