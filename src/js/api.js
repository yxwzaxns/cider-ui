import axios from 'axios'
import { Base64 } from 'js-base64';

function CheckAPIStatus() {
  axios.get('/api/v1/ping')
  .then((response)=>{
    if (response.data.status == "ok") {
      console.log("api status ok");
    }else{
      alert("api status error")
    }
  },(response)=>{

  })
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
export {CheckAPIStatus, Auth}
