# node-split

A JavaScript function to find elements that match a query selector, and split their parent elements on either side, reinserting the target element at the top level.

# Why
Sometimes an element makes semantic sense nested within other elements (eg. lists), but needs to be displayed at full width. Ideally there would be a CSS `float: here;` value that would accomplish this. Until there is, this script will break the parent elements apart to approximate it.

# How
Put the `node-split.js` file somewhere.

Use `<script src="path/to/node-split.js"></script>` to bring it in.

Create a style for elements with the class `js-empty-list` which sets `list-style: none;`

In a `<script>` element, call the `nodeSplit()` function with a selector list as a string as the only argument, and then call the `listCorrector()` function, eg:

```html
<ul>
  <li>A list item.</li>
  <li>
    Another list item.
    <p class="split-here">This one has an element that needs to be split out</p>
  </li>
  <li> A third list item.</li>
</ul>

<style>
  .js-empty-list {
    list-style: none;
  }
</style>

<script src="/node-split.js"></script>
<script>
  nodeSplit('.split-here');
  listCorrector();
</script>
```

See `test.html` for a more thorough example.

# Licence
Released under the MIT [Licence](/LICENCE).
