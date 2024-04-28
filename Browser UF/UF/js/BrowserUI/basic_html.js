/*
  arrayHasElement() - Checks if an array has an element.
  arg0_array: (Array<HTMLElement>) - The array of elements to look through
  arg1_query_selector: (String) - The query selector to check for

  Returns: (Boolean)
*/
function arrayHasElement (arg0_array, arg1_query_selector) {
  //Convert from parameters
  var array = arg0_array;
  var query_selector = arg1_query_selector;

  //Declare local instance variables
  var selected_elements = document.querySelectorAll(query_selector);

  if (selected_elements)
    for (var i = 0; i < array.length; i++)
      for (var x = 0; x < selected_elements.length; x++)
        if (array[i].outerHTML == selected_elements[x].outerHTML) return true;
}

/*
  arrayHasElementAttribute() - Checks if an array of elements has an attribute.
  arg0_array: (Array<HTMLElement>) - The array of elements to pass to the function.
  arg1_attribute_type: (String) - The attribute to check for.
  arg2_attribute_content: (String) - The attribute content to check for.

  Returns: (Boolean)
*/
function arrayHasElementAttribute (arg0_array, arg1_attribute_type, arg2_attribute_content) {
  //Convert from parameters
  var array = arg0_array;
  var attribute_type = arg1_attribute_type;
  var attribute_content = arg2_attribute_content;

  //Iterate over array
  if (array)
    for (var i = 0; i < array.length; i++)
      try {
        if (array[i].getAttribute(attribute_type) == attribute_content) return true;
      } catch {}
}

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
  hideElement() - Hides an HTML element. Appends a 'hidden' class.
  arg0_element: (HTMLElement) - The HTML element to pass.
*/
function hideElement (arg0_element) {
  //Convert from parameters
  var element = arg0_element;

  //Declare local instance variables
  var class_name = element.getAttribute("class");

  if (!class_name.includes(" hidden"))
    (class_name) ?
      element.setAttribute("class", `${class_name} hidden`) :
      element.setAttribute("class", " hidden");
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

/*
  removeClasses() - Removes a list of classes from an element.

  arg0_element: (HTMLElement) - The HTML element to pass.
  arg1_array: (Array<String>) - The array of classes to remove.
*/
function removeClasses (arg0_element, arg1_array) {
  //Convert from parameters
  var element = arg0_element;
  var array = getList(arg1_array);

  //Declare local instance variables
  var element_class = element.getAttribute("class");

  if (element_class) {
    for (var i = 0; i < array.length; i++)
      element_class = element_class.replace(array[i], "");
    element.setAttribute("class", element_class);
  }

  //Return statement
  return element_class;
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

/*
  showElement() - Shows an element by removing the 'hidden' class.

  arg0_element: (HTMLElement) - The HTML element to pass.
*/
function showElement (arg0_element) {
  //Convert from parameters
  var element = arg0_element;

  //Declare local instance variables
  var class_name = element.getAttribute("class");

  if (class_name)
    element.setAttribute("class", class_name.replace(/ hidden/gm, ""));
}
