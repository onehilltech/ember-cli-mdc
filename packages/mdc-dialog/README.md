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
              accept=(action "accept")
              acceptButtonText="Accept"
              close=(action "close")
              closeButtonText="Decline"
              default=["accept"|"close"]
              show=[true|false]
              scrollable=[true|false]}}
  Let Google help apps determine location. This means sending anonymous
  location data to Google, even when no apps are running.
{{/mdc-dialog}}
```

### Attributes

* `title` - Optional title for the dialog.
* `accept` - Action called with the accept button is pressed.
* `acceptButtonText` - Text for the accept button.
* `close` - Action called with the close button is pressed.
* `closeButtonText` - Text for the close button.
* `default` - Which button is the default button.
* `show` - Show the dialog.
* `scrollable` - Optional mark the dialog content as scrollable.
