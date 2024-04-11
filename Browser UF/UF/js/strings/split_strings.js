/*
  split() - Splits a string in two based on a character index.
  arg0_input_string: (String) - The string to pass to the function.
  arg1_index: (Number) - Optional. The index to split the string on. 0 by default.
*/
function split (arg0_input_string, arg1_index) {
  //Convert from parameters
  var string = arg0_input_string;
  var length = returnSafeNumber(arg1_length, 200);

  //Return statement
  return [string.slice(0, index), string.slice(index)];
}

/*
  splitMarkdownString() - Splits a string according to Markdown, preserving lists, with \n as breakpoints
  arg0_input_string: (String) - The input string to pass to the function.
  arg1_options: (Object)
    maximum_characters: (Number) - Optional. The maximum characters per page. 1024 by default.
    maximum_lines: (Number) - Optional. The maximum lines per page. Undefined by default.
    split_bullet_points: (Boolean) - Optional. Whether to try and keep boolean points together. False by default
*/
function splitMarkdownString (arg0_input_string, arg1_options) {
  //Convert from parameters
}

/*
  splitString() -
*/
