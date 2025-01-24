export const LOG_EVENT = 'exampleLog';

export class Logger {
    constructor(options) {
        this.element = options.element || null;

        document.addEventListener(LOG_EVENT, this.log.bind(this));
    }

    log(e) {
        this.element.innerText += e.detail.message + '\n';
    }

    destroy() {
        document.removeEventListener(LOG_EVENT, this.log.bind(this));
    }
}