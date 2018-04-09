import {Nya} from 'nya.js'
import axios from 'axios'
import {Message} from '../components/message.js'


function IndexInit() {
  Nya.bind("api_status",()=>{
    console.log("api address was changed")
    updateAPIStatus()
  })
  $("body").append(Message);

  $("#tip").mouseenter(()=>{
    // $("#info-apierr").show('600', function() {
    //
    // });
    if ($("#tip i i").first().hasClass('red')) {
      $("#info-apierr").removeClass('hidden');
    }
  })

  $("#tip").mouseleave(()=>{
    $("#info-apierr").addClass('hidden');
  })

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
      $("#notifi").hide();
      $('.addProjectModal.modal')
      // .modal('setting', 'closable', false)
      .modal({
        closable: false,
        onApprove: ()=>{
          console.log("click ok")
          let token = null
          cmd.createProject($("#newProjectName").val(),function(res){
            if (res == "ok") {
              token = 1
            }else{
              $("#notifi").html(res).show('slow/400/fast', function() {

              });
              token = 0
            }
          })
        while (token != null) {
            return token == 1? true: false;
        }
        },
        onHidden: ()=>{
          console.log("perpare close")
          cmd.exec('showproject');
          $(".console-input").last().on('keydown', checkCommand);
          $("#addProject").fadeIn('400')
        }
      })
      .modal('show');
    });
  });

  $(".console-input").last().focus()
}

function updateAPIStatus() {
  if (Nya.api_status === "ok") {
    $("#tip i i").first().removeClass('red').addClass('green');
  }else{
    $("#tip i i").first().removeClass('green').addClass('red');
  }
}

export {IndexInit}
