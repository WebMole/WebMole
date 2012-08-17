$(document).ready(function() {

  // Load PrettyPrint
  prettyPrint();

  // Noty test
  var my_notification = noty({layout: "topRight", type: "information", text: 'noty is alive and javascript is ebabled ;)', timeout: 3500});

  // Initialize the tab :)
  $('#tab-map-viewier').tab('show');

  // Handlers for buttons and actions
  attachHandlers();
});

function attachHandlers() {
  // Main compute button

  // compute graph with source's input json
  $('.action_compute').on('click', function() {
    try
    {
      var json = JSON.parse($('.source_input').val());
      create_graph(json);
    }
    catch(err)
    {
      txt="There was an with your json data.\n\n";
      txt+="Error description: " + err.message + "\n\n";
      txt+="you can try to validate it with JSONLint.\n\n";
      alert(txt);
    }
  });
  
  // Temp action for loading ajax file
  $('.drop-over').on('click', function() {
    var json = handle_json_file("data-map-example.json");
    create_graph(json);
  });

  // Editor Clear button
  $('.action_clear').on('click', function() {
    $('.source_input').html('');
    $('.source_input').val('');
  });
}