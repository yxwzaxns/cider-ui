$(document).ready(function () {
  console.log("init completed")

  $("#terminal").click(function(event) {
    if($("#commmand-line").css('display') == "none"){
      $("#commmand-line").show('slow/400/fast', function() {
        $(".console-input").last().focus()
      });
    }else{
      $("#commmand-line").hide('slow/400/fast', function() {
      });
    }
  });

  $(".console-input").last().focus()

  $(".console-input").last().on('keydown', checkCommand);

  function checkCommand(e) {
    switch (e.which) {
      case 13:
        console.log("enter");
        createCommand()
        // e.preventDefault();
        break;
      case 9:
        console.log("tab");
        // displayAbout();
        // e.preventDefault();
        break;
      default:
        console.log(e.which);
        // e.preventDefault();
    }
    // if (e.which == 13) {
    //   console.log($(this).val());
    //   $(this).prop('disabled', 'false')
    //   var console_head = $('<div></div>').addClass('console-head').text('cider$')
    //   var console_input = $('<input>').addClass('console-input')
    //   var console_line = $('<div></div>').addClass('console').append(console_head,console_input).on('keydown', createCommand)
    //   $("#commmand-line").append(console_line);
    // }
    // $(".console-input").last().focus()
  }
})
