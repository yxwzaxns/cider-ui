import axios from 'axios'
import {showProjectPanel} from './project.js'
const DefaultCmd = ['help','cd','ls','login','showproject','showsetting'];
const Dir = ["project","setting"];
const SubCmd = ["list projects"];
const ErrorCmd = ['-bash: ki: command not found'];

axios.defaults.baseURL = 'http://api.cider.aong.cn:8080';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Authorization'] = 'none';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export class CommandLine {
  exec(cmd) {
    $(".console-input").last().off('keydown');
    switch (cmd) {
      case 'ls':
        this.display(Dir);
        break;
      case 'showproject':
        this.showproject();
        this.createNextCmdRow();
        break;
      case 'showsetting':
        this.showsetting();
        this.createNextCmdRow();
        break;
      case 'login':
        this.login();
        this.createNextCmdRow();
        break;
      case '':
        this.createNextCmdRow();
        break;
      default:
        this.display(ErrorCmd);
    }
  }
  execTab(cmd){
    $(".console-input").last().off('keydown');
    if (cmd == "") {
      this.display(DefaultCmd);
    }else{
      const result = DefaultCmd.filter(word => word.startsWith(cmd));
      if (result.length == 0) {
          return
      }
      else if (result.length == 1) {
        this.completeCmd(result)
      }else{
        this.display(result,cmd);
      }
    }
  }
  login(){

  }
  showproject(){
    axios.get('/api/v1/project/all')
    .then((response)=>{
      // console.log(response);
      showProjectPanel(response.data.data,$("#projects"))
    },()=>{
      console.log("can't get projects info!")
    })
  }
  showsetting(){

  }
  createProject(name,callback){
    if (name != '') {
      axios.post('/api/v1/project/',{projectURL: name}).then((response)=>{
        callback(response.data.status);
      }, (response)=>{
        console.log(response.status);
      })
    }
  }
  createNextCmdRow(extendCmd=''){
    if ($(".console-input").last().val() != '' || $(".console-input").length == 1) {
      $(".console-input").last().prop('disabled', 'false')
      $(".console-output").last().prop('disabled', 'false')
      let nextCmdRow = `
        <div class="console">
        <div class="console-head">Cider:~ unlogin$ </div>
        <input class="console-input" />
        </div>
      `
      // let console_head = $('<div></div>').addClass('console-head').text('Cider:~ unlogin$ ');
      // let console_input = $('<input>').addClass('console-input').val(extendCmd)
      // let console_line = $('<div></div>').addClass('console').append(console_head,console_input)
      $("#command-line").append($(nextCmdRow));
      // $(".console-input").last().focus()
      $(".console-input").last().focus();
      $(".console-input").last().val(extendCmd);
    }
  }
  completeCmd([cmd]){
    $(".console-input").last().val(cmd);
  }
  display(info,extendCmd=''){
    $(".console-input").last().prop('disabled', 'false')
    let console_head = $('<div></div>').addClass('console-head').text('');
    let console_output = $('<input>').addClass('console-output').val(info.join(' '));
    let console_line = $('<div></div>').addClass('console').append(console_head,console_output);
    $("#command-line").append(console_line);
    this.createNextCmdRow(extendCmd)
  }
}
