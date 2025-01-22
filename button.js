class Button {
    constructor(options) {
        this.options = options;
        this.handler = options.handler.bind(this) || null;
        this.disabled = false;
        this.button = document.createElement('button');
        this.button.innerText = options.name || 'Button';
        this.activateListeners();
    }

    activateListeners() {
        if (this.handler) {
            this.disabled = false;
            this.button.addEventListener('click', this.options.handler.bind(this));
        }
    }

    deactivateListeners() {
        if (!!this.handler && !this.disabled) {
            this.disabled = true
            this.sendLog('Deactivate listeners for ' + this.button.innerText);
            this.button.removeEventListener('click', this.options.handler.bind(this));
        }
    }

    sendLog(message) {
        let event = new CustomEvent(LOG_EVENT, {
            bubbles: true,
            detail: {message: message}
        });
        this.button.dispatchEvent(event);
    }

    toggleDisabled(disabled) {
        if (this.options.managed) {
            // this.button.disabled = disabled; // закомментировано для тестирования
            this.button.classList.toggle('disabled', disabled);
            if (disabled) {
                this.deactivateListeners();
            } else {
                this.activateListeners();
            }
        }
    }

    getButton() {
        return this.button;
    }

    destroy() {
        this.deactivateListeners();
    }
}
