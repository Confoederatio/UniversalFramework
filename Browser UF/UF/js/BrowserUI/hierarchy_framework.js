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
    var local_groups = hierarchy_obj[`${layer}_groups`];
    var local_layer = hierarchy_obj[`${layer}_layer`];
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
    arg1_entity_id: (String) - The entity ID to pass.
    arg2_options: (Object)
      is_hidden: (Boolean) - Whether the item is currently hidden.
      name: (String) - The current name of the element.
      selected_elements_array: (Array<String>) - The selected elements object to currently pass.
      sidebar_info_el: (HTMLElement) - The element that displays current selection data.

    Returns: (HTMLElement)
  */
  function createItemElement (arg0_hierarchy_obj, arg1_entity_id, arg2_options) {
    //Convert from parameters
    var hierarchy_obj = arg0_hierarchy_obj;
    var entity_id = arg1_entity_id;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var entity_obj = getEntity(entity_id, hierarchy_obj);

    //Check if entity object exists
    if (entity_obj) {
      var header_el = document.createElement("input");
      var is_hidden = isPolityHidden(entity_id, window.date);
      var local_el = document.createElement("div");

      var item_class = `item${(selected_elements_array.includes(entity_id)) ? " selected" : ""}`;

      //Initialise local instance variables
      if (is_hidden)
        item_class += ` extinct`;

      local_el.setAttribute("class", item_class);
      local_el.setAttribute("id", entity_id);

      header_el.setAttribute("onkeyup", "updateAllGroups(true);");
      header_el.value = (options.name) ? options.name : `New Item`;

      //Append all formatted elements
      local_el.appendChild(header_el);
      local_el.onclick = function (e) {
        editSidebarElement(e);

        if (window.ctrl_pressed)
          if (!selected_elements_array.includes(entity_id)) {
            selected_elements_array.push(entity_id);
          } else {
            //Remove from selection
            for (var i = 0; i < selected_elements_array.length; i++)
              if (selected_elements_array[i] == entity_id)
                selected_elements_array.splice(i, 1);
          }

        //Append class if selected, remove selected class if not
        if (selected_elements_array.includes(entity_id)) {
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
}
