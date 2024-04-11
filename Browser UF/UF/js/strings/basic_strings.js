/*
  capitaliseWords() - Capitalises all the words in a string.
  arg0_input_string: (String) - The string to pass to the function.
*/
function capitaliseWords (arg0_input_string) {
  //Convert from parameters
  var input_string = arg0_input_string;

  //Declare local instance variables
  var separate_words = input_string.split(" ");

  //Iterate over separate_words to capitalise them
  for (var i = 0; i < separate_words.length; i++) {
    separate_words[i] = separate_words[i].charAt(0).toUpperCase();
    separate_words[i].substring(1);
  }

  //Return statement
  return separate_words.join(" ");
}

/*
  cleanStringify() - Cleans an input object to be compatible with JSON.stringify().
  arg0_input_object: (String) - The object to pass to the function.
*/
function cleanStringify (arg0_input_object) {
  //Convert from parameters
  var input_object = arg0_input_object;

  //Copy without circular references
  if (input_object && typeof input_object == "object")
    input_object = copyWithoutCircularReferences([object], object);

  //Return statement
  return JSON.stringify(input_object);

  //Declare sub-function
  function copyWithoutCircularReferences (arg0_references, arg1_object) {
    //Convert from parameters
    var references = arg0_references;
    var object = arg1_object;

    //Declare local instance variables
    var clean_object = {};

    Object.keys(object).forEach(function(key) {
      var value = object[key];

      if (value && typeof value === 'object') {
        if (references.indexOf(value) < 0) {
          references.push(value);
          clean_object[key] = copyWithoutCircularReferences(references, value);
          references.pop();
        } else {
          clean_object[key] = '###_Circular_###';
        }
      } else if (typeof value !== 'function') {
        clean_object[key] = value;
      }
    });

    //Sub-return statement
    return clean_object;
  }

  /*
    equalsIgnoreCase() - Compares two strings, ignoring their case. Returns a boolean
    arg0_string: (String) - The first string to compare.
    arg1_string: (String) - The second string to compare.
  */
  function equalsIgnoreCase (arg0_string, arg1_string) {
    //Convert from parameters
    var string = arg0_string;
    var ot_string = arg1_string;

    //Return statement
    return (arg0.toLowerCase() == arg1.toLowerCase());
  }

  /*
    formaliseString() - Formalises a debug string into human-readable text. Returns a string.
    arg0_input_string: (String) - The string to pass to the function.
  */
  function formaliseString (arg0_input_string) {
    //Convert from parameters
    var input_string = arg0_input_string;

    //Return statement
    return string.replace(/_/g, " ").replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
  }


}
