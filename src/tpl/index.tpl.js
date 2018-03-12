import Github_White_logo from '../img/githublogow.png';

let Index_Tpl = `
<div id="main">
  <div id="projects">
    <div id="addProject">
      <i class="inverted brown plus circle massive icon"></i>
    </div>
  </div>
</div>

<div id="command-line">
  <div class="console">
    <div class="console-head">Cider:~ $ </div>
    <input class="console-input"></input>
  </div>
</div>
<div id="terminal">
  <i class="terminal large icon"></i>
</div>
<div id="tip">
<i class="icons">
  <i class="sun big  green loading icon" id="sun"></i>
  <i class="eye black icon"></i>
</i>
</div>
<!-- other modal -->

<!-- add project modal begin -->
<div class="ui addProjectModal basic tiny modal transition">
    <div class="header">
      Create Your Project
    </div>
    <div class="content" style="width:auto;">
      <div class="ui fluid input labeled focus">
        <div class="ui black Large image label">
          <img src="${Github_White_logo}" style="margin-left:5px;margin-right:1px;">
        </div>
        <input type="text" id="newProjectName" placeholder="github.com/your_name/project_name" style="font-size:16px;">
      </div>
    </div>
    <div class="actions">
      <div class="ui cancel button">
        No
      </div>
      <div class="ui positive ok button">
        Yes
        <!-- <i class="checkmark icon"></i> -->
      </div>
    </div>
</div>
`
export { Index_Tpl }
