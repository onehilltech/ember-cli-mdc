ember-cli-mdc-drawer
======================

ember-cli addon for [`@material/drawer`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-drawer).

Installation
------------

    ember install ember-cli-mdc-drawer

Components and Mixins
-----------------------

### Top-Level Components

* [`MdcDrawer`](#MdcDrawer)

### Other Topics
* [Persistent vs. Modal](#persistent-vs-modal)
* [App Content](#app-content)

MdcDrawer
---------------

### Description

Add a side drawer component to the page.

### Usage

```handlebars
<MdcDrawer @style={{["dismissible"|"modal"]}} @open={{this.open}}>
  {{!-- drawer content --}}
</MdcDrawer>
```

### Attributes

* `@style` - The type of drawer. The drawer is permanent is no style provided.
* `open` - Open/closes the drawer.

### Adding content to the drawer

The content of a drawer goes inside a `<MdcDrawerContent>` block. For menu items, 
we use `<MdcList>` and `<MdcListGroupSubheader>` components.

```handlebars
<MdcDrawer @open={{this.open}}>
  {{!-- ... --}}
  
  <MdcDrawerContent>
    <MdcList>
      <MdcListItemLinkTo @route="index"><MdcListItemGraphicIcon @icon="inbox" />Inbox</MdcListItemLinkTo>
      <MdcListItemLinkTo @route="star"><MdcListItemGraphicIcon @icon="star" />Starred</MdcListItemLinkTo>
      <MdcListItemLinkTo @route="sent"><MdcListItemGraphicIcon @icon="send" />Sent Mail</MdcListItemLinkTo>
      <MdcListItemLinkTo @route="drafts"><MdcListItemGraphicIcon @icon="drafts" />Drafts</MdcListItemLinkTo>

      <MdcListDivider />

      <MdcListGroupSubheader>Folders</MdcListGroupSubheader>
      <MdcListItemLinkTo @route="all"><MdcListItemGraphicIcon @icon="email" />All Mail</MdcListItemLinkTo>
      <MdcListItemLinkTo @route="trash"><MdcListItemGraphicIcon @icon="delete" />Trash</MdcListItemLinkTo>
      <MdcListItemLinkTo @route="spam"><MdcListItemGraphicIcon @icon="report" />Spam</MdcListItemLinkTo>    </MdcList>
  </MdcDrawerContent>
</MdcDrawer>
```

### Opening/closing the drawer

The `@open` attribute on the `<MdcDrawer>` is used to open and close the drawer for both
persistent and modal styles. When `@open` is `true`, then the drawer will open. When `@open` 
is `false` the drawer will close. 

If the drawer has `@style="modal"`, then drawer automatically closes after clicking an item 
in the drawer.

### Adding a header to the drawer

The header in the drawer is the top portion of the drawer where you display application
specific information, such as how is currently logged into the application. You can add
a header to the drawer by adding the `{{mdc-drawer-header}}` block component.

```handlebars
<MdcDrawer @open={{this.open}}>
  <MdcDrawerHeader>
    <MdcDrawerTitle>Mail</MdcDrawerTitle>
    <MdcDrawerSubtitle>email@material.io</MdcDrawerSubtitle>
  </MdcDrawerHeader>
  
  {{!-- drawer content --}}

</MdcDrawer>
```

## Persistent vs. Modal

A *persistent drawer* remains open until the user explicitly closes the drawer. 
A *modal drawer* appears on demand (like a modal dialog), and disappears after clicking 
item in the drawer. If `@style="modal"`, then the `<MdcDrawer>` component will automatically 
add a `<MdcDrawerScrim>` component as the next sibling of the `<MdcDrawer>` component. Likewise, 
if you switch from a modal drawer to a dismissible drawer, the `<MdcDrawer>` component will 
automatically remove the `<MdcDrawerScrim>` element from the page.

## App Content

When working with the drawer component, the page content must placed inside a
`<MdcDrawerAppContent>` component. This ensures the drawer and page function
correctly, especially when changing between styles.

```handlebars
<MdcDrawer @style={{this.style}}>
  {{!-- drawer content --}}
</MdcDrawer>

<MdcDrawerAppContent>
  {{!-- app content --}}

</MdcDrawerAppContent>
```
