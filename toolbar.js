class Toolbar {
    constructor(options) {
        this.element = options.element || null;
        this.buttons = options.buttons || [];
        this.initButtons();
        this.initSelfButtons();
        this.customButtonsDisabled = false;
    }

    initSelfButtons() {
        this.btnDisable = new Button({
            managed: false,
            name: 'Disable',
            handler: this.disableOther
        })
        this.element.appendChild(this.btnDisable.getButton());
        this.btnDelete = new Button({
            managed: false,
            name: 'Delete',
            handler: this.deleteOther
        })
        this.element.appendChild(this.btnDelete.getButton());
    }

    deleteOther = () => {
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
        this.customButtonsDisabled = !this.customButtonsDisabled;
        e.target.innerText = this.customButtonsDisabled ? 'Enable' : 'Disable';
        for (const button of this.buttons) {
            button.instance.toggleDisabled(this.customButtonsDisabled);
        }
    }

    initButtons() {
        for (const button of this.buttons) {
            button.managed = true;
            button.instance = new Button(button);
            this.element.appendChild(button.instance.getButton());
        }
    }

    destroy() {
        this.deleteOther();
        this.removeButton(this.btnDelete);
    }
}