/*
  UNTESTED ELEMENTS:

  - wysiwyg/rich_text

  TESTED ELEMENTS:

  biuf
*/

//Requires: html2canvas
/*
  createContextMenu() - Creates a context menu within the DOM.

  arg0_options: (Object)
    anchor: (String) - The query selector to pin a context menu to.
    class: (String) - The class prefix to prepend.
    id: (String) - The ID of the context menu.
    name: (String) - Optional. Title of the context menu. Undefined; will not display by default.
    maximum_height: (String) - Optional. The height after which a scrollbar should appear in CSS units.
    maximum_width: (String) - Optional. Maximum width in CSS units.

    <input_key>: (Object)
      type: (String) - The type of HTML input to grab.
        - biuf
        - rich_text/wysiwyg

        - button
        - checkbox
        - color/colour
        - datalist
        - date
        - date_length
        - email
        - file
        - hidden
        - image
        - number
        - password
        - radio
        - range
        - reset
        - search_select
        - select
        - submit
        - tel/telephone
        - text
        - time
        - url/URL

      icon: (String) - Optional. The path to the display icon image.
      name: (String) - Optional. The HTML text of the button to display.
      onclick: (String) - Optional. The JS code to execute on button click.
      tooltip: (String) - Optional. The HTML tooltip a user can see by hovering over this input.

      x: (Number) - Optional. The X position of the element in a grid. 0 by default.
      y: (Number) - Optional. The Y position of the element in a grid. n + 1 by default, where n = last row.
*/
function createContextMenu (arg0_options) { //[WIP] - Finish function body.
  //Convert from parameters
  var options = (arg0_options) ? arg0_options : {};

  //Initialise options
  if (!options.class) options.class = "";

  //Declare local instance variables
  var all_options = Object.keys(options);
  var default_keys = ["anchor", "class", "id", "maximum_height", "maximum_width"];
  var html_string = [];
  var table_columns = 0;
  var table_rows = 0;

  //Format CSS strings
  var height_string = (options.maximum_height) ? `height: ${options.maximum_height}; overflow-y: auto;` : "";
  var width_string = (options.maximum_width) ? `width: ${options.maximum_width}; overflow-x: hidden;` : "";

  var parent_style = `${height_string}${width_string}`;

  //Format html_string
  html_string.push(`<div ${(options.id) ? `id = "${options.id}" ` : ""}class = "${(options.class) ? options.class + " " : ""}context-menu"${(parent_style.length > 0) ? ` style = "${parent_style}"` : ""}>`);

  //Fetch table_columns; table_rows
  for (var i = 0; i < all_options.length; i++) {
    var local_option = options[all_options[i]];

    //This is an input field; process .x, .y
    if (typeof local_option == "object") {
      if (local_option.x)
        table_columns = Math.max(table_columns, local_option.x);
      if (local_option.y) {
        table_rows = Math.max(table_rows, local_option.y);
      } else {
        table_rows++;
      }
    }
  }

  //Iterate over all_options; format them
  for (var i = 0; i < all_options.length; i++) {
    var local_option = options[all_options[i]];

    //This is an input field to append
    if (typeof local_option == "object") {

    }
  }

  //Close html_string
  html_string.push(`</div>`);
}

