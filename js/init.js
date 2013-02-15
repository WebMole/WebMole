$(document).ready(function() {

  // Load Ace editor on specified inputs
  editorTest = ace.edit("test-oracle-editor");
  editorTest.setTheme("ace/theme/monokai");
  editorTest.getSession().setMode("ace/mode/javascript");
  editorTest.setHighlightActiveLine(false);

  editorStop = ace.edit("stop-oracle-editor");
  editorStop.setTheme("ace/theme/monokai");
  editorStop.getSession().setMode("ace/mode/javascript");
  editorStop.setHighlightActiveLine(false);


  eval(editorTest.getSession().getValue());
  eval(editorStop.getSession().getValue());

  editorReadOnly = ace.edit("json-example");
  editorReadOnly.setTheme("ace/theme/monokai");
  editorReadOnly.getSession().setMode("ace/mode/javascript");
  editorReadOnly.setReadOnly(true);
  editorReadOnly.setHighlightActiveLine(false);

  mapViewerInput = ace.edit("map-viewer-input");
  mapViewerInput.setTheme("ace/theme/monokai");
  mapViewerInput.getSession().setMode("ace/mode/javascript");
  mapViewerInput.setHighlightActiveLine(false);

  // Initialize the tab :)
  $('#tab-web-explorer').tab('show');

  // Handlers for buttons and actions
  attachHandlers();

});

function attachHandlers() {
  
  //Color picker for manual exploration
  $('.web-explorer-manual-color').each(function(index, element){
	  var colorPickerelement = $(this);
	  $(colorPickerelement).ColorPicker({
		color: '#999999',
		onShow: function (colpkr) {
			$(colpkr).fadeIn('fast');
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut('fast');
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			$(colorPickerelement).css('background-color','#'+hex);
			webExplorer_manualSetActiveColor();
		}
	});	  
  });
  

  // Init tooltip for btn with 'btn-tooltip' class
  $('.btn-tooltip').tooltip();

  // Main compute button
  // compute graph with source's input json
  $('.action_compute').on('click', function(event) {
    
    // If input empty, use default graph
    if (mapViewerInput.getSession().getValue() == '')
    {
      $('#source_modal').modal('hide');
    }
    else
    {
      try
      {
        var json = JSON.parse(mapViewerInput.getSession().getValue());
        create_graph(json);
        $('#source_modal').modal('hide');
      }
      catch(err)
      {
        txt="There was an with your json data.\n";
        txt+="Error description: " + err.message + "\n\n";
        txt+="you can try to validate it with JSONLint. You may also leave the textarea blank for default behaviour";
        alert(txt);
      }
    }
  });
  
  // Temp action for loading ajax file
  $('.drop-over').on('click', function() {
    var json = handle_json_file("data-map-example.json");
    create_graph(json);
    $('#upload_modal').modal('hide');
  });

  // Editor Clear button
  $('.action_clear').on('click', function() {
    $('.source_input').html('');
    $('.source_input').val('');
  });
}