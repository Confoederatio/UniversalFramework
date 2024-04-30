//Hierarchy Context menu UI functions
{
  /*
    closeHierarchyContextMenu() - Invokes hideElement() on an HTMLElement representing a context menu.
    arg0_context_menu_element: (HTMLElement) - The element to hide.
  */
  function closeHierarchyContextMenu (arg0_context_menu_element) { //[WIP] - Document
    //Declare local instance variables
    var hierarchy_context_menu_el = arg0_context_menu_element;

    //Hide element
    hideElement(hierarchy_context_menu_el);
  }

  /*
    printHierarchyContextMenu() - Displays a hierarchy context menu.
    arg0_element: (HTMLElement) - The HTML element representing the hierarchy.
    arg1_context_menu_element: (HTMLElement) - The div container to set the context menu element in.
    arg2_group_id: (String) - The ID of the group for which to print the context menu.
    arg3_html: (String) - The innerHTML to pass to the context menu.
  */
  function printHierarchyGroupContextMenu (arg0_element, arg1_context_menu_element, arg2_group_id, arg3_html) {
    //Convert from parameters
    var hierarchy_el = arg0_context_menu_element;
    var hierarchy_context_el = arg1_context_menu_element;
    var group_id = arg2_group_id;
    var html = arg3_html;

    //Declare local instance variables
    var group_el = hierarchy_el.querySelector(`div.group[id="${group_id}"]`);
    var offset_top = group_el.offsetTop - hierarchy_context_el.scrollTop;

    //Check if group exists
    if (group_el) {
      showElement(hierarchy_context_el);
      hierarchy_context_el.setAttribute("style", `top: calc(${offset_top}px);`);

      hierarchy_context_el.innerHTML = html;
    }
  }
}

