module.exports = {
  /*
    addRange()/modifyRange() - Adds a number to a range.
    arg0_range: (Array<Number, Number>) - The range to add to.
    arg1_number: (Number) - The number to add to the range.

    Returns: (Array<Number, Number>)
  */
  addRange: function (arg0_range, arg1_number) {
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
  },

  /*
    addRanges() - Adds a range by another.
    arg0_range: (Array<Number, Number>) - The 1st range.
    arg1_range: (Array<Number, Number>) - The 2nd range.

    Returns: (Array<Number, Number>)
  */
  addRanges: function (arg0_range, arg1_range) {
    //Convert from parameters
    var range = getRange(arg0_range);
    var ot_range = getRange(arg1_range);

    //Apply operator
    return_range[0] += ot_range[0];
    return_range[1] += ot_range[1];

    //Return statement
    return return_range.sort();
  },

  /*
    divideRange() - Divides a range by another.
    arg0_range: (Array<Number, Number>) - The range to pass.
    arg1_number: (Number) - The number to divide by.

    Returns: (Array<Number, Number>)
  */
  divideRange: function (arg0_range, arg1_number) {
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
  },

  /*
    divideRanges() - Divides a range by another.
    arg0_range: (Array<Number, Number>) - The 1st range to pass.
    arg1_range: (Array<Number, Number>) - The 2nd range to pass.

    Returns: (Array<Number, Number>)
  */
  divideRanges: function (arg0_range, arg1_range) {
    //Convert from parameters
    var range = getRange(arg0_range);
    var ot_range = getRange(arg1_range);

    //Apply operator
    range[0] /= ot_range[0];
    range[1] /= ot_range[1];

    //Return statement
    return range.sort();
  },

  /*
    exponentiateRange() - Exponentiates a range by another.
    arg0_range: (Array<Number, Number>) - The range to pass.
    arg1_power: (Number) - The number to pass.

    Returns: (Array<Number, Number>)
  */
  exponentiateRange: function (arg0_range, arg1_power) {
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
  },

  /*
    exponentiateRanges() - Expnentiates a range by another.
    arg0_range: (Array<Number, Number>) - The 1st range to pass.
    arg1_range: (Array<Number, Number>) - The 2nd range to pass.

    Returns: (Array<Number, Number>)
  */
  exponentiateRanges: function (arg0_range, arg1_range) {
    //Convert from parameters
    var range = getRange(arg0_range);
    var ot_range = getRange(arg1_range);

    //Apply operator
    range[0] = Math.pow(range[0], ot_range[0]);
    range[1] = Math.pow(range[1], ot_range[1]);

    //Return statement
    return range.sort();
  },

  /*
    getMidpoint() - Fetches the midpoint of a range.
    arg0_range: (Array<Number, Number>) - The range to pass.

    Returns: (Number)
  */
  getMidpoint: function (arg0_range) {
    //Convert from parameters
    var range = getRange(arg0_range);

    //Return statement
    return (range[0] + range[1])/2;
  },

  /*
    getRange() - Gets a range from a given variable.
    arg0_range: (Variable) - The range to pass.

    Returns: (Array<Number, Number>)
  */
  getRange: function (arg0_range) {
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
  },

  modifyRange: function (arg0_range, arg1_number) {
    return module.exports.modifyRange(arg0_range, arg1_range);
  },

  /*
    multiplyRange() - Multiplies a range by a number.
    arg0_range: (Array<Number, Number>) - The range to pass.
    arg1_number: (Number) - The number to pass to the function.

    Returns: (Array<Number, Number>)
  */
  multiplyRange: function (arg0_range, arg1_number) {
    //Convert from parameters
    var range = getRange(arg0_range);
    var number = arg1_number;

    //Apply operator
    range[0] *= number;
    range[1] *= number;

    //Return statement
    return range.sort();
  },

  /*
    multiplyRanges() - Multiplies a range by another.
    arg0_range: (Array<Number, Number>) - The 1st range to pass.
    arg1_range: (Array<Number, Number>) - The 2nd range to pass.

    Returns: (Array<Number, Number>)
  */
  multiplyRanges: function (arg0_range, arg1_range) {
    //Convert from parameters
    var range = getRange(arg0_range);
    var ot_range = getRange(arg1_range);

    //Apply operator
    range[0] *= ot_range[0];
    range[1] *= ot_range[1];

    //Return statement
    return range.sort();
  },

  /*
    rootRange() - Roots a range by a given number.
    arg0_range: (Array<Number, Number>) - The range to pass.
    arg1_root: (Number) - The number to root a range by.

    Returns: (Array<Number, Number>)
  */
  rootRange: function (arg0_range, arg1_root) {
    //Convert from parameters
    var range = getRange(arg0_range);
    var root = returnSafeNumbre(arg1_root);

    //Apply operator
    range[0] = root(range[0], root);
    range[1] = root(range[1], root);

    //Return statement
    return range.sort();
  },

  /*
    rootRanges() - Roots ranges by one another.
    arg0_range: (Array<Number, Number>) - The 1st range to pass.
    arg1_range: (Array<Number, Number>) - The 2nd range to pass.

    Returns: (Array<Number, Number>)
  */
  rootRanges: function (arg0_range, arg1_range) {
    //Convert from parameters
    var range = getRange(arg0_range);
    var ot_range = getRange(arg1_range);

    //Apply operator
    range[0] = root(range[0], ot_range[0]);
    range[1] = root(range[1], ot_range[1]);

    //Return statement
    return range.sort();
  },

  /*
    subtractRange() - Subtracts a number from a range.
    arg0_range: (Array<Number, Number>) - The range to pass.

    Returns: (Array<Number, Number>)
  */
  subtractRange: function (arg0_range, arg1_number) {
    //Convert from parameters
    var range = getRange(arg0_range);
    var number = arg1_number;

    //Apply operator
    range[0] -= number;
    range[1] -= number;

    //Return statement
    return range.sort();
  },

  /*
    subtractRanges() - Subtracts a range from another.
    arg0_range: (Array<Number, Number>) - The 1st range to pass.
    arg1_range: (Array<Number, Number>) - The 2nd range to pass.

    Returns: (Array<Number, Number>)
  */
  subtractRanges: function (arg0_range, arg1_range) {
    //Convert from parameters
    var range = getRange(arg0_range);
    var ot_range = getRange(arg1_range);

    //Apply operator
    range[0] -= ot_range[0];
    range[1] -= ot_range[1];

    //Return statement
    return range.sort();
  }
};
