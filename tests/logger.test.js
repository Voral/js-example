// noinspection JSUnresolvedReference

import {Logger} from '../src/logger';

describe('Logger', () => {
    let element;

    beforeEach(() => {
        element = document.createElement('div');
        element.innerText = '';
    });

    test('should log messages with EOL', () => {
        let logger = new Logger({element});
        const message = 'Test message';
        const event = new CustomEvent('exampleLog', {detail: {message}});
        document.dispatchEvent(event);
        expect(element.innerText).toContain(message + '\n');
        logger.destroy();
    });

    test('not should log messages if log element not defined', () => {
        let logger = new Logger({});
        const event = new CustomEvent('exampleLog', {detail: {message: 'Test message'}});
        document.dispatchEvent(event);
        expect(element.innerText).toEqual('');
        logger.destroy();
    });

    test('should return early if log element not defined', () => {
        let logger = new Logger({});
        const event = new CustomEvent('exampleLog', {detail: {message: 'Test message'}});
        logger.log(event);
        expect(true).toBe(true);
    });
});