//Internal helper functions
{
  /*
    createGroupElement() - Creates a group element for a given hierarchy context menu.
    arg0_hierarchy_obj: (Object) - The object where groups/items are stored in a flattened recursive hierarchy.
    arg1_group_id: (String) - The ID of the group to create.
    arg2_function: (Function) - Optional. The function to pass when the item is clicked.

    Returns: (HTMLElement)
  */
  function createGroupElement (arg0_hierarchy_obj, arg1_group_id, arg2_function) {
    //Convert from parameters
    var hierarchy_obj = arg0_hierarchy_obj;
    var group_id = arg1_group_id;
    var local_function = arg2_function;

    //Declare local instance variables
    var ctx_menu_el = document.createElement("img");
    var group_class = `group`;
    var header_el = document.createElement("input");
    var local_el = document.createElement("div");
    var local_entities_el = document.createElement("div");
    var local_groups = hierarchy_obj.groups;
    var local_subgroups_el = document.createElement("div");

    var group_obj = local_groups[group_id];

    //Initialise local instance variables
    {
      if (group_obj.mask)
        group_class += ` mask-${group_obj.mask}`;
    }

    //Set element formatting
    ctx_menu_el.setAttribute("class", "group-context-menu-icon");
    ctx_menu_el.setAttribute("draggable", "false");
    ctx_menu_el.setAttribute("src", "./gfx/interface/context_menu_icon.png");
    ctx_menu_el.setAttribute("onclick", `toggleSidebarContextMenu('${group_id}');`);

    local_el.setAttribute("class", group_class);
    local_el.setAttribute("id", group_id);
    local_el.setAttribute("onmouseout", "updateSidebarHover();");
    local_el.setAttribute("onmouseover", "updateSidebarHover();");

    local_entities_el.setAttribute("id", `${group_id}-entities`);
    local_entities_el.setAttribute("class", `entities`);
    local_subgroups_el.setAttribute("id", `${group_id}-subgroups`);
    local_subgroups_el.setAttribute("class", `subgroups`);

    //Make sure local group exists
    if (group_obj) {
      //Add header_el to local_el
      header_el.setAttribute("onkeyup", "updateAllGroups(true);");
      header_el.value = group_obj.name;

      //Append all items
      if (group_obj.entities)
        for (var i = 0; i < group_obj.entities.length; i++)
          try {
            local_entities_el.appendChild(
              createItemElement(hierarchy_obj, group_obj.entities[i])
            );
          } catch (e) {
            console.warn(e);
          }

      //Append local_subgroups_el, local_entities_el to local_el
      local_el.appendChild(header_el);
      local_el.appendChild(ctx_menu_el);

      local_el.appendChild(local_subgroups_el);
      local_el.appendChild(local_entities_el);

      local_el.onclick = function (e) {
        (local_function) ?
          local_function :
          editHierarchyElement(e);
      };

      //Return statement
      return local_el;
    }
  }

  /*
    createItemElement() - Creates an item element for a given hierarchy context menu.
    arg0_hierarchy_obj: (Object) - The hierarchy object holding the various groups/items.
    arg1_item_id: (String) - The item ID to pass.
    arg2_options: (Object)
      is_hidden: (Boolean) - Whether the item is currently hidden.
      name: (String) - The current name of the element.
      selected_elements_array: (Array<String>) - The selected elements object to currently pass.
      sidebar_info_el: (HTMLElement) - The element that displays current selection data.

    Returns: (HTMLElement)
  */
  function createItemElement (arg0_hierarchy_obj, arg1_item_id, arg2_options) {
    //Convert from parameters
    var hierarchy_obj = arg0_hierarchy_obj;
    var item_id = arg1_item_id;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var item_obj = getItem(item_id, hierarchy_obj);

    //Check if item object exists
    if (item_obj) {
      var header_el = document.createElement("input");
      var is_hidden = isPolityHidden(item_id, window.date);
      var local_el = document.createElement("div");

      var item_class = `item${(selected_elements_array.includes(item_id)) ? " selected" : ""}`;

      //Initialise local instance variables
      if (is_hidden)
        item_class += ` extinct`;

      local_el.setAttribute("class", item_class);
      local_el.setAttribute("id", item_id);

      header_el.setAttribute("onkeyup", "updateAllGroups(true);");
      header_el.value = (options.name) ? options.name : `New Item`;

      //Append all formatted elements
      local_el.appendChild(header_el);
      local_el.onclick = function (e) {
        editHierarchyElement(e);

        if (window.ctrl_pressed)
          if (!selected_elements_array.includes(item_id)) {
            selected_elements_array.push(item_id);
          } else {
            //Remove from selection
            for (var i = 0; i < selected_elements_array.length; i++)
              if (selected_elements_array[i] == item_id)
                selected_elements_array.splice(i, 1);
          }

        //Append class if selected, remove selected class if not
        if (selected_elements_array.includes(item_id)) {
          if (!local_el.getAttribute("class").includes("selected"))
            local_el.setAttribute("class", `${local_el.getAttribute("class")} selected`);
        } else {
          local_el.setAttribute("class", local_el.getAttribute("class").replace(" selected", ""));
        }

        //Update hierarchy selection information last
        if (options.sidebar_info_el)
          updateHierarchySelectionInformation(options.sidebar_info_el);
      };
    }
  }

  /*
    editHierarchyElement() - Edits a hierarchy element.
    e: (Event) - The event to pass.
  */
  function editSidebarElement (e) {
    //Declare local instance variables
    var context_menu_clicked = false;
    var name_field_el = document.querySelectorAll(`div:hover > input`);

    //Check if context menu was clicked
    if (e.composedPath())
      if (e.composedPath()[0].getAttribute("class"))
        if (e.composedPath()[0].getAttribute("class").includes("context-menu-icon"))
          context_menu_clicked = true;

    //Focus on element if not a context menu
    if (name_field_el.length > 0 && !context_menu_clicked)
      name_field_el[name_field_el.length - 1].focus();
  }

  /*
    generateGroupID() - Generates a group ID from a given hierarchy element.
    arg0_element: (HTMLElement) - The context menu element representing the hierarchy.

    Returns: (String)
  */
  function generateGroupID (arg0_element) {
    //Convert from parameters
    var hierarchy_el = arg0_element;

    //While loop to find ID, just in-case of conflicting random IDs:
    while (true) {
      var id_taken = false;
      var local_id = generateRandomID();

      //Check to see if ID is already taken in sidebar
      var identical_groups_el = sidebar_el.querySelectorAll(`[id='${local_id}']`);

      if (identical_groups_el.length == 0) {
        //Return statement
        return local_id;
        break;
      }
    }
  }

  /*
    getRecursiveGroupElement() - Returns a group element recursively in terms of raw HTML.
    arg0_hierarchy_obj: (Object) - The hierarchy to pass to the function.
    arg1_group_id: (String) - The Group ID for which to generate the element.
    arg2_el: (HTMLElement) - Optional. The pre-existing group element to use. Generates a new one if not defined.

    Returns: (HTMLElement)
  */
  function getRecursiveGroupElement (arg0_hierarchy_obj, arg1_group_id, arg2_el) {
    //Convert from parameters
    var hierarchy_obj = arg0_hierarchy_obj;
    var group_id = arg1_group_id;
    var local_el = (arg2_el) ? arg2_el : createGroupElement(hierarchy_obj, group_id);

    //Declare local instance variables
    var local_groups = hierarchy_obj.groups;

    var all_local_groups = Object.keys(local_groups);
    var local_group = local_groups[group_id];

    //Only keep going if group has subgroups
    if (local_group)
      if (local_group.subgroups)
        if (local_group.subgroups.length > 0)
          for (var i = 0; i < local_group.subgroups.length; i++) {
            var local_subgroup = local_groups[local_group.subgroups[i]];
            var local_subgroup_el = getRecursiveGroupElement(hierarchy_obj, local_group.subgroups[i]);

            //Append everything else
            if (local_subgroup_el)
              local_el.querySelector(`[id='${group_id}-subgroups']`).appendChild(local_subgroup_el);
          }

    //Return statement
    return local_el;
  }

  function getUngroupedItems (arg0_hierarchy_obj) {
    //Convert from parameters
    var hierarchy_obj = arg0_hierarchy_obj;

    //Declare local instance variables
    var local_groups = hierarchy_obj.groups;
    var local_items = hierarchy_obj.items;

    var all_local_groups = Object.keys(local_groups);
    var grouped_items = [];
    var ungrouped_items = [];

    //Iterate over all_local_groups to push to grouped_items
    for (var i = 0; i < all_local_groups.length; i++) {
      var local_group = local_groups[all_local_groups[i]];

      if (local_group.entities)
        for (var x = 0; x < local_group.entities.length; x++)
          if (!grouped_items.includes(local_group.entities[x]))
            grouped_items.push(local_group.entities[x]);
    }

    //Iterate over all local_items elements, check against grouped_items
    for (var i = 0; i < local_items.length; i++)
      if (!grouped_items.includes(local_items[i].id))
        ungrouped_items.push(local_items[i].id);

    //Return statement
    return ungrouped_items;
  }

  /*
    hideHierarchy() - Hides a hierarchy in a given context menu.
    arg0_element: (HTMLElement) - The context menu element representing the hierarchy.
  */
  function hideHierarchy (arg0_element) {
    //Convert from parameters
    var hierarchy_el = arg0_element;

    //Close hierarchy menu
    if (!hierarchy_el.getAttribute("class").includes("display-none"))
      hierarchy_el.setAttribute("class",
        hierarchy_el.getAttribute("class") + " display-none"
      );
    hierarchy_el.removeAttribute("group");
  }

  /*
    initHierarchy() - Initialises a hierarchy within a given HTMLElement.
    arg0_element: (HTMLElement) - The context menu element representing the hierarchy.
    arg1_context_menu_element: (HTMLElement) - The subcontext menu for the hierarchy to open/close, if it exists
    arg2_storage_variable: (Object) - The storage object which to reference for storing groups/items.
  */
  function initHierarchy (arg0_element, arg1_context_menu_element, arg2_storage_variable) { //[WIP] - Document
    //Convert from parameters
    var sidebar_el = arg0_element;
    var context_menu_el = arg1_context_menu_element;
    var storage_variable = arg2_storage_variable;

    //Declare local instance variables
    var add_group_btn_el = sidebar_el.querySelector(`#add-group-button`);

    //Declare globals
    if (!window.hierarchies)
      window.hierarchies = [];
    window[storage_variable] = {};
    window.hierarchies.push(window[storage_variable]);

    //Button handlers
    add_group_btn_el.onclick = function () {
      createGroup(sidebar_el);
    };

    //Sidebar click handler
    if (context_menu_el)
      sidebar_el.onclick = function (e) {
        //Context menu should be closed if the context menu itself or the button isn't a parent in the path
        if (
          !arrayHasElementAttribute(e.composedPath(), "id", "hierarchy-context-menu") &&
          !arrayHasElementAttribute(e.composedPath(), "class", "group-context-menu-icon")
        )
          closeHierarchyContextMenu(context_menu_el);
      };

    //Initialise sidebar functions
    initialiseHierarchy(sidebar_el);
  }

  /*
    onSidebarDragEnd() - Handles drag ending for a given hierarchy.
    arg0_event: (Event) - The event to pass.
    arg1_hierarchy_id: (String) - The ID of the HTML element representing the hierarchy.
  */
  function onSidebarDragEnd (arg0_event, arg1_hierarchy_id) {
    //Convert from parameters
    var e = arg0_event;
    var hierarchy_id = arg1_hierarchy_id;

    //Declare local instance variables
    var element_obj = e.item;
    var target_obj = e.to;

    //Make sure element_obj isn't being moved into hierarchy
    if (target_obj.id != hierarchy_id) {
      //Check for dragged element class type
      if (target_obj.getAttribute("class")) {
        var target_id = target_obj.getAttribute("id");
        var target_parent = target_obj.parentElement;

        //Improper group location handling
        if (element_obj.getAttribute("class").includes("group"))
          //Move to subgroups if the element is not already there
          if (!target_id.includes("-subgroups")) {
            try {
              var subgroups_el = target_obj.querySelector(`[id='${target_id}-subgroups']`);

              //Make sure we're after the layer header field
              if (element_obj.nextElementSibling.getAttribute("class").includes("layer-input")) {
                target_obj.querySelector(".layer > input").after(element_obj);
              } else {
                var properly_moved = false;

                //Make sure to before/prepend since we're dealing with groups
                if (target_obj && !target_obj.getAttribute("class").includes("layer")) {
                    target_obj.before(element_obj);

                    properly_moved = true;
                  }

                //If a subgroups element was detected, we should be inside a group container - prepend to subcontainer instead
                if (subgroups_el && !properly_moved)
                  if (subgroups_el.id.includes("-subgroups"))
                    subgroups_el.prepend(element_obj);
              }
            } catch {
              //Now we know we're inside of an item (improper location)
              var subgroups_el = target_obj.parentElement;
              var properly_moved = false;
              var test_el = target_obj.parentElement;

              //Layer case handling
              if (target_obj.getAttribute("class").includes("layer")) {
                var all_ungrouped_entities = target_obj.querySelectorAll(".layer > .item");

                (all_ungrouped_entities.length > 0) ?
                  all_ungrouped_entities[0].before(element_obj) :
                  target_obj.append(element_obj);

                properly_moved = true;
              }

              if (!properly_moved) {
                //First-layer case handling
                if (subgroups_el.id != hierarchy_id) {
                  subgroups_el = subgroups_el.parentElement;
                  test_el = subgroups_el.querySelector(`[id='${subgroups_el.id}-subgroups']`);
                }

                //Append instead of prepend since entities go last
                target_obj.append(element_obj);
              }
            }

            //Postmortem test
            {
              var element_parent = element_obj.parentElement;

              //Item handling
              if (element_parent.getAttribute("class").includes("item")) {
                //Move it out of the item div first
                element_parent.before(element_obj);
              }

              //Group handling
              if (
                !element_parent.getAttribute("class").includes("-subgroups") &&
                element_parent.getAttribute("class").includes("group")
              ) {
                var subgroups_el = element_parent.querySelector(".subgroups");

                if (subgroups_el)
                  try {
                    subgroups_el.append(element_obj);
                  } catch {}
              }

              //Keep moving it upwards until it's finally above all the entities
              while (true) {
                //Recursive immediate sibling item testing
                var keep_moving = false;
                var previous_sibling = element_obj.previousSibling;

                if (previous_sibling)
                  if (previous_sibling.getAttribute("class").includes("item")) {
                    previous_sibling.before(element_obj);

                    keep_moving = true;
                  }

                if (!keep_moving)
                  break;
              }
            }
          }

        //Improper item location handling
        if (element_obj.getAttribute("class").includes("item"))
          if (!target_id.includes("-entities")) {
            var entities_el = target_parent.querySelector(`[id='${target_id}-entities']`);

            if (!entities_el)
              entities_el = target_parent.querySelector(`[id='${target_parent.id}-entities']`);

            (target_id != hierarchy_id && entities_el) ?
              entities_el.append(element_obj) :
              target_obj.append(element_obj);
          }
      }

      //Update group and item belonging by checking parent
      {
        var element_id = element_obj.id;
        var group_element = element_obj.parentElement.parentElement;
        var group_obj = getGroup(group_element.id);
        var selector = "";

        //Item handling
        if (element_obj.getAttribute("class").includes("item")) {
          moveItemToGroup(element_id, group_element.id);
          selector = "entities";
        }
        if (element_obj.getAttribute("class").includes("group")) {
          moveGroupToGroup(element_id, group_element.id);
          selector = "subgroups";
        }

        //Only reorganise elements if this is being moved within an actual group
        if (group_obj) {
          var group_children = Array.from(element_obj.parentElement.children);
          var old_index = group_obj[selector].indexOf(element_id);
          var new_index = group_children.indexOf(element_obj);

          //Move element within selector
          moveElement(group_obj[selector], old_index, new_index);
        }
      }
    } else {
      e.from.append(element_obj);
    }
  }
}
