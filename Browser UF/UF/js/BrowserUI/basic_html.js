function closestPointInCircle (arg0_circle_x, arg1_circle_y, arg2_point_x, arg3_point_y, arg4_radius) {
  //Convert from parameters
  var cX = arg0_circle_x;
  var cY = arg1_circle_y;
  var pX = arg2_point_x;
  var pY = arg3_point_y;
  var r = arg4_radius;

  //Declare local instance variables
  var center_x = cX + r;
  var center_y = cY + r;
  var vX = pX - center_x;
  var vY = pY - center_y;

  var magV = Math.sqrt(vX*vX + vY*vY);
  var aX = center_x + vX/magV*r;
  var aY = center_y + vY/magV*r;

  //Return statement
  return [aX, aY];
}

/*
  isDescendant() - Checks whether an element belongs to a specific parent.
  arg0_parent_el: (HTMLElement) - The HTML element of the parent to check.
  arg1_child_el: (HTMLElement) - The HTML element of the child to check.

  Returns: (Boolean)
*/
function isDescendant (arg0_parent_el, arg1_child_el) {
  //Convert from parameters
  var parent_el = arg0_parent_el;
  var child_el = arg1_child_el;

  //Declare local instance variables
  var node = child_el.parentNode;

  //Iterate over parents as a while loop
  while (node != null) {
    if (node == parent) return true;
    node = node.parentNode;
  }

  //Return statement; if failed
  return false;
}

/*
  objectToAttributes() - Converts a given object to a bunch of attributes in terms of key/value pairs.
  arg0_input_object: (Object) - The object to pass to the function.

  Returns: (String)
*/
function objectToAttributes (arg0_input_object) {
  //Convert from parameters
  var input_object = (arg0_input_object) ? arg0_input_object : {};

  //Declare local instance variables
  var all_keys = Object.keys(input_object);
  var attribute_string = [];

  //Iterate over all_keys
  for (var i = 0; i < all_keys.length; i++) {
    var local_value = input_object[all_keys[i]];

    attribute_string.push(`${all_keys[i]} = "${local_value}"`);
  }

  //Format attribute_string
  attribute_string = attribute_string.join(" ");

  //Return statement
  return (attribute_string) ? ` ${attribute_string}` : "";
}

/*
  onRangeChange() - Detects when a range is changed.
  arg0_range_el: (HTMLElement) - The HTML element of the range.
  arg1_listener: (Function) - The function to execute on change.
*/
function onRangeChange (arg0_range_el, arg1_listener) {
  //Convert from parameters
  var range_el = arg0_range_el;
  var listener = arg1_listener;

  //Declare local instance variables
  var n, c, m;

  range_el.addEventListener("input", function (e) {
    n = 1;
    c = e.target.value;

    if (c != m) listener(e);
    m = c;
  });
  range_el.addEventListener("change", function (e) {
    if (!n) listener(e);
  });
}

/*
  pointIsInCircle() - Checks if a point is in a circle.
  arg0_circle_x: (Number) - The x position of the circle.
  arg1_circle_y: (Number) - The y position of the circle.
  arg2_point_x: (Number) - The x position to check.
  arg3_point_y: (Number) - The y position to check.
  arg4_radius: (Number) - The radius of the circle.

  Returns: (Boolean)
*/
function pointIsInCircle (arg0_circle_x, arg1_circle_y, arg2_point_x, arg3_point_y, arg4_radius) {
  //Convert from parameters
  var circle_x = arg0_circle_x;
  var circle_y = arg1_circle_y;
  var point_x = arg2_point_x;
  var point_y = arg3_point_y;
  var radius = arg4_radius;

  //Declare local instance variables
  var distance_squared = (point_x - circle_x) ** 2 + (point_y - circle_y) ** 2;

  //Return statement
  return (distance_squared <= radius ** 2);
}

//removeErrorHandlers() - Removes onerror handlers.
function removeErrorHandlers() {
  if (!global.original_error_handlers)
    global.original_error_handlers = {};

  const elements = document.querySelectorAll('[onerror]');
  elements.forEach((element) => {
      original_error_handlers[element] = element.getAttribute('onerror');
      element.removeAttribute('onerror');
  });
}

//restoreErrorHandlers() - Restores onerror handlers.
function restoreErrorHandlers() {
  for (const element in original_error_handlers)
    if (original_error_handlers.hasOwnProperty(element))
      //Check if the element is a valid HTML element
      if (element instanceof HTMLElement)
        element.setAttribute('onerror', original_error_handlers[element]);
}
