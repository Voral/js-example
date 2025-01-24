import {Button} from './button.js';

export const REMOVE_ME_EVENT = 'exampleRemoveMe';

export class Toolbar {
    constructor(options) {
        this.element = options.element || null;
        if (this.element === null) {
            return;
        }
        this.buttons = options.buttons || [];
        this.demoButtons = [];
        this.createPanels();
        this.initButtons();
        this.initSelfButtons();
        this.customButtonsDisabled = false;
        this.element.addEventListener(REMOVE_ME_EVENT, this.onRemoveQuery.bind(this));
    }

    onRemoveQuery(e) {
        if (this.element === null) {
            return;
        }
        for (const button of this.demoButtons) {
            if (button.button === e.target) {
                this.removeButton(button)
                this.demoButtons.splice(this.demoButtons.indexOf(button), 1);
                break;
            }
        }
    }

    createPanels() {
        if (this.element === null) {
            return;
        }
        this.editorPanel = document.createElement('div');
        this.editorPanel.classList.add('toolbar__panel');
        this.demoPanel = document.createElement('div');
        this.demoPanel.classList.add('toolbar__panel');
        this.element.appendChild(this.editorPanel);
        this.element.appendChild(this.demoPanel);
    }

    initSelfButtons() {
        if (this.element === null) {
            return;
        }
        this.btnDisable = new Button({
            managed: false,
            name: 'Disable',
            handler: this.disableOther
        })
        this.demoPanel.appendChild(this.btnDisable.getButton());
        this.btnDelete = new Button({
            managed: false,
            name: 'Delete',
            handler: this.deleteOther
        })
        this.demoPanel.appendChild(this.btnDelete.getButton());
    }

    deleteOther = () => {
        if (this.element === null) {
            return;
        }
        this.customButtonsDisabled = !this.customButtonsDisabled;
        for (const button of this.buttons) {
            this.removeButton(button.instance);
            button.instance = null;
        }
        this.removeButton(this.btnDisable);
        this.btnDisable = null;
    }

    removeButton(button) {
        if (button) {
            button.destroy();
            button.getButton().remove();
        }
    }

    disableOther = (e) => {
        if (this.element === null) {
            return;
        }
        this.customButtonsDisabled = !this.customButtonsDisabled;
        e.target.innerText = this.customButtonsDisabled ? 'Enable' : 'Disable';
        for (const button of this.buttons) {
            button.instance.toggleDisabled(this.customButtonsDisabled);
        }
    }

    initButtons() {
        if (this.element === null) {
            return;
        }
        for (const button of this.buttons) {
            button.managed = true;
            button.instance = new Button(button);
            this.editorPanel.appendChild(button.instance.getButton());
        }
    }

    addButton(title, handler) {
        if (this.element === null) {
            return;
        }
        const options = {
            name: title,
            handler: handler,
            managed: true
        }
        options.instance = new Button(options);
        this.editorPanel.appendChild(options.instance.getButton());
        this.buttons.push(options);
    }

    addDemoButton(title, handler) {
        if (this.element === null) {
            return;
        }
        const options = {
            name: title,
            handler: handler,
            managed: true
        }
        options.instance = new Button(options);
        this.demoPanel.insertBefore(options.instance.getButton(), this.demoPanel.firstChild);
        this.demoButtons.push(options.instance);
    }

    destroy() {
        if (this.element === null) {
            return;
        }
        this.deleteOther();
        this.removeButton(this.btnDelete);
    }
}