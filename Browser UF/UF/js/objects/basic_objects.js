//cleanObject() - Removes both zero values and undefined/null values from an object by default.
function cleanObject (arg0_object) {

}

//getDepth() - Returns object depth as a number.
//getObjectKey() - Fetches object value from a string (e.g. 'test.one.two')
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
