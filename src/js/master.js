import {CommandLine} from './command-line.js'

$(document).ready(function () {
  let CurrentPath = '~';
  console.log("init completed")
  let cmd = new CommandLine()

  $("#terminal").click(function(event) {
    if($("#command-line").css('display') == "none"){
      $("#command-line").show('slow/400/fast', function() {
        $(".console-input").last().focus()
      });
    }else{
      $("#command-line").hide('slow/400/fast', function() {
      });
    }
  });

  $("#addProject").on('click', function(event) {
    $("#addProject").fadeOut('400', function() {
      $('.addProjectModal.modal')
      // .modal('setting', 'closable', false)
      .modal({
        closable: false,
        onApprove: ()=>{
          cmd.createProject($("#newProjectName").val(),(res)=>{
            if (res != 'ok') {
              alert("system error !");
              return false
            }
          })
        },
        onHidden: ()=>{
          cmd.exec('showproject');
          $(".console-input").last().on('keydown', checkCommand);
          $("#addProject").fadeIn('400')
        }
      })
      .modal('show');
    });
  });

  $(".console-input").last().focus()

  $(".console-input").last().on('keydown', checkCommand);

  function checkCommand(e) {
    switch (e.which) {
      case 13:
        console.log(e.which+' has been press')
        cmd.exec($(this).val())
        $(".console-input").last().on('keydown', checkCommand);
        break;
      case 9:
        cmd.execTab($(this).val())
        $(".console-input").last().on('keydown', checkCommand);
        e.preventDefault();
        break;
      default:
        // console.log(e.which);
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
  }
})