/*
  createInput() - Returns a string representing the HTML input element.
  arg0_options: (Object)
    id: (String) - The ID to associate this input with.
    type: (String) - The input type to return the HTML of. 'biuf'/'rich_text'/'wysiwyg'/'button'/'checkbox'/'color'/'colour'/'datalist'/'date'/'date_length'/'email'/'file'/'hidden'/'image'/'number'/'password'/'radio'/'range'/'reset'/'search_select'/'select'/'submit'/'tel'/'text'/'time'/'url'

    icon: (String) - Optional. The path to the display icon image.
    name: (String) - Optional. The HTML string of the button to display.
    onclick: (String) - Optional. The onclick/confirm attribute of the button.
    tooltip: (String) - Optional. The HTML tooltip a user can see by hovering over this input.

    attributes: - Optional.
      <attribute_name>: <value> - The attribute to pass to the focus element.
    options: - Optional. Used for datalists only.
      <option_id>: <value> - The datalist option ID to pass to the focus element.

    //Individual input type options.
    //'date'
      default_date: (Object) - The date to set defaults to if applicable.
*/
function createInput (arg0_options) {
  //Convert from parameters
  var options = (arg0_options) ? arg0_options : {};

  //Intiialise options
  if (!options.attributes) options.attributes = {};
  if (!options.options) options.options = {};

  //Declare local instance variables
  var html_string = [];

  //Format html_string
  html_string.push(`<div id = "${options.id}" class = "context-menu-cell">`);

  //Input type handling
  if (options.type == "biuf") {
    //Create a contenteditable div with onchange handlers to strip formatting
    html_string.push(`<div id = "biuf-toolbar" class = "biuf-toolbar">`);
      //Onload handler
      html_string.push(`<img src = "" onerror = "initBIUFToolbar('${options.id}');"`);
      html_string.push(`<button id = "bold-button" class = "bold-icon">B</button>`);
      html_string.push(`<button id = "italic-button" class = "italic-icon">I</button>`);
      html_string.push(`<button id = "underline-button" class = "underline-icon">U</button>`);
      html_string.push(`<button id = "clear-button" class = "clear-icon">T</button>`);
    html_string.push(`</div>`);

    html_string.push(`<div id = "biuf-input" class = "biuf-input" contenteditable = "true" oninput = "handleBIUF(this);">`);
    html_string.push(`</div>`);
  } else if (["rich_text", "wysiwyg"].includes(options.type)) {
    html_string.push(`<div id = "wysiwyg-editor" class = "wysiwyg-editor">`);
      //Onload handler
      html_string.push(`<img src = "" onerror = "initWYSIWYG('${options.id}');">`);

      //Editor toolbar
      {
        html_string.push(`<div class = "toolbar">`);
          //FIRST LINE
          html_string.push(`<div class = "line">`);

          //First box: Bold, Italic, Underline, Strikethrough
          html_string.push(`<div class = "box">`);
            //Bold
            html_string.push(`<span class = "editor-button icon small" data-action = "bold" data-tag-name = "b" title = "Bold"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/bold.png"></span>`);
            //Italic
            html_string.push(`<span class = "editor-button icon small" data-action = "italic" data-tag-name = "i" title = "Italic"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/italic.png"></span>`);
            //Underline
            html_string.push(`<span class = "editor-button icon small" data-action = "underline" data-tag-name = "u" title = "Underline"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/underline.png"></span>`);
            //Strikethrough
            html_string.push(`<span class = "editor-button icon small" data-action = "strikeThrough" data-tag-name = "strike" title = "Strikethrough"><img src = "https://img.icons8.com/fluency-systems-filled/30/000000/strikethrough.png"></span>`);
          html_string.push(`</div>`);

          //Second box: Alignment, Lists, Indents, Hr
          html_string.push(`<div class = "box">`);
            html_string.push(`<span class = "editor-button icon has-submenu">`);
              //Menu icon
              html_string.push(`<img src = "https://img.icons8.com/fluency-systems-filled/48/000000/align-left.png">`);

              //1. Submenu
              html_string.push(`<div class = "submenu">`);
                //Align left
                html_string.push(`<span class = "editor-button icon" data-action = "justifyLeft" data-style = "textAlign:left" title = "Align Left"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/align-left.png"></span>`);
                //Align centre
                html_string.push(`<span class = "editor-button icon" data-action = "justifyCenter" data-style = "textAlign:center" title = "Align Centre"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/align-center.png"></span>`);
                //Align right
                html_string.push(`<span class = "editor-button icon" data-action = "justifyRight" data-style = "textAlign:right" title = "Align Right"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/align-right.png"></span>`);
                //Align justify
                html_string.push(`<span class = "editor-button icon" data-action = "formatBlock" data-style = "textAlign:justify" title = "Justify"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/align-justify.png"></span>`);
              html_string.push(`</div>`);
            html_string.push(`</span>`);

            //Insert ordered list
            html_string.push(`<span class = "editor-button icon" data-action = "insertOrderedList" data-tag-name = "ol" title = "Insert ordered list"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/numbered-list.png"></span>`);
            //Insert unordered list
            html_string.push(`<span class = "editor-button icon" data-action "insertUnorderedList data-tag-name = "ul" title = "Insert unordered list"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/bulleted-list.png"></span>`);
            //Indent
            html_string.push(`<span class = "editor-button icon" data-action = "indent" title = "Indent"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/indent.png"></span>`);
            //Outdent
            html_string.push(`<span class = "editor-button icon" data-action = "outdent" title = "Outdent" data-required-tag = "li"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/outdent.png"></span>`);
          html_string.push(`</div>`);

        html_string.push(`</div>`);

        //SECOND LINE
        html_string.push(`<div class = "line">`);

          //Third box: Undo, clear formatting
          html_string.push(`<div class = "box">`);
            //Undo
            html_string.push(`<span class = "editor-button icon small" data-action = "undo" title = "Undo"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/undo--v1.png"></span>`);
            //Remove formatting
            html_string.push(`<span class = "editor-button icon small" data-action = "removeFormat" title = "Remove format"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/remove-format.png"></span>`);
          html_string.push(`</div>`);

          //Fourth box: Add link, remove link
          html_string.push(`<div class = "box">`);
            //Insert Link
            html_string.push(`<span class = "editor-button icon small" data-action = "createLink" title = "Insert Link"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/add-link.png"></span>`);
            //Unlink
            html_string.push(`<span class = "editor-button icon small" data-action = "unlink" data-tag-name = "a" title = "Unlink"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/delete-link.png"></span>`);
          html_string.push(`</div>`);

          //Fifth box: Show HTML
          html_string.push(`<div class = "box">`);
            //Show HTML code
            html_string.push(`<span class = "editor-button icon" data-action = "toggle-view" title = "Show HTML Code"><img src = "https://img.icons8.com/fluency-systems-filled/48/000000/source-code.png"></span>`);
          html_string.push(`</div>`);
        html_string.push(`</div>`);
      html_string.push(`</div>`);
    }

      //Content area
      html_string.push(`<div class = "content-area">`);
        html_string.push(`<div class = "visual-view" contenteditable></div>`);
        html_string.push(`<textarea class = "html-view"></textarea>`);
      html_string.push(`</div>`);

      //Modal for hyperlinks
      html_string.push(`<div class = "modal">`);
        html_string.push(`<div class = "modal-bg"></div>`);
        html_string.push(`<div class = "modal-wrapper">`);
          html_string.push(`<div class = "close">✖</div>`);
          html_string.push(`<div class = "modal-content" id = "modal-create-link">`);
            html_string.push(`<h3>Insert Link</h3>`);
            html_string.push(`<input type = "text" id = "link-value" placeholder = "Link (example: https://google.com/)">`);
            html_string.push(`<div class = "row">`);
              html_string.push(`<input type = "checkbox" id = "new-tab"`);
              html_string.push(`<label for = "new-tab">Open in New Tab?</label>`);
            html_string.push(`</div>`);
            html_string.push(`<button class = "done">Done</button>`);
          html_string.push(`</div>`);
        html_string.push(`</div>`);
      html_string.push(`</div>`);
    html_string.push(`</div>`);
  } else if (options.type == "button") {
    html_string.push(`<span${(options.onclick) ? ` onclick = "${options.onclick}"` : ""} class = "button">`);
      if (options.icon)
        html_string.push(`<img src = "${options.icon}">`);
      if (options.name)
        html_string.push(options.name);
    html_string.push(`</span>`);
  } else if (options.type == "checkbox") {
    if (options.icon)
      html_string.push(`<img src = "${options.icon}">`);

    html_string.push(`<input type = "checkbox" ${objectToAttributes(options.attributes)}>`);

    if (options.name)
      html_string.push(`<span>${options.name}</span>`);
  } else if (["color", "colour"].includes(options.type)) {
    //High-intensity - take a page from Naissance colour wheels
    html_string.push(`<div class = "colour-picker-container">`);
      //Onload handler
      html_string.push(`<img src = "" onerror = "handleColourWheel('${options.id}');">`);

      //Colour picker HTML
      html_string.push(`<img id = "colour-picker-hue" class = "colour-picker-hue" src = "https://i.postimg.cc/GtSFx653/colour-wheel.png">`);
      html_string.push(`<div id = "colour-picker-brightness" class = "colour-picker-brightness"></div>`);

      html_string.push(`<div id = "colour-picker-cursor" class = "colour-picker-cursor"></div>`);
      html_string.push(`<div id = "colour-picker" class = "colour-picker-mask"></div>`);

      //RGB inputs
      html_string.push(`<div class = "rgb-inputs">`);
        html_string.push(`R: <input type = "number" id = "r" value = "255"><br>`);
        html_string.push(`G: <input type = "number" id = "g" value = "255"><br>`);
        html_string.push(`B: <input type = "number" id = "b" value = "255"><br>`);
      html_string.push(`</div>`);

      //No select
      html_string.push(`<span class = "no-select">`);
        html_string.push(`<span class = "brightness-range-container">`);
          html_string.push(`<span id = "brightness-header" class = "small-header">Brightness</span>`);
          html_string.push(`<input type = "range" min = "0" max = "100" value = "100" id = "colour-picker-brightness-range" class = "colour-picker-brightness-range">`);
        html_string.push(`</span>`);

        html_string.push(`<span class = "opacity-range-container">`);
          html_string.push(`<span id = "opacity-header" class = "small-header">Opacity</span>`);
          html_string.push(`<input type = "range" min = "0" max = "100" value = "50" id = "colour-picker-opacity-range" class = "colour-picker-opacity-range">`);
        html_string.push(`</span>`);
      html_string.push(`</span>`);
    html_string.push(`</div>`);
  } else if (options.type == "datalist") {
    html_string.push(`<datalist class = "datalist">`);
      //Add .options to datalist
      var all_options = Object.keys(options.options);

      //Iterate over all_options
      for (var i = 0; i < all_options.length; i++) {
        var local_value = options.options[all_options[i]];

        //Push option to html_string
        html_string.push(`<option id = "${all_options[i]}" value = "${local_value}">`);
      }
    html_string.push(`</datalist>`);
  } else if (options.type == "date") {
    //High-intensity - create date framework first
    //Day/month/year container
    html_string.push(`<input id = "day-input" class = "day-input" placeholder = "1st">`);
    html_string.push(`<input id = "month-input" class = "month-input" list = "months" placeholder = "January">`);
    html_string.push(`
      <datalist id = "months" name = "month">
        <option value = "January">1</option>
        <option value = "February">2</option>
        <option value = "March">3</option>
        <option value = "April">4</option>
        <option value = "May">5</option>
        <option value = "June">6</option>
        <option value = "July">7</option>
        <option value = "August">8</option>
        <option value = "September">9</option>
        <option value = "October">10</option>
        <option value = "November">11</option>
        <option value = "December">12</option>
      </datalist>
    `);
    html_string.push(`<input id = "year-input" class = "year-input">`);
    html_string.push(`
      <select id = "year-type">
        <option value = "AD">AD</option>
        <option value = "BC">BC</option>
      </select>
    `);
    //Hour-minute container
    html_string.push(`
      <input id = "hour-input" value = "00" placeholder = "00"> :
      <input id = "minute-input" value = "00" placeholder = "00">
    `);
  } else if (options.type == "date_length") {
    //Place date_length containers on separate lines for better readability
    html_string.push(`
      <div id = "date-container">
        <input id = "years-input" placeholder = "2000" value = "2000"></input>
        <input id = "months-input" placeholder = "January" value = "January"></input>
        <input id = "days-input" placeholder = "1st" value = "1st"></input>
      </div>
      <div id = "clock-container">
        <input id = "hours-input" placeholder = "00" value = "00"></input> :
        <input id = "minutes-input" placeholder = "00" value = "00"></input>
      </div>
    `);
  } else if (options.type == "email") {

  } else if (options.type == "file") {
    //High-intensity
  } else if (options.type == "image") {

  } else if (options.type == "number") {

  } else if (options.type == "password") {

  } else if (options.type == "radio") {

  } else if (options.type == "range") {

  } else if (options.type == "reset") {

  } else if (options.type == "search_select") {

  } else if (options.type == "select") {

  } else if (options.type == "submit") {

  } else if (["tel", "telephone"].includes(options.type)) {

  } else if (options.type == "text") {

  } else if (options.type == "time") {

  } else if (options.type == "url") {

  }

  //Close html_string div
  html_string.push(`</div>`);

  //Return statement
  return html_string.join("");
}

