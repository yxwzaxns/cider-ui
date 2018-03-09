import {Nya} from 'nya.js'
import axios from 'axios'
import {Message} from '../components/message.js'


function IndexInit() {
  Nya.bind("api_status",()=>{
    console.log("api changes to : " + Nya.api_status)
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

}

export {IndexInit}
