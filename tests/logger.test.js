import { Logger } from '../src/logger';

describe('Logger', () => {
    let logger;
    let element;

    beforeEach(() => {
        element = document.createElement('div');
        logger = new Logger({ element });
    });

    afterEach(() => {
        logger.destroy();
    });

    test('should log messages with EOL', () => {
        const message = 'Test message';
        const event = new CustomEvent('exampleLog', { detail: { message } });
        document.dispatchEvent(event);
        expect(element.innerText).toContain(message+'\n');
    });
});
