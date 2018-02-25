var cmd = ["help","list","login","add"];
var subCmd = ["list projects"];

function displayAbout(cmd) {
  if (cmd == "") {
    createCommand()
  }
}

function createCommand() {
  console.log($(this).val());
  // $(this).prop('disabled', 'false')
  // var console_head = $('<div></div>').addClass('console-head').text('cider$');
  // var console_input = $('<input>').addClass('console-input')
  // var console_line = $('<div></div>').addClass('console').append(console_head,console_input).on('keydown', createCommand)
  // $("#commmand-line").append(console_line);
  // $(".console-input").last().focus()
}
