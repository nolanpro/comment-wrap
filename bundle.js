/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const wrapper_1 = __webpack_require__(1);
let text = "  # abc abc abc abc abc abc asdf asdf asdf asdf asdf adsf asdf asd3 asd2 asd1 asd0aw" +
    "\n" + "  # def def def";
let limit = 80;
let cursor_x = 80;
let cursor_y = 0; // not necessary, will always be 0 because we don't neet stuff above current line
let wrapper = new wrapper_1.Wrapper(limit);
let result = wrapper.wrap(text, cursor_x, cursor_y);
console.log("OLD TEXT", text);
console.log(`OLD CURSOR ${cursor_x}, ${cursor_y}`);
console.log("NEW TEXT", result.text);
console.log(`NEW CURSOR ${result.cx}, ${result.cy}`);
console.log(this);
function wrapText() {
    console.log("TRIGGERED WRAPPED TEST!!!!");
}
exports.wrapText = wrapText;
// function wrapText() {
//   console.log("WRAPPING NOW");
// }
//
// $(document).ready(function() {
//     console.log( "ready!" );
// });
//
// REPLACE atom.current_line with new_current_line
// REPLACE atom.next_line with new_next_line
// SET CURSOR
// NOW RE-RUN THIS ON new_next_line (now current_line)
//# sourceMappingURL=index.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Wrapper {
    constructor(limit) {
        this.prefix_regex = /\s.*[#]\s{0,1}/;
        this.prefix = "";
        this.limit = 0;
        this.limit = limit;
        this.last_word_regex = /.*\s(\S+.*)$/;
    }
    wrap(text, cursor_x, cursor_y) {
        let result = [];
        let new_cursor_x = cursor_x;
        let new_cursor_y = cursor_y;
        let lines = text.split("\n");
        lines.forEach((line, index) => {
            if (index == 0) {
                // Handle the prefix. Only do this on the first line.
                let prefix_match = line.match(this.prefix_regex);
                if (prefix_match) {
                    this.prefix = prefix_match[0];
                }
            }
            let wrapResult = this.lineWrap(line, lines[index + 1], cursor_x, cursor_y);
            if (wrapResult) {
                if (index == 0) {
                    // Handle the cursor. Only needed on the first line.
                    new_cursor_x = wrapResult.cx;
                    new_cursor_y = wrapResult.cy;
                }
                result.push(wrapResult.cl);
                if (lines.length == index + 1) {
                    // Final line
                    result.push(wrapResult.nl);
                }
                else {
                    lines[index + 1] = wrapResult.nl;
                }
            }
            else {
                // No changes
                result.push(line);
            }
        });
        return { text: result.join("\n"), cx: new_cursor_x, cy: new_cursor_y };
    }
    ;
    lineWrap(current_line, next_line, cursor_x, cursor_y) {
        let new_cursor_x = cursor_x;
        let new_cursor_y = cursor_y;
        if (current_line.length > this.limit) {
            // Move text after the limit to the next line
            let current_line_first_part = current_line.substring(0, this.limit);
            let current_line_second_part = current_line.substring(this.limit, current_line.length);
            // Get last full word after it's been split
            let last_word = current_line_first_part.match(this.last_word_regex)[1];
            if (last_word.length >= this.limit) {
                return null;
            }
            let last_portion = last_word + current_line_second_part;
            let new_current_line = current_line.substring(0, current_line.length - last_portion.length);
            let new_next_line = this.prefix + last_portion;
            if (next_line) {
                new_next_line = new_next_line.concat(next_line.substring(this.prefix.length));
            }
            if (cursor_x >= this.limit) {
                // move cursor down with the new next line
                new_cursor_y = cursor_y + 1;
                new_cursor_x = last_word.length + this.prefix.length;
            }
            return {
                cl: new_current_line,
                nl: new_next_line,
                cx: new_cursor_x,
                cy: new_cursor_y,
            };
        }
        else {
            // nothing to do here
            return null;
        }
    }
}
exports.Wrapper = Wrapper;
//# sourceMappingURL=wrapper.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map