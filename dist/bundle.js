/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/button.js":
/*!***********************!*\
  !*** ./src/button.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: function() { return /* binding */ Button; }
/* harmony export */ });
class Button {
  constructor(options) {
    this.options = options;
    this.handler = this.options.handler.bind(this);
    this.disabled = false;
    this.button = document.createElement('button');
    this.button.innerText = options.name || 'Button';
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
      this.disabled = true;
      this.sendLog('Deactivate listeners for ' + this.button.innerText);
      this.button.removeEventListener('click', this.handler);
    }
  }
  sendLog(message) {
    let event = new CustomEvent(LOG_EVENT, {
      bubbles: true,
      detail: {
        message: message
      }
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

/***/ }),

/***/ "./src/logger.js":
/*!***********************!*\
  !*** ./src/logger.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LOG_EVENT: function() { return /* binding */ LOG_EVENT; },
/* harmony export */   Logger: function() { return /* binding */ Logger; }
/* harmony export */ });
const LOG_EVENT = 'exampleLog';
class Logger {
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

/***/ }),

/***/ "./src/toolbar.js":
/*!************************!*\
  !*** ./src/toolbar.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   REMOVE_ME_EVENT: function() { return /* binding */ REMOVE_ME_EVENT; },
/* harmony export */   Toolbar: function() { return /* binding */ Toolbar; }
/* harmony export */ });
const REMOVE_ME_EVENT = 'exampleRemoveMe';
class Toolbar {
  constructor(options) {
    this.element = options.element || null;
    this.buttons = options.buttons || [];
    this.demoButtons = [];
    this.createPanels();
    this.initButtons();
    this.initSelfButtons();
    this.customButtonsDisabled = false;
    this.element.addEventListener(REMOVE_ME_EVENT, this.onRemoveQuery.bind(this));
  }
  onRemoveQuery(e) {
    for (const button of this.demoButtons) {
      if (button.button === e.target) {
        this.removeButton(button);
        this.demoButtons.splice(this.demoButtons.indexOf(button), 1);
        break;
      }
    }
  }
  createPanels() {
    this.editorPanel = document.createElement('div');
    this.editorPanel.classList.add('toolbar__panel');
    this.demoPanel = document.createElement('div');
    this.demoPanel.classList.add('toolbar__panel');
    this.element.appendChild(this.editorPanel);
    this.element.appendChild(this.demoPanel);
  }
  initSelfButtons() {
    this.btnDisable = new Button({
      managed: false,
      name: 'Disable',
      handler: this.disableOther
    });
    this.demoPanel.appendChild(this.btnDisable.getButton());
    this.btnDelete = new Button({
      managed: false,
      name: 'Delete',
      handler: this.deleteOther
    });
    this.demoPanel.appendChild(this.btnDelete.getButton());
  }
  deleteOther = () => {
    this.customButtonsDisabled = !this.customButtonsDisabled;
    for (const button of this.buttons) {
      this.removeButton(button.instance);
      button.instance = null;
    }
    this.removeButton(this.btnDisable);
    this.btnDisable = null;
  };
  removeButton(button) {
    if (button) {
      button.destroy();
      button.getButton().remove();
    }
  }
  disableOther = e => {
    this.customButtonsDisabled = !this.customButtonsDisabled;
    e.target.innerText = this.customButtonsDisabled ? 'Enable' : 'Disable';
    for (const button of this.buttons) {
      button.instance.toggleDisabled(this.customButtonsDisabled);
    }
  };
  initButtons() {
    for (const button of this.buttons) {
      button.managed = true;
      button.instance = new Button(button);
      this.editorPanel.appendChild(button.instance.getButton());
    }
  }
  addButton(title, handler) {
    const options = {
      name: title,
      handler: handler,
      managed: true
    };
    options.instance = new Button(options);
    this.editorPanel.appendChild(options.instance.getButton());
    this.buttons.push(options);
  }
  addDemoButton(title, handler) {
    const options = {
      name: title,
      handler: handler,
      managed: true
    };
    options.instance = new Button(options);
    this.demoPanel.insertBefore(options.instance.getButton(), this.demoPanel.firstChild);
    this.demoButtons.push(options.instance);
  }
  destroy() {
    this.deleteOther();
    this.removeButton(this.btnDelete);
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button */ "./src/button.js");
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toolbar */ "./src/toolbar.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ "./src/logger.js");



window.Button = _button__WEBPACK_IMPORTED_MODULE_0__.Button;
window.Toolbar = _toolbar__WEBPACK_IMPORTED_MODULE_1__.Toolbar;
window.Logger = _logger__WEBPACK_IMPORTED_MODULE_2__.Logger;
window.LOG_EVENT = _logger__WEBPACK_IMPORTED_MODULE_2__.LOG_EVENT;
window.REMOVE_ME_EVENT = _toolbar__WEBPACK_IMPORTED_MODULE_1__.REMOVE_ME_EVENT;
// поддерживать браузеры, которые имеют более 0.5% доли рынка, последние две версии каждого браузера, ESR-версию Firefox и браузеры, которые не являются "мертвыми"
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map