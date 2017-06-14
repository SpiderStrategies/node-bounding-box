# bounding box

Determine the bounding box of a rotated rectangle

![Bounding Box](http://spiderstrategies.github.io/node-bounding-box/bb.png)

# example

```javascript
var bb = require('bounding-box')

var obj = {left: 221, top: 211, height: 220, width: 586}

console.log(bb(obj, 45))

```

## With custom center point

```javascript
var bb = require('bounding-box')

var obj = {left: 221, top: 211, height: 220, width: 586}

// Rotate from top/left corner (origin 0 0)
console.log(bb(obj, 45, {
   x: 221,
   y: 211
}))

```

# install

With [npm](http://npmjs.org),

```
npm install bounding-box
```

# license

BSD
