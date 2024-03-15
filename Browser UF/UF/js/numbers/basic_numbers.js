//arabicise() - Arabicises a Roman numeral string.
function arabicise (arg0_number) {
  //Convert from parameters
  var number = arg0_number;

  //Declare local instance variables and reference arrays
  var previous_value = 0;
  var result = 0;
  var roman_dictionary = {
    M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1,
    m: 1000, d: 500, c: 100, l: 50, x: 10, v: 5, i: 1
  };
  var total = 0;

  for (var i = number.length - 1; i >= 0; i--) {
    var current_value = roman_dictionary[number[i]];

    result += (current_value < previous_value) ?
      current_value*-1 :
      current_value;

    previous_value = current_value;
  }

  //Return statement
  return result;
}

//degreesToRadians() - Converts degrees to radians.
function degreesToRadians (arg0_degrees) {
  //Convert from parameters
  var degrees = arg0_degrees;

  //Return statement
  return degrees*(Math.PI/180);
}

//deordinalise() - Strip ordinals from a string and convert it to a number (e.g. '2nd' = 2).
function deordinalise (arg0_string) {
  //Convert from parameters
  var deordinalised_string = arg0_string;

  //Declare local instance variables
  var ordinals = ["st", "nd", "rd", "th"];

  //Split deordinalised_string into multiple chunks, remove stray ordinals
  deordinalised_string = (deordinalised_string.includes(" ")) ?
    deordinalised_string.split(" ") : [deordinalised_string];

  for (var i = 0; i < deordinalised_string.length; i++) {
    for (var x = 0; x < ordinals.length; x++)
      if (deordinalised_string[i].indexOf(ordinals[x]) == 0)
        deordinalised_string[i] = deordinalised_string[i].replace(ordinals[x], "");
    if (deordinalised_string[i] == "")
      deordinalised_string.splice(i, 1);
  }

  //Iterate over to purge ordinals
  for (var i = 0; i < deordinalised_string.length; i++) {
		//Look for ordinal
		var ordinal_found = false;

    //Check if an ordinal was found
		for (var x = 0; x < ordinals.length; x++)
			if (deordinalised_string[i].indexOf(ordinals[x]) != -1)
				ordinal_found = true;

		var total_ordinal_amount = (ordinal_found) ? 2 : 0;
		var ordinal_percentage = total_ordinal_amount/deordinalised_string[i].length;

		if (ordinal_percentage > 0.67) //Ordinal makes up majority of string, so delete
			deordinalised_string.splice(i, 1);
	}

  //Return statement
	return deordinalised_string.join(" ").trim();
}

//exp() - Exponentiates a number.
function exp (arg0_number, arg1_number) {
  //Convert from parameters
  var base = arg0_number;
  var power = arg1_number;

  //Return statement
  return Math.pow(base, power);
}

//factorial() - Calculates the factorial of a number.
function factorial (arg0_number) {
  //Convert from parameters
  var number = parseInt(arg0_number);

  //Guard clause
  if (isNaN(number)) return number;

  //Declare local instance variables
  var f_array = [];

  //Memorisation algorithm
  if (number == 0 || number == 1)
    return 1;
  if (f_array[number] > 0)
    return f_array[number];

  //Return statement
  return f_array[number] = factorial(number - 1)*number;
}

/*
generateRandomID() - Generates a random ID.
arg0_object: (Object) - The object relative to which the ID is being generated; making sure to avoid duplicate IDs.
*/

function generateRandomID (arg0_object) {
  //Convert from parameters
  var input_object = arg0_object;

  //Declare local instance variables
  var random_id = randomNumber(0, 100000000000).toString();

  //Check if input_object is defined
  if (typeof input_object == "object") {
    while (true) {
      var local_id = generateRandomID();

      //Return and break once a true ID is found
      if (!input_object[local_id]) {
        return local_id;
        break;
      }
    }
  } else {
    return random_id;
  }
}

//log() - Calculates log/natural log
function log (arg0_x, arg1_y) {
  //Convert from parameters
  var x = arg0_x;
  var y = arg1_y;

  //Return statement
  return (x != undefined && y != undefined) ?
    Math.log(y)/Math.log(x) :
    Math.log(x);
}

//logFactorial() - Calculates the log of a factorial
function logFactorial (arg0_number) {
  //Convert from parameters
  var number = arg0_number;

  //Return statement
  if (number == 0 || number == 1) {
    return 0; //log(0!) = log(1!) = 0
  } else {
    var result = 0;

    for (var i = 2; i <= number; i++)
      result += Math.log(i);

    return result;
  }
}

//max() - Fetches the maximum value inside a variable
function max (arg0_variable) {
  //Convert from parameters
  var list_variable = getList(arg0_variable);

  //Declare local instance variables
  var maximum;

  //Iterate over list_variable
  for (var i = 0; i < list_variable.length; i++) {
    if (typeof list_variable[i] == "number")
      if (!maximum || list_variable[i] > maximum)
        maximum = list_variable[i];
  }

  //Return statement
  return maximum;
}

