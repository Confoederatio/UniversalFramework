//addRange()/modifyRange() - Adds a number to a range
function addRange (arg0_range, arg1_number) {
  //Convert from parameters
  var range = arg0_range;
  var number = arg1_number;

  //Guard clause for number
  if (isNaN(number)) return range;

  //Add number to range
  range[0] += number;
  range[1] += number;

  //Return statement
  return range;
}

//addRanges() - Adds a range by another
function addRanges (arg0_range, arg1_range) {
  //Convert from parameters
  var range = getRange(arg0_range);
  var ot_range = getRange(arg1_range);

  //Apply operator
  return_range[0] += ot_range[0];
  return_range[1] += ot_range[1];

  //Return statement
  return return_range.sort();
}

//divideRange()
function divideRange (arg0_range, arg1_number) {
  //Convert from parameters
  var range = arg0_range;
  var number = arg1_number;

  //Guard clause for number
  if (isNaN(number)) return range;

  //Divide range by number
  range[0] /= number;
  range[1] /= number;

  //Return statement
  return range;
}

//divideRanges()
function divideRanges (arg0_range, arg1_range) {
  //Convert from parameters
  var range = getRange(arg0_range);
  var ot_range = getRange(arg1_range);

  //Apply operator
  range[0] /= ot_range[0];
  range[1] /= ot_range[1];

  //Return statement
  return range.sort();
}

//exponentiateRange()
function exponentiateRange (arg0_range, arg1_power) {
  //Convert from parameters
  var range = getRange(arg0_range);
  var power = arg1_power;

  //Guard clause for power
  if (isNaN(power)) return power;

  //Exponentiate range by power
  range[0] = Math.pow(range[0], power);
  range[1] = Math.pow(range[1], power);

  //Return statement
  return range.sort();
}

//exponentiateRanges()
function exponentiateRanges (arg0_range, arg1_range) {
  //Convert from parameters
  var range = getRange(arg0_range);
  var ot_range = getRange(arg1_range);

  //Apply operator
  range[0] = Math.pow(range[0], ot_range[0]);
  range[1] = Math.pow(range[1], ot_range[1]);

  //Return statement
  return range.sort();
}

//getMidpoint()
function getMidpoint (arg0_range) {
  //Convert from parameters
  var range = getRange(arg0_range);

  //Return statement
  return (range[0] + range[1])/2;
}

//getRange()
function getRange (arg0_range) {
  //Convert from parameters
  var range = arg0_range;

  //Declare local instance variables
  var range_array = [];

  //Check if range is Array
  if (Array.isArray(range)) {
    if (range.length >= 2) {
      range_array = [range[0], range[1]];
    } else if (range.length == 1) {
      range_array = [range[0], range[0]];
    } else {
      range_array = [0, 0];
    }
  } else if (typeof range == "number") {
    range_array = [range, range];
  }

  //Return statement
  return JSON.parse(JSON.stringify(range_array.sort()));
}

//multiplyRange()
function multiplyRange (arg0_range, arg1_number) {
  //Convert from parameters
  var range = getRange(arg0_range);
  var number = arg1_number;

  //Apply operator
  range[0] *= number;
  range[1] *= number;

  //Return statement
  return range.sort();
}

//multiplyRanges()
function multiplyRanges (arg0_range, arg1_range) {
  //Convert from parameters
  var range = getRange(arg0_range);
  var ot_range = getRange(arg1_range);

  //Apply operator
  range[0] *= ot_range[0];
  range[1] *= ot_range[1];

  //Return statement
  return range.sort();
}

//rootRange()
function rootRange (arg0_range, arg1_root) {

}

//rootRanges() - Roots ranges by one another
function rootRanges (arg0_range, arg1_range) {
  //Convert from parameters
  var range = getRange(arg0_range);
  var ot_range = getRange(arg1_range);

  //Apply operator
  range[0] = root(range[0], ot_range[0]);
  range[1] = root(range[1], ot_range[1]);

  //Return statement
  return range.sort();
}

//subtractRange()
function subtractRange (arg0_range, arg1_number) {
  //Convert from parameters
  var range = getRange(arg0_range);
  var number = arg1_number;

  //Apply operator
  range[0] -= number;
  range[1] -= number;

  //Return statement
  return range.sort();
}

//subtractRanges()
function subtractRanges (arg0_range, arg1_range) {
  //Convert from parameters
  var range = getRange(arg0_range);
  var ot_range = getRange(arg1_range);

  //Apply operator
  range[0] -= ot_range[0];
  range[1] -= ot_range[1];

  //Return statement
  return range.sort();
}

//KEEP AT BOTTOM! Initialise function aliases
{
  global.modifyRange = addRange;
}
