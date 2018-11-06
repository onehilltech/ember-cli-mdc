ember-cli-mdc-drawer
======================

ember-cli addon for [`@material/drawer`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-drawer).

Installation
------------

    ember install ember-cli-mdc-drawer

Components and Mixins
-----------------------

### Top-Level Components

* [`{{mdc-drawer}}`](#mdc-drawer)

### Other Topics
* [Dismissible vs. Modal](#dismissible-vs-modal)

{{mdc-drawer}}
---------------

### Description

Add a side drawer component to the page.

### Usage

```handlebars
{{#mdc-drawer style=["dismissible"|"modal"] open=open}}
  {{!-- drawer content --}}
{{/mdc-drawer}}
```

### Attributes

* `style` - The type of drawer. Eit
* `open` - Open/closes the drawer.

### Adding content to the drawer

The content of a drawer goes inside a `{{mdc-drawer-content}}` block. For menu items, 
we use `{{mdc-list}}` and `{{mdc-list-group}}` components.

```handlebars
{{#mdc-drawer style=style open=open}}
  {{!-- ... --}}
  
  {{#mdc-drawer-content}}
    {{#mdc-list-group}}
      {{#mdc-list}}
        {{#mdc-list-item-linkto "index"}}{{mdc-list-item-graphic-icon "inbox"}} Inbox{{/mdc-list-item-linkto}}
        {{#mdc-list-item-linkto "star"}}{{mdc-list-item-graphic-icon "star"}} Star{{/mdc-list-item-linkto}}
        {{#mdc-list-item-linkto "sent"}}{{mdc-list-item-graphic-icon "send"}} Sent Mail{{/mdc-list-item-linkto}}
        {{#mdc-list-item-linkto "drafts"}}{{mdc-list-item-graphic-icon "drafts"}} Drafts{{/mdc-list-item-linkto}}
      {{/mdc-list}}
  
      {{mdc-list-divider}}
  
      {{#mdc-list}}
        {{#mdc-list-item-linkto "all"}}{{mdc-list-item-graphic-icon "email"}} All Mail{{/mdc-list-item-linkto}}
        {{#mdc-list-item-linkto "trash"}}{{mdc-list-item-graphic-icon "delete"}} Trash{{/mdc-list-item-linkto}}
        {{#mdc-list-item-linkto "spam"}}{{mdc-list-item-graphic-icon "report"}} Spam{{/mdc-list-item-linkto}}
      {{/mdc-list}}
    {{/mdc-list-group}}
  {{/mdc-drawer-content}}
{{/mdc-drawer}}  
```

### Opening/closing the drawer

The `open` attribute on the `{{mdc-drawer}}` is used to open and close the drawer. When
`open` is `true`, then the drawer will open. When `open` is `false` the drawer will 
close. 

If the drawer has `style="modal"`, then the `open` attribute is automatically set to 
`false` when an item in the drawer is clicked.

### Adding a header to the drawer

The header in the drawer is the top portion of the drawer where you display application
specific information, such as how is currently logged into the application. You can add
a header to the drawer by adding the `{{mdc-drawer-header}}` block component.

```handlebars
{{#mdc-drawer style=style open=open}}
  {{#mdc-drawer-header}}
    {{#mdc-drawer-title}}Mail{{/mdc-drawer-title}}
    {{#mdc-drawer-subtitle}}email@material.io{{/mdc-drawer-subtitle}}
  {{/mdc-drawer-header}}
  
  {{!-- drawer content --}}

{{/mdc-drawer}}
```

## Dismissible vs. Modal

A *dismissible drawer* is one that once opened remains open until the user explicitly
closes the drawer. A *modal drawer* is one that appears on demand (like a modal dialog), 
and disappears when an item in the drawer is clicked. If `style="modal"`, then the
`{{mdc-drawer}}` component will automatically add a `{{mdc-drawer-scrim}}` component
as the next sibling of the `{{mdc-drawer}}` component. Likewise, if you switch from
a modal drawer to a dismissible drawer, the `{{mdc-drawer}}` component will automatically
remove the `{{mdc-drawer-scrim}}` element from the page.

```handlebars
{{#mdc-drawer style="modal"}}
  {{!-- drawer content --}}
{{/mdc-drawer}}

<div>
  {{!-- app content --}}
</div>

```

When working with a dismissible drawer, the page content must placed inside a
`{{mdc-drawer-app-content}}` component. This ensures the drawer and the page function
correctly when the drawer is opened.

```handlebars
{{#mdc-drawer style="dismissible"}}
  {{!-- drawer content --}}
{{/mdc-drawer}}

{{#mdc-drawer-app-content}}
  {{!-- app content --}}
{{/mdc-drawer-app-content}}
```

### Alternating between dismissible and modal

The dismissible drawer requires the app content placed in a `{{mdc-drawer-app-content}}`
component. This is not a requirement for modal drawers. The app content just needs to 
be placed inside a `<div>` element. To support alternating between a dismissible and 
modal drawer, we adapted the `{{mdc-drawer-app-content}}` to support modal drawers. 

If you want to support alternating between dismissible and modal drawers, maybe depending 
on the screen size, then place the app content inside a `{{mdc-drawer-app-content}}` 
component. The `{{mdc-drawer-app-content}}` will automatically configure itself if the
`{{mdc-drawer}}` style attribute changes.

```handlebars
{{#mdc-drawer style=style}}
  {{!-- drawer content --}}
{{/mdc-drawer}}

{{#mdc-drawer-app-content}}
  {{!-- app content --}}
{{/mdc-drawer-app-content}}
```
