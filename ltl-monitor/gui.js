$(document).ready(function()
{
  // Start with an empty monitor
  monitor = null;
  
  // Instantiate monitor when clicking on button
  $("#btn-instantiate").click(function()
  {
    var verdict_box = document.getElementById("verdict-box");
    var text = document.getElementById("input-formula").value;
    var lsp = new LTLStringParser();
    monitor = lsp.parseFromString(text);
    if (monitor === null)
    {
      //verdict_box.className = 'verdict-nomonitor';
      $("#verdict-box").css({ 'background-color': 'darkgrey' });
      verdict_box.innerHTML = 'no monitor';
      alert("Could not instantiate the monitor. This is generally caused by a syntax error in the expression.");
    }
    else
    {
      //verdict_box.className = 'verdict-inconclusive';
      $("#verdict-box").css({ 'background-color': 'yellow' });
      verdict_box.innerHTML = 'inconclusive';
    }
  });
  
  // Evaluate monitor when clicking on button
  document.getElementById("btn-evaluate").onclick = function()
  {
    $("#verdict-box").css({ 'background-color': 'white' });
    monitor.processEvent(document);
    var verdict_box = document.getElementById("verdict-box");
    var verdict = monitor.getVerdict();
    if (verdict == MONITOR_TRUE)
    {
      
      //verdict_box.className = 'verdict-true';
      verdict_box.innerHTML = 'true';
      $("#verdict-box").animate({ 'background-color': 'green' });
    }
    else if (verdict == MONITOR_FALSE)
    {
      //verdict_box.className = 'verdict-false';
      
      verdict_box.innerHTML = 'false';
      $("#verdict-box").animate({ 'background-color': 'red' });
    }
    else
    {
      //verdict_box.className = 'verdict-inconclusive';
      
      verdict_box.innerHTML = 'inconclusive';
      $("#verdict-box").animate({ 'background-color': 'yellow' });
    }
  };
  
  $("#monitor select").change(function() {
      $("#input-formula").val($(this).val());
      console.log($(this).val());
  });
  
  $("#btn-help").click(function() {
      $("#help").dialog({ height: 400, width: 650 });
      return false;
  });
  
  
  $('#main-title').bind('dblclick', function() {
          $(this).attr('contentEditable', true);
      }).blur(
          function() {
              $(this).attr('contentEditable', false);
          });
  $("#main-title-div").resizable();
  $("#yellowbox").draggable().resizable();
  $("#thelist li").resizable();
  $('#thelist li').bind('dblclick', function() {
          $(this).attr('contentEditable', true);
      }).blur(
          function() {
              $(this).attr('contentEditable', false);
          });
});
