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
/*!**************************!*\
  !*** ./src/index.btn.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button */ "./src/button.js");

window.Button = _button__WEBPACK_IMPORTED_MODULE_0__.Button;
}();
/******/ })()
;
//# sourceMappingURL=bundle.btn.js.map