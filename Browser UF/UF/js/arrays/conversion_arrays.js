//arrayToObject() - Casts an array to object.
function arrayToObject (arg0_array) {
  //Convert from parameters
  var array = arg0_array;

  //Declare local instance variables
  var return_object = {};

  //Iterate over array
  for (var i = 0; i < array.length; i++)
    return_object[i] = array[i];

  //Return statement
  return return_object;
}

//objectToArray() - Casts an object to array.
function objectToArray (arg0_input_object) {
  //Convert from parameters
  var input_object = arg0_input_object;

  //Declare local instance variables
  var all_object_keys = Object.keys(input_object);
  var return_array = [];

  //Iterate over object
  for (var i = 0; i < all_object_keys.length; i++)
    return_array.push(input_object[all_object_keys[i]]);

  //Return statement
  return return_array;
}

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
