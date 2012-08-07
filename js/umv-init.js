$(document).ready(function() {

  // Load PrettyPrint
  prettyPrint();

  //Noty test
  var my_notification = noty({type: "information", text: 'noty is alive and javascript is ebabled ;)', timeout: 3000});

  // Handlers for buttons and actions
  attachHandlers();
});

function attachHandlers() {
  // Main compute button
  $('.action_compute').on('click', function() {
    init();
  });
  
  $('.action_clear').on('click', function() {
    $('.source_input').html('');
    $('.source_input').val('');
  });
}

/*
filesUpload.addEventListener("change", function () {
  traverseFiles(this.files);
}, false);

dropArea.addEventListener("dragleave", function (evt) {
  var target = evt.target;

  if (target && target === dropArea) {
    this.className = "";
  }
  evt.preventDefault();
  evt.stopPropagation();
}, false);

dropArea.addEventListener("dragenter", function (evt) {
  this.className = "over";
  evt.preventDefault();
  evt.stopPropagation();
}, false);

dropArea.addEventListener("dragover", function (evt) {
  evt.preventDefault();
  evt.stopPropagation();
}, false);

dropArea.addEventListener("drop", function (evt) {
  traverseFiles(evt.dataTransfer.files);
  this.className = "";
  evt.preventDefault();
  evt.stopPropagation();
}, false);

function traverseFiles (files) {
  if (typeof files !== "undefined") {
    for (var i=0, l=files.length; i<l; i++) {
      uploadFile(files[i]);
    }
  }
  else {
    fileList.innerHTML = "No support for the File API in this web browser";
  }
}

*/