import githubLogo from '../img/github.png'
import Handlebars from 'handlebars'
import { ProjectInfoPanel_Tpl,ProjectInfoItem_Tpls } from '../tpl/projectInfo.tpl.js'
import { UpdateProject, GetProject } from './api.js'

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
    initProjectModalEvent();
  });
}

function initProjectModalEvent() {
  // bind modal show event
  $("#projects .projectItem").each(function(index, el) {
    $(el).on('click', function(event) {
      let currentProjectName = $(this).data("name");
      GetProject(currentProjectName).then((projectData)=>{
        // create template of project panel and append it
        let projectInfoPanel = ProjectInfoPanel_Tpl(projectData);
        if ($("#project_info").length != 0) {
          $("#project_info").remove();
        }
        $("body").append(projectInfoPanel);
        // init modal menu before show panel of project
        $("#menu-item a").removeClass('active').first().addClass('active');
        $("#show-panel").text("").append(ProjectInfoItem_Tpls["project_status"](projectData));
        // show modal of project detail
        $("#project_info")
        .modal({
          closable: false,
          onHide: function() {
            return true;
          }
        })
        .modal('show');
        // bind menu event of project's panel
        $('#menu-item a').each(function(index, el) {
          $(el).on('click', function(event) {
            $('#menu-item a').removeClass('active');
            $(this).addClass('active');
            $("#show-panel").text("").append(ProjectInfoItem_Tpls[$(this).data("name")](projectData));
            $(".ui .checkbox").checkbox({
              // bind change button event
              'onChecked': function(){
                if ($(this).attr("name") == "lock_email") {
                  $("#recev_email").parent().addClass('disabled');
                }
                updateProject($(this).attr("name"),'1',()=>{
                  projectData[$(this).attr("name")] = true;
                });
              },
              'onUnchecked': function(){
                if ($(this).attr("name") == "lock_email") {
                  $("#recev_email").parent().removeClass('disabled');
                }else{
                  updateProject($(this).attr("name"),'0',()=>{
                    projectData[$(this).attr("name")] = false;
                  });
                }
              }
            });
          });
        });

      });
    });
  });
}
function createProjectListNode(projectData, hookNode) {
  if (projectData.length != 0) {
    console.log(projectData);
    for (let [i,p] of projectData.entries()) {
      let projectItem = `
      <div class="projectItem" data-name="${p.ProjectName}" data-id="${i}">
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

function updateProject(name, yes, callback) {
  let field = "";
  if (name == 'lock_email') {
    field = {
      'field' : 'Email:' + $("#recev_email").val()
    };
  }else{
    field = {
      "field" : name + ':' + yes
    };
  }
  console.log($("#project_info").data("name"))
  UpdateProject($("#project_info").data("name"), field)
  .then(()=>{
    callback()
  })
}
export {ShowProjectPanel}
