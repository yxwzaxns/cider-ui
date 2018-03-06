import githubLogo from '../img/github.png'

let tpl = `
<div class="project">
  <div id="head" class="p">
    <img src="./img/github.png" id="icon">
    <p id="name">Project Name</p>
  </div>
  <div class="line"></div>
  <div id="content" class="p">
    <p>Cider is a concise CI/CD tool for docker</p>
  </div>
  <div class="line"></div>
  <div id="status" class="p">
    <div id="ci">ci</div>
    <div id="cd">cd</div>
  </div>
</div>`

function ShowProjectPanel(projectData, hookNode) {
  let projectNum = hookNode.children('.projectItem').length;
  if(projectNum == 0){
    createProjectListNode(projectData, hookNode);
  }else{
    cleanProjectsNode();
    createProjectListNode(projectData, hookNode);
  }
  $('#projects').show('slow/600/fast', function() {

  });
}

function createProjectListNode(projectData, hookNode) {
  if (projectData.length != 0) {
    console.log(projectData);
    for (let p of projectData) {
      let projectItem = `
      <div class="projectItem">
        <div id="head" class="p">
          <img src="${githubLogo}" id="icon">
          <p id="name">${p.ProjectName}</p>
        </div>
        <div class="line"></div>
        <div id="content" class="p">
          <p>${p.ProjectURL}</p>
        </div>
        <div class="line"></div>
        <div id="status" class="p">
          <div id="ci">ci</div>
          <div id="cd">cd</div>
        </div>
      </div>
      `
      $(projectItem).insertBefore($("#addProject"));
      // $("#projects").append(projectItem)
    }
  }
}

function cleanProjectsNode(){
  $(".projectItem").remove();
}
export {ShowProjectPanel}