//min() - Fetches the minimum value inside a variable
function min (arg0_variable) {
  //Convert from parameters
  var list_variable = getList(arg0_variable);

  //Declare local instance variables
  var minimum;

  //Iterate over list_variable
  for (var i = 0; i < list_variable.length; i++) {
    if (typeof list_variable[i] == "number")
      if (!minimum || list_variable[i] < minimum)
        minimum = list_variable[i];
  }

  //Return statement
  return minimum;
}

//radiansToDegrees() - Converts radians to degrees
function radiansToDegrees (arg0_radians) {
  //Convert from parameters
  var radians = arg0_radians;

  //Return statement
  return (radians*180)/Math.PI;
}

//randomNumber() - Generates a random number between min and max
function randomNumber (arg0_min, arg1_max, arg2_do_not_round) {
  //Convert from parameters
  var min = arg0_min;
  var max = arg1_max;
  var do_not_round = arg2_do_not_round;

  //Declare local instance variables
  var random_number = Math.random()*(max - min) + min;

  //Return statement
  return (!do_not_round) ? Math.round(random_number) : random_number;
}

//returnSafeNumber() - Returns a safe number
function returnSafeNumber (arg0_operation, arg1_default) {
  //Convert from parameters
  var operation = arg0_operation;
  var default_number = (arg1_default) ? arg1_default : 0;

  //Return statement
  return (!isNaN(operation) && isFinite(operation) && operation != undefined && operation != null) ?
    operation :
    default_number;
}

//romanise() - Romanises an arabic number and returns it as a string
function romanise (arg0_number) {
  //Convert from parameters
  var number = arg0_number;

  //Declare local instance variables
  var i;
  var roman_dictionary = {
    M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1,
    m: 1000, d: 500, c: 100, l: 50, x: 10, v: 5, i: 1
  };
  var roman_string = "";

  //i in roman_dictionary
  for (i in roman_dictionary)
    while (number >= roman_dictionary[i]) {
      roman_string += i;
      number -= roman_dictionary[i];
    }

  //Return statement
  return roman_string;
}

//root() - Nth roots a number.
function root (arg0_number, arg1_root) {
  //Convert from parameters
  var number = arg0_number;
  var root = arg1_root;

  //Conduct nth root operation
  try {
    var negate = (root % 2 == 1 && number < 0);
    var possible = Math.pow(number, 1/root);

    if (negate) number = -number;
    root = Math.pow(possible, root);

    //Return statement
    if (Math.abs(number - root) < 1 && (number > 0 == root > 0))
      return negate ? -possible : possible;
  } catch {}
}

//round() - Rounds a number to n places
function round (arg0_number, arg1_rounding_places) {
  //Convert from parameters
  var number = arg0_number;
  var rounding_places = arg1_rounding_places;

  //Declare local instance variables
  var multiplier = Math.pow(10, rounding_places);

  //Return statement
  return Math.round(number*multiplier)/multiplier;
}

//sigfig() - Rounds a number to n significant figures
function sigfig (arg0_number, arg1_sigfigs) {
  //Convert from parameters
  var number = arg0_number;
  var sigfigs = arg1_sigfigs;

  //Guard clause
  if (number == 0) return 0;

  //Declare local instance variables
  var magnitude = Math.floor(Math.log10(Math.abs(number))) + 1;
  var multiplier = Math.pow(10, n - magnitude);

  //Return statement
  return Math.round(number*multiplier)/multiplier;
}

//splitNumber() - Splits a number randomly into multiple parts
function splitNumber (arg0_number, arg1_parts) {
  //Convert from parameters
  var number = arg0_number;
  var parts = arg1_parts;

  //Return statement
  return [...module.exports.splitNumberParts(number, parts)];
}

//splitNumberParts() - Internal helper function for splitNumber()
function* splitNumberParts (arg0_number, arg1_parts) {
  //Convert from parameters
  var number = arg0_number;
  var parts = arg1_parts;

  //Declare local instance variables
  var sum_parts = 0;

  //Split number randomly
  for (var i = 0; i < parts - 1; i++) {
    var part_number = Math.random()*(number - sum_parts);
    yield part_number;
    sum_parts += part_number;
  }

  yield number - sum_parts;
}

//unzero() - Makes sure to unzero a figure. Useful to avoid dividing by 0. 1 by default
function unzero (arg0_number, arg1_default) {
  //Convert from parameters
  var number = returnSafeNumber(arg0_number);
  var default_number = (arg1_default) ? arg1_default : 1;

  //Return statement
  return (number != 0) ? number : default_number;
}

//KEEP AT BOTTOM! Initialise function aliases
{
  global.random = Math.random;
}
