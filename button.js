class Button {
    constructor(options) {
        this.title = options.name || 'Button';
        this.handler = options.handler || null;
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
        if (this.handler && !this.disabled) {
            this.disabled = true;
            let event = new CustomEvent("exampleLog", {
                bubbles: true,
                detail: {message: 'Deactivate listeners for ' + this.title}
            });
            this.button.dispatchEvent(event);
            this.button.removeEventListener('click', this.handler);
        }
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
