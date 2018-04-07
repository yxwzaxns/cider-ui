import axios from 'axios'
import {Nya} from 'nya.js'
import {Auth, CheckAPIStatus} from './api.js'
import {ShowProjectPanel} from './project.js'
import {CheckProject} from './utils.js'

const DefaultCmd = ['help','cd','ls','auth','showproject','showsetting','setapi'];
const Dir = ["project","setting"];
const SubCmd = ["list projects"];
const ErrorCmd = ['-bash: ki: command not found'];

export class CommandLine {
  constructor() {
    this.historyCmdTable = {
      list: [],
      cur: 0,
      push: function(c){
        this.list.push(c)
        this.cur = this.list.length;
      },
      next: function(){
        if (this.list[this.cur + 1] != undefined) {
          this.cur += 1;
          return this.list[this.cur];
        }else{
          this.cur = this.list.length;
          return "";
        }
      },
      last: function(){
        if (this.list[this.cur - 1] != undefined) {
          this.cur -= 1;
          return this.list[this.cur];
        }else{
          return null;
        }
      }
    }
  }
  exec(cmd) {
    $(".console-input").last().off('keydown');
    switch (cmd) {
      case 'ls':
        this.display(Dir);
        this.createNextCmdRow();
        break;
      case 'showproject':
        this.showProject();
        break;
      case 'showsetting':
        this.showSetting();
        break;
      case 'auth':
        this.authwithkey();
        break;
      case 'setapi':
        this.setApiAddress();
        this.createNextCmdRow();
        break;
      case '':
        this.createNextCmdRow();
        break;
      default:
        this.display(ErrorCmd);
        this.createNextCmdRow();
    }
    if (cmd != "" && $.inArray(cmd, DefaultCmd) != -1) {
      this.historyCmdTable.push(cmd);
    }
  }
  execTab(cmd){
    $(".console-input").last().off('keydown');
    if (cmd == "") {
      this.displayTab(DefaultCmd);
    }else{
      const result = DefaultCmd.filter(word => word.startsWith(cmd));
      if (result.length == 0) {
          return
      }else if (result.length == 1) {
        this.completeCmd(result)
      }else{
        this.displayTab(result,cmd);
      }
    }
  }
  execUp() {
    let c = this.historyCmdTable.last();
    if (c == null) {
      return
    }else{
      $(".console-input").last().val(c);
    }
  };
  execDown() {
    let c = this.historyCmdTable.next();
    if (c == "") {
      $(".console-input").last().val("")
    }else{
      $(".console-input").last().val(c)
    }
  };
  display403info(){
    this._display403info()
  }
  authwithkey(){
    let key = $(".console-input").last().val().split(" ")[1];
    Auth(key)
  }
  setApiAddress(){
    let apiAddr = $(".console-input").last().val().split(" ")[1];
    axios.defaults.baseURL = apiAddr;
    CheckAPIStatus()
  }
  showProject(){
    axios.get('/api/v1/project/all')
    .then((response)=>{
      ShowProjectPanel(response.data.data,$("#projects"))
      // ----------------------
      // async is a very stupid way
      this.createNextCmdRow();
      $(".console-input").last().on('keydown', window.checkCommand);
      // ----------------------
    },(error)=>{
      this.display([error.message]);
      // ----------------------
      // async is a very stupid way way
      this.createNextCmdRow();
      $(".console-input").last().on('keydown', window.checkCommand);
      // ----------------------
    })

  }
  showSetting(){

  }
  createProject(name,callback){
    CheckProject(name,(res,validName)=>{
      if (res == true) {
        axios.post('/api/v1/project/',{projectURL: validName}).then((response)=>{
          callback(response.data.status);
        }, (response)=>{
          console.log(response.status);
        })
      }else{
        // project is not valid
        this.display([name ,res])
        callback("fail");
        // this.createNextCmdRow()
      }
    })
  }
  createNextCmdRow(extendCmd=''){
    // || $(".console").last().children('.console-output').length == 1
    // if ($(".console-input").last().val() != '' || $(".console-input").length == 1) {
      $(".console-input").last().prop('disabled', 'false')
      $(".console-output").last().prop('disabled', 'false')
      let nextCmdRow = `
        <div class="console">
        <div class="console-head">Cider:~ $ </div>
        <input class="console-input" />
        </div>
      `
      $("#command-line").append($(nextCmdRow));
      // $(".console-input").last().focus()
      $(".console-input").last().focus();
      if (extendCmd != "") {
        $(".console-input").last().val(extendCmd);
      }
    // }
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
  }
  displayTab(info,extendCmd=''){
    $(".console-input").last().prop('disabled', 'false')
    let console_head = $('<div></div>').addClass('console-head').text('');
    let console_output = $('<input>').addClass('console-output').val(info.join(' '));
    let console_line = $('<div></div>').addClass('console').append(console_head,console_output);
    $("#command-line").append(console_line);
    this.createNextCmdRow(extendCmd)
  }
}
