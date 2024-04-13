/*
  adjustObjectHistory() - Adjusts an object history keyframe to that of another date/timestamp.
  arg0_object: (Object) - The object being referenced.
  arg1_date_object: (String/Object, Date) - The keyframe to move.
  arg2_date_object: (String/Object, Date) - The date to move the keyframe to.

  Returns: (Object)
*/
function adjustObjectHistory (arg0_object, arg1_date_object, arg2_date_object) {
  //Convert from parameters
  var local_object = arg0_object;
  var entry_date = arg1_date;
  var move_to_date = arg2_date;

  //Declare local instance variables
  var history_entry = getObjectHistory(local_object, entry_date);
  var new_timestamp = getTimestamp(move_to_date);
  var old_timestamp = getTimestamp(parseTimestamp(entry_date));

  //Move history_entry to new_timestamp
  if (history_entry)
    if (history_entry.id != timestampToInt(new_timestamp)) {
      //Move to new_timestamp
      local_object.options.history[new_timestamp] = history_entry;
      var new_history_entry = entity_obj.options.history[new_timestamp];

      //Delete old timestamp; change ID
      delete entity_obj.options.history[old_timestamp];
      new_history_entry.id = timestampToInt(new_timestamp);

      entity_obj.options.history = sortObject(entity_obj.options.history, "numeric_ascending");
    }

  //Return statement
  return local_object;
}

/*
  createObjectHistory() - Creates an object history keyframe at the current date.
  arg0_object: (Object) - The object being referenced.
  arg1_date_object: (String/Object, Date) - The date to create a history keyframe at.
  arg2_options: (Object) - Optional. The actual .options styling data being carried at this frame. Undefined by default
  arg3_coords: (Array<Array<Number, Number>, ...>) - The coordinates to input for this frame. Defaults to old coordinates if available.
*/
function createObjectHistory (arg0_object, arg1_date_object, arg2_options, arg3_coords) {
  //Convert from parameters
  var local_object = arg0_object;
  var date = arg1_date_object;
  var options = arg2_options;
  var coords = arg3_coords;

  //Declare local instance variables
  var date_string = getTimestamp(date);
  var old_history_entry = getObjectHistory(local_object, date);

  if (entity_obj) {
    //Make sure history object is initialised
    if (!local_object.options) local_object.options = {};
    if (!local_object.options.history) local_object.options.history = {};

    //Fetch actual_coords
    var actual_coords;

    if (!coords) {
      if (old_history_entry)
        actual_coords = old_history_entry.coords;
    } else {
      actual_coords = coords;
    }

    //Create new history object
    if (!local_object.options.history[date_string])
      local_object.options.history[date_string] = {
        id: timestampToInt(date_string),
        coords: actual_coords,
        options: {};
      };

    //Manually transcribe options to avoid recursion
    
  }
}

/*
  deleteObjectHistory()
*/

/*
  getFirstHistoryFrame()
*/

/*
  getHistoryCoords()
*/

/*
  getHistoryFrame()
*/

/*
  getLastCoords()
*/

/*
  getLastIdenticalCoords()
*/

/*
  getObjectHistory()
*/
