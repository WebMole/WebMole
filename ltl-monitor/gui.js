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
      verdict_box.className = 'verdict-nomonitor';
      verdict_box.innerHTML = 'no monitor';
    }
    else
    {
      verdict_box.className = 'verdict-inconclusive';
      verdict_box.innerHTML = 'inconclusive';
    }
  });
  
  // Evaluate monitor when clicking on button
  document.getElementById("btn-evaluate").onclick = function()
  {
    monitor.processEvent(document);
    var verdict_box = document.getElementById("verdict-box");
    var verdict = monitor.getVerdict();
    if (verdict == MONITOR_TRUE)
    {
      verdict_box.className = 'verdict-true';
      verdict_box.innerHTML = 'true';
    }
    else if (verdict == MONITOR_FALSE)
    {
      verdict_box.className = 'verdict-false';
      verdict_box.innerHTML = 'false';
    }
    else
    {
      verdict_box.className = 'verdict-inconclusive';
      verdict_box.innerHTML = 'inconclusive';
    }
  }
  
  $("#monitor select").change(function() {
      $("#input-formula").val($(this).val());
      console.log($(this).val());
  });
  
  $("#yellowbox").draggable().resizable();
  $("#thelist li").resizable();
  $('#thelist li').bind('dblclick', function() {
          $(this).attr('contentEditable', true);
      }).blur(
          function() {
              $(this).attr('contentEditable', false);
          });
});
