"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wrapper_1 = require("./src/wrapper");
var text = "  # abc abc abc abc abc abc asdf asdf asdf asdf asdf adsf asdf asd3 asd2 asd1 asd0aw" +
    "\n" + "  # def def def";
var limit = 80;
var cursor_x = 80;
var cursor_y = 0; // not necessary, will always be 0 because we don't neet stuff above current line
var wrapper = new wrapper_1.Wrapper(limit);
var result = wrapper.wrap(text, cursor_x, cursor_y);
console.log("OLD TEXT", text);
console.log("OLD CURSOR " + cursor_x + ", " + cursor_y);
console.log("NEW TEXT", result.text);
console.log("NEW CURSOR " + result.cx + ", " + result.cy);
// REPLACE atom.current_line with new_current_line
// REPLACE atom.next_line with new_next_line
// SET CURSOR
// NOW RE-RUN THIS ON new_next_line (now current_line)
