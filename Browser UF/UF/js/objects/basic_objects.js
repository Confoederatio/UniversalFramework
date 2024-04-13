/*
  cleanObject() - Removes both zero values and undefined/null values from an object by default.
  arg0_object: (Object) - The object to pass.
  arg1_options: (Object)
    remove_falsey: (Boolean) - Optional. Whether to remove falsey values. False by default.
    remove_zeroes: (Boolean) - Optional. Whether to remove zero values from the cleaned object. False by default.

  Returns: (Object)
*/
function cleanObject (arg0_object, arg1_options) {
  //Convert from parameters
  var object = arg0_object;
  var options = (arg1_options) ? arg1_options : {};

  //Clean stringify object first before parsing remove_zeroes
  var cleaned_object = cleanStringify(object);

  var all_cleaned_keys = Object.keys(cleaned_object);

  //Iterate over all_cleaned_keys
  for (var i = 0; i < all_cleaned_keys.length; i++) {
    var local_value = cleaned_object[all_cleaned_keys[i]];

    if (local_value == undefined || local_value == null)
      delete cleaned_object[all_cleaned_keys[i]];
    if (options.remove_falsey) {
      if (!local_value)
        delete cleaned_object[all_cleaned_keys[i]];
    } else if (options.remove_zeroes) {
      if (local_value == 0)
        delete cleaned_object[all_cleaned_keys[i]];
    }

    //Recursively call function
    if (typeof local_value == "object")
      cleaned_object[all_cleaned_keys[i]] = cleanObject(local_value, options);
  }

  //Return statement
  return cleaned_object;
}

/*
  getDepth() - Returns object depth as a number.
  arg0_object: (Object) - The object to fetch depth for.
  arg1_depth: (Number) - Optimisation parameter used as an internal helper.

  Returns: (Number)
*/
function getDepth (arg0_object, arg1_depth) {
  //Convert from parameters
  var object = arg0_object;
  var depth = (arg1_depth) ? arg1_depth : 1;

  //Iterate over object
  for (var key in object) {
    if (!object.hasOwnProperty(key)) continue;

    if (typeof object[key] == "object") {
      var level = module.exports.getDepth(object[key]) + 1;
      depth = Math.max(depth, level);
    }
  }

  //Return statement
  return depth;
}

/*
  getObjectKey() - Fetches object value from a string (e.g. 'test.one.two')
  arg0_object: (Object) - The object to fetch the key from.
  arg1_key: (String) - The string of the key to fetch from the object.

  Returns: (Variable)
*/
function getObjectKey (arg0_object, arg1_key) {
  //Convert from parameters
  var object = arg0_object;
  var key = arg1_key;

  //Declare local instance variables
  var split_key = (Array.isArray(key)) ? key : key.split(".");
  var return_value;

  if (split_key.length <= 1 && object[split_key[0]]) {
    return_value = object[split_key[0]];
  } else {
    if (object[split_key[0]]) {
      //Preserve old index; pop from front before calling recursion
      var old_index = JSON.parse(JSON.stringify(split_key[0]));
      split_key.shift();
      var found_return_value = getObjectKey(object[old_index], split_key);

      //If value was found, return that
      if (found_return_value)
        return_value = found_return_value;
    }
  }

  //Return statement
  return return_value;
}

//getObjectList() - Returns object as an array list.
//getSubobjectKeys() - Fetches the keys in a subobject that match the given criteria.
//mergeObjects() - Merges two objects together.
//removeZeroes() - Removes zero values from an object.
//sortObject() - Sorts an object.
