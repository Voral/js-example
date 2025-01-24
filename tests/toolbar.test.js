// noinspection JSUnresolvedReference,ES6UnusedImports

import {Toolbar, REMOVE_ME_EVENT} from '../src/toolbar';
import {Button} from '../src/button';

describe('Toolbar', () => {
    let toolbar;
    let element;

    beforeEach(() => {
        element = document.createElement('div');
        document.body.appendChild(element);
        toolbar = new Toolbar({element});
    });

    afterEach(() => {
        toolbar.destroy();
        document.body.removeChild(element);
        toolbar = null;
    });

    test('should initialize with buttons', () => {
        const buttonOptions = [
            {name: 'Button 1', handler: jest.fn()},
            {name: 'Button 2', handler: jest.fn()}
        ];
        toolbar = new Toolbar({element, buttons: buttonOptions});
        expect(toolbar.buttons.length).toBe(2);
        expect(toolbar.editorPanel.children.length).toBe(2);
    });

    test('should add a demo button', () => {
        const demoButtonHandler = jest.fn();
        toolbar.addDemoButton('Demo Button', demoButtonHandler);
        expect(toolbar.demoButtons.length).toBe(1);
        expect(toolbar.demoPanel.children.length).toBe(3);
    });

    test('should remove a demo button on event', () => {
        toolbar.addDemoButton('Demo Button', function () {
            let event = new CustomEvent(REMOVE_ME_EVENT, {
                bubbles: true,
                detail: {message: this}
            });
            this.button.dispatchEvent(event);
        });
        const demoButton = toolbar.demoButtons[0];
        demoButton.getButton().click();
        expect(toolbar.demoButtons.length).toBe(0);
        expect(toolbar.demoPanel.children.length).toBe(2);
    });

    test('should toggle button disabled state', () => {
        const buttonOptions = [
            {name: 'Button 1', handler: jest.fn()}
        ];
        toolbar = new Toolbar({element, buttons: buttonOptions});
        const disableButton = toolbar.btnDisable.getButton();

        disableButton.click();
        expect(toolbar.customButtonsDisabled).toBe(true);
        expect(disableButton.innerText).toBe('Enable');

        disableButton.click();
        expect(toolbar.customButtonsDisabled).toBe(false);
        expect(disableButton.innerText).toBe('Disable');
    });

    test('should not throw errors if null passed', () => {
        expect(toolbar.buttons.length).toBe(0);
        toolbar.addButton('Demo Button', jest.fn());
        expect(toolbar.buttons.length).toBe(1);
        toolbar.removeButton();
        expect(true).toBe(true);
    });

    test('should not throw errors if query on unregistered button', () => {
        toolbar.addDemoButton('Demo Button', jest.fn());
        const unregisteredButton = document.createElement('div');
        expect(() => {
            toolbar.onRemoveQuery({target: unregisteredButton});
        }).not.toThrow();
    });
    test('should not throw errors container undefined', () => {
        toolbar = new Toolbar({});
        toolbar.onRemoveQuery({});
        toolbar.createPanels();
        toolbar.initSelfButtons();
        toolbar.initButtons();
        toolbar.addButton('Demo Button', jest.fn());
        toolbar.addDemoButton('Demo Button', jest.fn());
        toolbar.disableOther();
        toolbar.deleteOther();
        expect(true).toBe(true);
    });


});
