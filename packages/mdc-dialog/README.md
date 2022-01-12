ember-cli-mdc-dialog
======================

ember-cli addon for [`@material/dialog`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-dialog).


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------

    ember install ember-cli-mdc-dialog

Components
-----------

This package contains the following top-level components.

* [`MdcDialog`](#MdcDialog)

MdcDialog
---------------------

### Description

Adds a dialog to the document.

### Usage

```handlebars
<MdcDialog @title="Use Google's location service?"
             @open=[true|false]
             @positiveButton=(hash action="accept" label="Accept" default=[true|false] focus=[true|false] closed=this.accept closing=this.accepting)
             @negativeButton=(hash action="close" label="Decline" default=[true|false] focus=[true|false] closed=this.close closing=this.closing)>
  Let Google help apps determine location. This means sending anonymous
  location data to Google, even when no apps are running.
</MdcDialog>
```

### Attributes

* `@title` - Optional title for the dialog.
* `@open` - Open the dialog
* `@positiveButton` - Positive button definition. No positive button if left off the table.
* `@negativeButton` - Negative button definition. No negative button if left off the table.

### Button attributes

* `action` - Name of action
* `label` - Dialog button label
* `default` - Make the default action
* `focus` - Focus this button when opened
* `opening` - Action triggered when dialog is opening
* `opened` - Action triggered when dialog is opened
* `closing` - Action triggered when dialog is closing
* `closed` - Action triggered when dialog has closed

### Custom Dialog

```handlebars
<MdcCustomDialog @title="Use Google's location service?"
                 @open=[true|false]>
  <:content>
    Let Google help apps determine location. This means sending anonymous
    location data to Google, even when no apps are running.
  </:content>

  <:actions>
    <MdcButton 
      @label="Decline" 
      {{on "click" this.close}}
      data-mdc-dialog-action="close"
    />
    <MdcButton 
      @style="raised" 
      @label="Accept" 
      {{on "click" this.accept}}
      data-mdc-dialog-action="accept"
    />
  </:actions>
</MdcCustomDialog>
```
