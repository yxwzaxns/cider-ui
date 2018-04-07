import {GithubRepoCheck} from './api.js'

function CheckProject(name,callback) {
  let url = name
  if (!url.includes("github")) {
    url = "https://api.github.com/repos/" + name;

  }else{
    name = name.split("/").slice(-2).join("/")
    url = "https://api.github.com/repos/" + name;
  }
  name = "github.com/" + name
  GithubRepoCheck(url)
  .done(()=>{
    callback(true,name)
  })
  .fail((e)=>{
    callback(e.statusText,name)
  })
}

export {CheckProject}
