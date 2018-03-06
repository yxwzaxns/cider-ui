import axios from 'axios'
import {CommandLine} from './command-line.js'
import {CheckAPIStatus} from './api.js'

$(document).ready(function () {


  window.cmd = new CommandLine()

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
        cmd.exec($(this).val().split(" ")[0])
        $(".console-input").last().on('keydown', window.checkCommand);
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
  }
  window.checkCommand = checkCommand;

  InitNet();
  CheckAPIStatus();
  console.log("init completed");
})

function InitNet() {
  axios.defaults.baseURL = 'http://cider.aong.cn:8080/';
  // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Authorization'] = 'none';

  axios.interceptors.response.use(function (response) {
      // Do something with response data
      // console.log(response.data)
      switch (response.data.code) {
        case 403:
          throw new axios.Cancel("No Access Permit");
          break;
        case 401:
          throw new axios.Cancel("Key Not Match");
          break;
        default:

      }
      return response;
    }, function (error) {

      // Do something with response error
      return Promise.reject(error);
    });
}
