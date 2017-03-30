"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Wrapper = (function () {
    function Wrapper(limit) {
        this.prefix_regex = /\s.*[#]\s{0,1}/;
        this.prefix = "";
        this.limit = 0;
        this.limit = limit;
        this.last_word_regex = /.*\s(\S+.*)$/;
    }
    Wrapper.prototype.wrap = function (text, cursor_x, cursor_y) {
        var _this = this;
        var result = [];
        var new_cursor_x = cursor_x;
        var new_cursor_y = cursor_y;
        var lines = text.split("\n");
        lines.forEach(function (line, index) {
            if (index == 0) {
                // Handle the prefix. Only do this on the first line.
                var prefix_match = line.match(_this.prefix_regex);
                if (prefix_match) {
                    _this.prefix = prefix_match[0];
                }
            }
            var wrapResult = _this.lineWrap(line, lines[index + 1], cursor_x, cursor_y);
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
    };
    ;
    Wrapper.prototype.lineWrap = function (current_line, next_line, cursor_x, cursor_y) {
        var new_cursor_x = cursor_x;
        var new_cursor_y = cursor_y;
        if (current_line.length > this.limit) {
            // Move text after the limit to the next line
            var current_line_first_part = current_line.substring(0, this.limit);
            var current_line_second_part = current_line.substring(this.limit, current_line.length);
            // Get last full word after it's been split
            var last_word = current_line_first_part.match(this.last_word_regex)[1];
            if (last_word.length >= this.limit) {
                return null;
            }
            var last_portion = last_word + current_line_second_part;
            var new_current_line = current_line.substring(0, current_line.length - last_portion.length);
            var new_next_line = this.prefix + last_portion;
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
    };
    return Wrapper;
}());
exports.Wrapper = Wrapper;
