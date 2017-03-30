import { Wrapper } from './src/wrapper';

let text = "  # abc abc abc abc abc abc asdf asdf asdf asdf asdf adsf asdf asd3 asd2 asd1 asd0aw";
    // "\n" + "  # abc abc abc abc abc abc asdf asdf asdf asdf asdf adsf asdf asd3 asd2 asd1 asd0aw" +
    // "\n" + "  # def def def";
let limit = 80;
let cursor_x = 80
let cursor_y = 0; // not necessary, will always be 0 because we don't neet stuff above current line

let wrapper = new Wrapper(limit);
let result = wrapper.wrap(text, cursor_x, cursor_y);

console.log("OLD TEXT", text);
console.log(`OLD CURSOR ${cursor_x}, ${cursor_y}`);
console.log("NEW TEXT", result.text);
console.log(`NEW CURSOR ${result.cx}, ${result.cy}`);







// REPLACE atom.current_line with new_current_line
// REPLACE atom.next_line with new_next_line
// SET CURSOR
// NOW RE-RUN THIS ON new_next_line (now current_line)
