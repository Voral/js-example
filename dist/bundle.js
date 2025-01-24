!function(){"use strict";const t="exampleRemoveMe";const e="exampleLog";window.Button=class{constructor(t){this.options=t,this.handler=this.options.handler.bind(this),this.disabled=!1,this.button=document.createElement("button"),this.button.innerText=t.name||"Button",this.activateListeners()}activateListeners(){this.handler&&(this.disabled=!1,this.button.addEventListener("click",this.handler))}deactivateListeners(){this.handler&&!this.disabled&&(this.disabled=!0,this.sendLog("Deactivate listeners for "+this.button.innerText),this.button.removeEventListener("click",this.handler))}sendLog(t){let e=new CustomEvent(LOG_EVENT,{bubbles:!0,detail:{message:t}});this.button.dispatchEvent(e)}toggleDisabled(t){this.options.managed&&(this.button.classList.toggle("disabled",t),t?this.deactivateListeners():this.activateListeners())}getButton(){return this.button}destroy(){this.deactivateListeners()}},window.Toolbar=class{constructor(e){this.element=e.element||null,this.buttons=e.buttons||[],this.demoButtons=[],this.createPanels(),this.initButtons(),this.initSelfButtons(),this.customButtonsDisabled=!1,this.element.addEventListener(t,this.onRemoveQuery.bind(this))}onRemoveQuery(t){for(const e of this.demoButtons)if(e.button===t.target){this.removeButton(e),this.demoButtons.splice(this.demoButtons.indexOf(e),1);break}}createPanels(){this.editorPanel=document.createElement("div"),this.editorPanel.classList.add("toolbar__panel"),this.demoPanel=document.createElement("div"),this.demoPanel.classList.add("toolbar__panel"),this.element.appendChild(this.editorPanel),this.element.appendChild(this.demoPanel)}initSelfButtons(){this.btnDisable=new Button({managed:!1,name:"Disable",handler:this.disableOther}),this.demoPanel.appendChild(this.btnDisable.getButton()),this.btnDelete=new Button({managed:!1,name:"Delete",handler:this.deleteOther}),this.demoPanel.appendChild(this.btnDelete.getButton())}deleteOther=()=>{this.customButtonsDisabled=!this.customButtonsDisabled;for(const t of this.buttons)this.removeButton(t.instance),t.instance=null;this.removeButton(this.btnDisable),this.btnDisable=null};removeButton(t){t&&(t.destroy(),t.getButton().remove())}disableOther=t=>{this.customButtonsDisabled=!this.customButtonsDisabled,t.target.innerText=this.customButtonsDisabled?"Enable":"Disable";for(const t of this.buttons)t.instance.toggleDisabled(this.customButtonsDisabled)};initButtons(){for(const t of this.buttons)t.managed=!0,t.instance=new Button(t),this.editorPanel.appendChild(t.instance.getButton())}addButton(t,e){const s={name:t,handler:e,managed:!0};s.instance=new Button(s),this.editorPanel.appendChild(s.instance.getButton()),this.buttons.push(s)}addDemoButton(t,e){const s={name:t,handler:e,managed:!0};s.instance=new Button(s),this.demoPanel.insertBefore(s.instance.getButton(),this.demoPanel.firstChild),this.demoButtons.push(s.instance)}destroy(){this.deleteOther(),this.removeButton(this.btnDelete)}},window.Logger=class{constructor(t){this.element=t.element||null,document.addEventListener(e,this.log.bind(this))}log(t){this.element.innerText+=t.detail.message+"\n"}destroy(){document.removeEventListener(e,this.log.bind(this))}},window.LOG_EVENT=e,window.REMOVE_ME_EVENT=t}();