/*
 * Transforms point to a new location based on the center coordinate and the angle.
 *
 *  What's weird is that those equations we found on the web gave us the correct Y coordinates but incorrect X coordinates.
 *  In order to get the correct X coordinates we had to use a negative version of the rotation.  We don't know why that is,
 *  but we do know that it works, so we're not worrying about it.
 */
function transform (point, center, angle) {
  var theta = angle * (Math.PI / 180)

  // Moves the point relative to 0,0
  point.x -= center.x
  point.y -= center.y

  return {
    x: (point.x * Math.cos(theta * -1) + point.y * Math.sin(theta * -1)) + center.x,
    y: (point.x * Math.sin(theta) + point.y * Math.cos(theta)) + center.y
  }
}

/*
 * Determines the bounding box of the area, if it's rotated at the specified angle
 * The area must define left, top, height, and width properties
 */
module.exports = function (area, angle, center) {
  var props = ['width', 'height', 'top', 'left']
  props.forEach(function (prop) {
    if (!area.hasOwnProperty(prop)) {
      throw new Error ('Area is missing property ', prop)
    }
  })

  // If we don't have an angle, or it's 0 or 180, just return the area, with the addition of bottom and right properties
  if (!angle || angle === 180) {
    area.bottom = area.top + area.height
    area.right = area.left + area.width
    return area
  }

  // Allow custom center
  if (typeof center === 'undefined') {
    center = {
      x: area.left + area.width / 2,
      y: area.top + area.height / 2
    }
  }

  // Deteremines each of the corners based on the transformation angle
  var tl = transform({x: area.left, y: area.top}, center, angle)
    , bl = transform({x: area.left, y: area.top + area.height}, center, angle)
    , tr = transform({x: area.left + area.width, y: area.top}, center, angle)
    , br = transform({x: area.left + area.width, y: area.top + area.height}, center, angle)

  // Find smallest/largest x/y values
  var minX = Math.min(tl.x, bl.x, tr.x, br.x)
    , maxX = Math.max(tl.x, bl.x, tr.x, br.x)
    , minY = Math.min(tl.y, bl.y, tr.y, br.y)
    , maxY = Math.max(tl.y, bl.y, tr.y, br.y)

  // Return the bounding box
  return {
    top: minY,
    bottom: maxY,
    height: maxY - minY,
    left: minX,
    right: maxX,
    width: maxX - minX
  }
}
