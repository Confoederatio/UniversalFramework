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
  var a = arg0_circle_x;
  var b = arg1_circle_y;
  var x = arg2_point_x;
  var y = arg3_point_y;
  var r = arg4_radius;

  //Declare local instance variables
  var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
  r *= r;

  //Return statement
  return (dist_points < r);
}
