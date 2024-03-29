ember-cli-mdc-icon
======================

ember-cli addon for [Material Icons](https://material.io/tools/icons/)

Installation
------------

    ember install ember-cli-mdc-icon

Components
-----------

This package contains the following top-level components.

* [`MdcIcon`](#MdcIcon)

mdc-icon
---------------------

### Description

Adds a material icon element. 

The icon is described by its name, which is the same name that appears in the icon 
font for the corresponding icon. The easiest method to locate the icon name is to 
search for the icon at [Material Icons](https://material.io/tools/icons/).

### Usage

```handlebars
<MdcIcon @icon={{name}} />
<MdcIcon @image={{image}} />
<MdcIcon>{{!-- svg elements --}}</MdcIcon>
```

### Parameters

* **`name`** - Name of the icon
* **`image`** - Url of an image

### Examples

```handlebars
<MdcIcon @icon="delete" />
<MdcIcon @icon="wifi" />
<MdcIcon @icon="close" />
```

### Using CSS Styles

You color an icon using the `color` CSS style. For example, if you want to color the 
delete icon red, then we first create a CSS class that has the property `color:red`.

```css
.red-icon {
  color: red;
}
```

Then, assign the CSS class to the icon.

```handlebars
<MdcIcon @icon="delete" class="red-icon" />
```

Now, the delete icon will render in red.
