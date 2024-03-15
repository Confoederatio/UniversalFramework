/*
  createAction() - Sets the action performed in the current timeline.
  options: {
    name: (String) - The human-readable name of the action.

    function: (String) - The function key which performs the action
    reverse_function: (String) - The function key which reverses the action

    <variable_name>: (Variable) - Other flags to transfer over to the action object.
  }
*/
function createAction (arg0_action_key, arg1_options) {
  //Convert from parameters
  var action_key = arg0_action_key;
  var options = (arg1_options) ? arg1_options : {};

  //Declare local instance variables
  var all_options = Object.keys(options);

  //Just make sure global.actions exists
  initialiseUndoRedo();

  //Set action
  global.actions[action_key] = {
    id: action_key
  };

  //Iterate over all_options
  for (var i = 0; i < all_options.length; i++)
    global.actions[action_key][all_options[i]] = options[all_options[i]];

  //Return statement
  return global.actions[action_key];
}

//deleteAction() - Deletes an action from the action config
function deleteAction (arg0_action_key) {
  //Convert from parameters
  var action_key = arg0_action_key;

  //Just make sure global.actions exists
  initialiseUndoRedo();

  //Remove action
  delete global.actions[action_key];
}

//initialiseUndoRedo() - Initialises action config/caching if necessary
function initialiseUndoRedo () {
  //Initialises global variables for actions/timelines respectively
  if (!global.actions) global.actions = {};
  if (!global.timelines) global.timelines = {};

  if (!global.actions.current_timeline) {
    var current_timeline_id = generateRandomID(global.timelines);

    global.actions.current_index = 0;
    global.actions.current_timeline = current_timeline_id;
    global.actions.initial_timeline = current_timeline_id;
    global.timelines[current_timeline_id] = [];
  }
}