//Internal UI helper functions
{
  //addParagraphTag() - Adds a paragraph tag when enter key is pressed
  function addParagraphTag (arg0_e) {
    //Convert from parameters
    var e = arg0_e;

    //Check if keyCode was enter
    if (e.keyCode == "13") {
      //Guard clause; Don't add a p tag on list item
      if (window.getSelection().anchorNode.parentNode.tagName == "LI") return;

      //Otherwise, add a p tag
      document.execCommand("formatBlock", false, "p");
    }
  }

  //childOf() - Checks if passed child has passed parent
  function childOf (arg0_child_el, arg1_parent_el) {
    //Convert from parameters
    var child_el = arg0_child_el;
    var parent_el = arg1_parent_el;

    //Return statement
    return parent_el.contains(child_el);
  }

  function execCodeAction (arg0_button_el, arg1_editor_el, arg2_visual_view_el, arg3_html_view_el) {
    //Convert from parameters
    var button_el = arg0_button_el;
    var editor_el = arg1_editor_el;
    var visual_view = arg2_visual_view_el;
    var html_view = arg3_html_view_el;

    //Toggle visual/HTML view depending on current state
    if (button_el.classList.contains("active")) { //Show visual view
      visual_view.innerHTML = html_view.innerHTML = html_view.value;
      html_view.style.display = "none";
      visual_view.style.display = "block";

      button_el.classList.remove("active");
    } else { //Show HTML view
      html_view.innerText = visual_view.innerHTML;
      visual_view.style.display = "none";
      html_view.style.display = "block";

      button_el.classList.add("active");
    }
  }

  function execDefaultAction (arg0_action) {
    //Convert from parameters
    var action = arg0_action;

    //Invoke execCommand
    document.execCommand(action, false);
  }

  function execLinkAction (arg0_modal_el) {
    //Convert from parameters
    var modal = arg0_modal_el;

    //Declare local instance variables
    var close = modal.querySelectorAll(".close")[0];
    var selection = saveSelection();
    var submit = modal.querySelectorAll("button.done")[0];

    //Add link once done button is active
    submit.addEventListener("click", function (e) {
      e.preventDefault();

      var new_tab_checkbox = modal.querySelectorAll(`#new-tab`)[0];
      var link_input = modal.querySelectorAll(`#link-value`)[0];
      var link_value = link_input.value;
      var new_tab = new_tab_checkbox.checked;

      //Restore selection
      restoreSelection(selection);

      //Handle selection
      if (window.getSelection().toString()) {
        var local_a = document.createElement("a");

        a.href = link_value;
        if (new_tab)
          a.target = "_blank";
        window.getSelection().getRangeAt(0).surroundContents(a);
      }

      //Hide modal, deregister modal events
      modal.style.display = "none";
      link_input.value = "";

      submit.removeEventListener("click", arguments.callee);
      close.removeEventListener("click", arguments.callee);
    });

    //Close modal on close button click
    close.addEventListener("click", function (e) {
      e.preventDefault();

      var link_input = modal.querySelectorAll("#link-value")[0];

      //Hide modal, deregister modal events
      modal.style.display = "none";
      link_input.value = "";

      submit.removeEventListener("click", arguments.callee);
      close.removeEventListener("click", arguments.callee);
    });
  }

  function handleBIUF (arg0_e) {
    //Convert from parameters
    var biuf_el = arg0_e;

    //Declare local instance variables
    var child = biuf_el.firstChild;

    //Declare while loop, break when next sibling element can no longer be found.
    while (child) {
      var remove_node = null;

      //Check if child is not of <b><i><u> tags.
      if (child.tagName && (!["b", "i", "u"].includes(child.tagName.toLowerCase())))
        remove_node = child;
      child = child.nextSibling;

      //Remove node if flag is true
      if (remove_node)
        remove_node.parentNode.removeChild(remove_node);
    }
  }

  function handleColourWheel (arg0_parent_el_id) {
    //Convert from parameters
    var parent_el_id = arg0_parent_el_id;

    //Declare local instance variables
    var parent_el = document.getElementById(parent_el_id);

    var brightness_el = parent_el.querySelector(`#colour-picker-brightness-range`);
    var colour_brightness_el = parent_el.querySelector(`#colour-picker-brightness`);
    var colour_cursor_el = parent_el.querySelector(`#colour-picker-cursor`);
    var colour_picker_el = parent_el;
    var colour_wheel_el = document.querySelector(`#colour-picker`);
    var opacity_el = document.querySelector(`#colour-picker-opacity-range`);

    var b_el = parent_el.querySelector(`#b`);
    var g_el = parent_el.querySelector(`#g`);
    var r_el = parent_el.querySelector(`#r`);

    //colour_wheel_el onclick handler
    colour_wheel_el.onclick = function (e) {
      var bounding_rect = e.target.getBoundingClientRect();
      var coord_x = e.clientX - bounding_rect.left;
      var coord_y = e.clientY - bounding_rect.top;

      colour_cursor_el.style.left = `calc(${coord_x}px - 6px)`;
      colour_cursor_el.style.top = `calc(${coord_y}px - 6px)`;

      //Get r,g,b value of pixel
      html2canvas(colour_picker_el).then((canvas) => {
        var ctx = canvas.getContext("2d");

        var canvas_height = ctx.canvas.height;
        var canvas_width = ctx.canvas.width;
        var pixel = ctx.getImageData(coord_x, coord_y, 1, 1).data;

        //Set colour wheel CSS, interaction
        colour_cursor_el.style.background = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        r_el.value = pixel[0];
        g_el.value = pixel[1];
        b_el.value = pixel[2];

        setEntityColour(entity_id);
      });
    };

    //Range change listeners
    onRangeChange(brightness_el, function (e) {
      var brightness_value = parseInt(brightness_el.value);

      //Set brightness opacity
      colour_brightness_el.style.opacity = `${1 - brightness_value*0.01}`;
      updateBrightnessOpacityHeaders(parent_el_id);
    });
    onRangeChange(opacity_el, function (e) {
      if (options.onclick) {
        var local_expression = options.onclick;
        var local_result = new Function(local_expression)(e);
      }

      //Set brightness opacity
      updateBrightnessOpacityHeaders(parent_el_id);
    });

    //RGB listeners
    r_el.onchange = function () {
      this.value = Math.max(Math.min(this.value, 255), 0);
      setColourWheelCursor(entity_id, [r_el.value, g_el.value, b_el.value]);
    };
    g_el.onchange = function () {
      this.value = Math.max(Math.min(this.value, 255), 0);
      setColourWheelCursor(entity_id, [r_el.value, g_el.value, b_el.value]);
    };
    b_el.onchange = function () {
      this.value = Math.max(Math.min(this.value, 255), 0);
      setColourWheelCursor(entity_id, [r_el.value, g_el.value, b_el.value]);
    };
  }

  function initBIUFToolbar (arg0_parent_el_id) {
    //Convert from parameters
    var biuf_element_id = arg0_parent_el_id;

    //Declare local instance variables
    var biuf_el = document.querySelector(`div#${biuf_element_id} #biuf-input`);
    var toolbar_el = document.querySelector(`div#${biuf_element_id} #biuf-toolbar`);

    //Declare element references
    var bold_button = toolbar_el.querySelector("#bold-button");
    var clear_button = toolbar_el.querySelector("#clear-button");
    var italic_button = toolbar_el.querySelector("#italic-button");
    var underline_button = toolbar_el.querySelector("#underline-button");

    //Show toolbar when text is selected
    document.addEventListener("mouseup", function () {
      var selection = window.getSelection();

      if (selection.toString() != "" && document.querySelector(`#${element_id}:focus`)) {
        var range = selection.getRangeAt(0);
        var rect = range.getBoundingClientRect();

        toolbar_el.style.display = "block";
        toolbar_el.style.top = rect.top - toolbar_el.offsetHeight + "px";
        toolbar_el.style.left = rect.left + "px";
      } else {
        toolbar_el.style.display = "none";
      }
    });

    //Apply formatting when various toolbar buttons are clicked
    bold_button.addEventListener("click", function () {
      document.execCommand("bold");
    });
    clear_button.addEventListener("click", function () {
      document.execCommand("removeFormat");
    });
    italic_button.addEventListener("click", function () {
      document.execCommand("italic");
    });
    underline_button.addEventListener("click", function () {
      document.execCommand("underline");
    });
  }

  function initWYSIWYG (arg0_parent_el_id) {
    //Convert from parameters
    var wysiwyg_parent_id = arg0_parent_el_id;

    //Declare local instance variables
    var editor = document.querySelector(`#${wysiwyg_parent_id} .wysiwyg-editor`);
    var modal = editor.getElementsByClassName("modal")[0];
    var toolbar = editor.getElementsByClassName("toolbar")[0];

    var buttons = toolbar.querySelectorAll(`.editor-button:not(.has-submenu)`);
    var content_area = editor.getElementsByClassName("content-area")[0];
    var visual_view = content_area.getElementsByClassName(`visual-view`)[0];

    var html_view = content_area.getElementsByClassName(`html-view`)[0];

    //Add active tag event
    document.addEventListener("selectionchange", function (e) {
      selectionChange(e, buttons, editor);
    });

    //Add paste event
    visual_view.addEventListener("paste", pasteEvent);

    //Add paragraph tag on newline
    content_area.addEventListener("keypress", addParagraphTag);

    //Add toolbar button actions
    for (var i = 0; i < buttons.length; i++) {
      var local_button = buttons[i];

      local_button.addEventListener("click", function (e) {
        var action = this.dataset.action;

        //execCommand handler
        switch (action) {
          case "toggle-view":
            execCodeAction(this, editor, visual_view, html_view);
            break;
          case "createLink":
            execLinkAction(modal);
            break;
          default:
            execDefaultAction(action);
        }
      });
    }
  }

  function parentTagActive (arg0_el) {
    //Convert from parameters
    var element = arg0_el;

    //Guard clause for visual view
    if (!element || !element.classList || element.classList.contains("visual-view"))
      return false;

    //Declare local instance variables
    var tag_name = element.tagName.toLowerCase();
    var text_align = element.style.textAlign;
    var toolbar_button;

    //Active by tag name
    toolbar_button = document.querySelectorAll(`.toolbar .editor-button[data-tag-name="${tag_name}"]`)[0];

    //Active by text-align
    toolbar_button = document.querySelectorAll(`.toolbar .editor-button[data-style="textAlign:${text_align}"]`)[0];

    //Set toolbar_button to being active if toolbar_button is defined
    if (toolbar_button)
      toolbar_button.classList.add("active");

    //Return statement
    return parentTagActive(element.parentNode);
  }

  //pasteEvent() - Handles paste event by removing all HTML tags
  function pasteEvent (arg0_e) {
    //Convert from parameters
    var e = arg0_e;

    //Declare local instance variables
    var text = (e.originalEvent || e).clipboardData.getData("text/plain");

    e.preventDefault();
    document.execCommand("insertHTML", false, text);
  }

  function restoreSelection (arg0_saved_selection) {
    //Convert from parameters
    var saved_selection = arg0_saved_selection;

    //Restore selection
    if (saved_selection)
      if (window.getSelection) {
        selection = window.getSelection();
        selection.removeAllRanges();

        //Populate selection ranges
        for (var i = 0, length = saved_selection.length; i < len; i++)
          selection.addRange(saved_selection[i]);
      } else if (document.selection && saved_selection.select) {
        saved_selection.select();
      }
  }

  function saveSelection () {
    if (window.getSelection) {
      var selection = window.getSelection();

      if (selection.getRangeAt && selection.rangeCount) {
        var ranges = [];

        //Iterate over selection.rangeCount to populate ranges
        for (var i = 0, length = selection.rangeCount; i < length; i++)
          ranges.push(selection.getRangeAt(i));

        //Return statement
        return ranges;
      }
    } else if (document.selection && document.selection.createRange) {
      //Return statement
      return document.selection.createRange();
    }
  }

  function selectionChange (arg0_e, arg1_buttons, arg2_editor) {
    //Convert from parameters
    var e = arg0_e;
    var buttons = arg1_buttons;
    var editor = arg2_editor;

    //Declare local instance variables
    for (var i = 0; i < buttons.length; i++) {
      var local_button = buttons[i];

      //Don't remove active class on code toggle button
      if (button.dataset.action == "toggle-view") continue;

      button.classList.remove("active");
    }

    if (!childOf(window.getSelection().anchorNode.parentNode, editor))
      //Return statement; guard clause
      return false;

    parentTagActive(window.getSelection().anchorNode.parentNode);
  }

  function setColourWheelCursor (arg0_parent_el_id, arg1_colour, arg2_do_not_change) {
    //Convert from parameters
    var parent_el_id = arg0_parent_el_id;
    var colour = arg1_colour;
    var do_not_change = arg2_do_not_change;

    //Declare local instance variables
    var parent_el = document.getElementById(parent_el_id);

    var brightness_el = parent_el.querySelector(`#colour-picker-brightness-range`);
    var colour_brightness_el = parent_el.querySelector(`#colour-picker-brightness`);
    var colour_cursor_el = parent_el.querySelector(`#colour-picker-cursor`);
    var colour_picker_el = parent_el.querySelector(`.colour-picker-container`);
    var max_brightness = 255;

    //Get closest r, g, b value in colour wheel and teleport cursor there
    colour_cursor_el.style.visibility = "hidden";

    //Adjust brightness_el to new maximum brightness
    max_brightness = Math.max(Math.max(colour[0], colour[1]), colour[2])/255;

    brightness_el.value = max_brightness*100;
    colour_brightness_el.style.opacity = `${1 - max_brightness}`;

    //Move colour_cursor_el
    html2canvas(colour_picker_el).then((canvas) => {
      var ctx = canvas.getContext("2d");

      var canvas_height = ctx.canvas.height;
      var canvas_width = ctx.canvas.width;
      var circle_radius = canvas_width/2;
      var image_data = ctx.getImageData(0, 0, canvas_width, canvas_height).data;

      //Iterate over all image_data; each pixel has 4 elements
      var closest_pixel = [10000000, 0, 0]; //[colour_distance, x, y];

      //Iterate over image_data array
      for (var i = 0; i < image_data.length; i += 4) {
        var local_colour = [image_data[i], image_data[i + 1], image_data[i + 2]];
      }
    });
  }

  function updateBrightnessOpacityHeaders (arg0_parent_el_id) {
    //Convert from parameters
    var parent_el_id = arg0_parent_el_id;

    //Declare local instance variables
    var parent_el = document.getElementById(parent_el_id);

    var brightness_el = parent_el.querySelector(`#colour-picker-brightness-range`);
    var brightness_header_el = parent_el.querySelector(`#brightness-header`);
    var opacity_el = parent_el.querySelector(`#colour-picker-opacity-range`);
    var opacity_header_el = parent_el.querySelector(`#opacity-header`);

    var brightness_value = parseInt(brightness_el.value);
    var opacity_value = parseInt(opacity_el.value);

    //Update values
    if (brightness_header_el)
      brightness_header_el.innerHTML = `Brightness | ${brightness_value/100}`;
    if (opacity_header_el)
      opacity_header_el.innerHTML = `Opacity | ${opacity_value/100}`;
  }
}
