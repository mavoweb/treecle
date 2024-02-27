<header>

# 🌳 Treecle

Need to handle tree-like objects? We’ve got you covered!
**Work in progress, try at your own risk.**

</header>

<main>

Features:
- Tree-shakable
- No dependencies
- TypeScript support (WIP)

Utility functions for:
- Traversal
- Transformations
- Search

## Installation

```sh
npm install treecle
```

or

```js
import * as treecle from "https://treecle.mavo.io/dist/treecle.js";
```

Or import functions individually from `src`.

## Usage

For details on what functions exist and their signatures, see the [API docs](./docs/).

This page exposes a global `treecle` object for experimentation. Open the console and try things out!

### Data shape

Treecle is designed to work with tree-like objects, where nodes are objects and edges are properties.
Arrays are used to represent multiple children of a node.
Arrays of arrays have no meaning in such a structure.

However, these constraints are not enforced, and whenever it would not be costly in terms of performance, treecle does try to handle data gracefully.

### Parent pointers

Certain methods like `closest()` and `children.replace()` depend on *parent pointers*, i.e. being able to get from a node to its parent.
When Treecle traverses an object, it also stores a path from the object to its parent.
To avoid mutating the object, this is stored in a private `WeakMap`, but you can access it via `parents.path(node)`.
To ensure every node in a (sub)tree has a parent pointer, use `parents.update(root)`.

### Getting a node’s children

By default, Treecle assumes that every property that points to an object is a parent-child relationship.
You can customize this by importing the `config` object and setting `config.getChildProperties` to a function that returns the child properties of a node as an array of strings.

You can also override `config.isNode(node)` to be more specific about what should be considered a node.
By default it considers all plain objects (i.e. not instances of a class other than `Object`) are cobsidered nodes.

<script type=module>
// Create global variable to facilitate experimentation
import * as treecle from "./src/index.js";
globalThis.treecle = treecle;
</script>

</main>