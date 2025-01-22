
class Button {
    constructor(options) {
        this.title = options.name || 'Button';
        this.handler = options.handler.bind(this) || null;
        this.managed = !!options.managed;
        this.disabled = false;

        this.button = document.createElement('button');
        this.button.innerText = this.title;
        this.activateListeners();
    }

    activateListeners() {
        if (this.handler) {
            this.disabled = false;
            this.button.addEventListener('click', this.handler);
        }
    }

    deactivateListeners() {
        if (!!this.handler && !this.disabled) {
            this.disabled = true
            this.sendLog('Deactivate listeners for ' + this.title);
            this.button.removeEventListener('click', this.handler);
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
        if (this.managed) {
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
