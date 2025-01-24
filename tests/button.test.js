// noinspection JSUnresolvedReference

import {Button} from '../src/button';
import {Logger} from "../src/logger";

describe('Button', () => {
    let buttonInstance;
    let element;
    beforeEach(() => {
        element = document.createElement('div');
        element.innerText = '';
        document.body.appendChild(element);
    });
    afterEach(() => {
        buttonInstance.destroy();
        document.body.removeChild(element);
    });

    test('should create a button with the correct name', () => {
        buttonInstance = new Button({name: 'Test Button', handler: jest.fn()});
        expect(buttonInstance.getButton().innerText).toBe('Test Button');
    });

    test('should create a button with the correct default name', () => {
        buttonInstance = new Button({handler: jest.fn()});
        expect(buttonInstance.getButton().innerText).toBe('Button');
    });

    test('should call handler on button click', () => {
        const handler = jest.fn();
        buttonInstance = new Button({name: 'Test Button', handler});
        buttonInstance.getButton().click();
        expect(handler).toHaveBeenCalled();
    });

    test('should deactivate listeners and send log', () => {
        const handler = jest.fn();
        buttonInstance = new Button({name: 'Test Button', handler});
        const logSpy = jest.spyOn(buttonInstance, 'sendLog');

        buttonInstance.deactivateListeners();
        expect(logSpy).toHaveBeenCalledWith('Deactivate listeners for Test Button');
        expect(buttonInstance.disabled).toBe(true);

        buttonInstance.getButton().click(); // Click should not call the handler
        expect(handler).not.toHaveBeenCalled();
    });

    test('should toggle disabled state', () => {
        const handler = jest.fn();
        buttonInstance = new Button({name: 'Test Button', handler, managed: true});

        buttonInstance.toggleDisabled(true);
        expect(buttonInstance.disabled).toBe(true);
        expect(buttonInstance.getButton().classList.contains('disabled')).toBe(true);

        buttonInstance.toggleDisabled(false);
        expect(buttonInstance.disabled).toBe(false);
        expect(buttonInstance.getButton().classList.contains('disabled')).toBe(false);
    });

    test('should return early if handler not defined on activate listeners', () => {
        buttonInstance = new Button({name: 'Test Button', managed: true});
        buttonInstance.activateListeners();
        expect(true).toBe(true);
    });

    test('should return early if handler not defined on toggling disabled state', () => {
        buttonInstance = new Button({name: 'Test Button', managed: true});
        buttonInstance.toggleDisabled(true);
        expect(true).toBe(true);
    });

});