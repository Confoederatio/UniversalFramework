var context_menu = createContextMenu({
  anchor: "#context-menu-container",
  class: "context-menu-test",
  id: "context-menu-test",
  name: "Context Menu",

  biuf_input: {
    id: "biuf_input",
    name: "BIUF Input Test",
    type: "biuf",

    x: 0,
    y: 0
  },

  biuf_input_two: {
    id: "biuf_input_two",
    name: "BIUF Input Test Two",
    type: "biuf",

    x: 0,
    y: 0
  }
});

console.log(context_menu);
