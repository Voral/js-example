export const LOG_EVENT = 'exampleLog';

export class Logger {
    constructor(options) {
        this.element = options.element || null;
        if (this.element !== null) {
            document.addEventListener(LOG_EVENT, this.log.bind(this));
        }
    }

    log(e) {
        if (this.element === null) {
            return;
        }
        this.element.innerText += e.detail.message + '\n';
    }

    destroy() {
        if (this.element !== null) {
            document.removeEventListener(LOG_EVENT, this.log.bind(this));
        }
    }
}