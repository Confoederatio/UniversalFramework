/*
  isDescendant() - Checks whether an element belongs to a specific parent.
  arg0_parent_el: (HTMLElement) - The HTML element of the parent to check.
  arg1_child_el: (HTMLElement) - The HTML element of the child to check.
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
