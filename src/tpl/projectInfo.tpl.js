import GithubLogo from '../img/github.png';

let ProjectInfoPanel_Tpl_t = `
<div class="ui modal" id="project_info">
  <i class="close icon"></i>
  <div class="header">
    Profile Picture
  </div>
  <div class="content">
  <p>aa</p>
  </div>
  <div class="actions">
    <div class="ui black deny button">
      Nope
    </div>
    <div class="ui positive right labeled icon button">
      Yep, that's me
      <i class="checkmark icon"></i>
    </div>
  </div>
</div>
`

let ProjectInfoPanel_Tpl = `
<div class="ui modal large" id="project_info">
  <div class="header">
    Project Info
  </div>
  <div class="content">
    <div class="ui block header">
      <!-- header block -->
      <div class="ui grid">
        <div class="nine wide column">
          <div class="item">
             <div class="ui rounded image">
               <img src="${GithubLogo}">
             </div>
             <div class="content">
               <a class="header">Cider</a>
               <div class="meta">
                 <span></span>
               </div>
               <div class="description">
                 <p>github.com/yxwzaxns/cider </p>
               </div>

               <div class="ui image label">
                 <i class="clock icon"></i>
                 Created a 1 week age
               </div>
               <div class="ui image label">
                 <i class="circle green icon"></i>
                 Running
               </div>
             </div>
           </div>
        </div>
        <div class="seven wide column">
         <button class="ui compact labeled  negative right floated icon button" style="margin-top:5px">
           <i class="stop black icon"></i>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stop&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         </button>

         <button class="ui compact labeled positive right floated  icon button" style="margin-top:5px">
           <i class="redo black icon"></i>
           Redeploy
         </button>
         <button class="ui compact labeled positive right floated  icon button" style="margin-top:5px">
           <i class="cog black icon"></i>
           &nbsp;&nbsp;&nbsp;Build&nbsp;&nbsp;&nbsp;
         </button>
        </div>
      </div>
    </div>
    <div class="ui grid">
      <div class="four wide column">
        <div class="ui vertical  tabular menu" id="menu-item">
          <a class="item active" data-name="project_status">
            Project Status
          </a>
          <a class="item" data-name="message_settings">
            Message Settings
          </a>
          <a class="item" data-name="project_settings">
            Porject Settings
          </a>
          <a class="item disabled">
          </a>
          <a class="item disabled">
          </a>
          <a class="item disabled">
          </a>
          <a class="item disabled">
          </a>
        </div>
      </div>
      <div class="twelve wide stretched column" id="show-panel">
        <!-- <div class="ui segment">
          This is an stretched grid column. This segment will always match the tab height
        </div> -->

      </div>
    </div>
  </div>
  <div class="actions">
    <div class="ui black cancel right labeled icon button">
      Close
      <i class="close icon"></i>
    </div>
  </div>
</div>
`

let project_status = `
<div class="ui segment" style="height:10%;">
  <div class="ui four small steps" id="project-status">
    <div class="completed step">
      <i class="truck icon"></i>
      <div class="content">
        <div class="title">Ready</div>
      </div>
    </div>
    <div class="step">
      <i class="cog yellow loading  icon"></i>
      <div class="content">
        <div class="title">Building</div>
      </div>
    </div>
    <div class="disabled step">
      <i class="sync red    icon"></i>
      <div class="content">
        <div class="title">deploying</div>
      </div>
    </div>
    <div class="disabled step">
      <i class="red hourglass outline   icon"></i>
      <div class="content">
        <div class="title">Succeed</div>
      </div>
    </div>
  </div>
</div>

<div class="ui inverted segment">
<p>log</p>
</div>
  `

let project_settings = `
<div class="ui segment">
  <div class="field">
    <div class="ui toggle checked checkbox" id="build_message_choose">
      <label>Auto build</label>
      <input type="checkbox" name="gift"  checked="">
    </div>
  </div>
</div>
  `;
let message_settings = `
  <div class="ui segment">
     <div class="field">
       <div class="ui right left icon input">
         <i class="envelope icon"></i>
         <input type="text" placeholder="Enter Email">
       </div>
       <div class="ui checked toggle checkbox" style="margin-left:20px;">
         <input type="checkbox" name="public" checked="">
         <label>Edit after unlocking</label>
       </div>
     </div>
  </div>
  <div class="ui segment">
     <div class="field">
       <div class="ui toggle checkbox" id="build_message_choose">
         <label>Send a message prompt when the project builds successfully</label>
         <input type="checkbox" name="gift" tabindex="0" class="hidden">
       </div>
     </div>
  </div>
  <div class="ui segment">
     <div class="field">
       <div class="ui toggle checkbox">
         <label>Send a message prompt when the project deploys successfully</label>
         <input type="checkbox" name="gift" tabindex="0" class="hidden">
       </div>
     </div>
  </div>
`;

let ProjectInfoItems = {"project_status":project_status,"project_settings":project_settings,"message_settings":message_settings}

export {ProjectInfoPanel_Tpl,ProjectInfoItems}
