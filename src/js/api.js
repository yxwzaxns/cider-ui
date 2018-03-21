import axios from 'axios'
import {Nya} from 'nya.js'
import { Base64 } from 'js-base64';

function CheckAPIStatus() {
  setInterval(()=>{
    axios.get('/api/v1/ping')
      .then((response)=>{
        if (response.data.status == "ok") {
          $("#tip i i").first().removeClass('red').addClass('green');
        }else{
          alert("api status error")
          // $("#tip i i").first().removeClass('green').addClass('red');
        }
      },(response)=>{
        $("#tip i i").first().removeClass('green').addClass('red');
      })
  }, 100000)
}

function GetProject(projectName) {
  let req = axios.get('/api/v1/project/' + projectName);
  return req
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        alert(error.message);
      });
}
function Auth(_key) {
  axios.post('/api/v1/user/auth',{key: Base64.encode(_key)})
  .then((response)=>{
    axios.defaults.headers.common['Authorization'] = response.data.token;
    window.cmd.createNextCmdRow();
    $(".console-input").last().on('keydown', window.checkCommand);
  }, (error)=>{
    window.cmd.display([error.message]);
    window.cmd.createNextCmdRow();
    $(".console-input").last().on('keydown', window.checkCommand);
  })
}
function UpdateProject(projectName, field) {
  let req = axios.put('/api/v1/project/' + projectName + '/update',field);
  return req
      .then(()=>{
        return true
      })
      .catch(error => {
        alert(error.message);
      });
}
export {CheckAPIStatus, Auth, UpdateProject, GetProject}
