export class Wrapper {
  prefix_regex = /\s.*[#]\s{0,1}/;
  prefix = "";
  last_word_regex: RegExp;
  limit = 0;

  constructor(limit: number) {
    this.limit = limit;
    this.last_word_regex = /.*\s(\S+.*)$/;
  }

  wrap(
    text: string,
    cursor_x: number,
    cursor_y: number
  ): { text: string, cx: number, cy: number } | null {

    let result: string[] = [];
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

      let wrapResult = this.lineWrap(
        line,
        lines[index+1],
        cursor_x,
        cursor_y,
      );

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
        } else {
          lines[index+1] = wrapResult.nl;
        }

      } else {
        // No changes
        result.push(line);
      }
    });

    return { text: result.join("\n"), cx: new_cursor_x, cy: new_cursor_y };
  };

  lineWrap(
    current_line: string,
    next_line: string,
    cursor_x: number,
    cursor_y: number,
  ): { cl: string; nl: string; cx: number, cy: number} {

    let new_cursor_x = cursor_x;
    let new_cursor_y = cursor_y;

    if (current_line.length > this.limit) {
      // Move text after the limit to the next line
      let current_line_first_part =
        current_line.substring(0, this.limit);
      let current_line_second_part =
        current_line.substring(this.limit, current_line.length);

      // Get last full word after it's been split
      let last_word_match = current_line_first_part.match(this.last_word_regex);

      if (!last_word_match || last_word_match[1].length >= this.limit) {
        // Word has no spaces. Just break as is.
        let original_next_line = next_line ? next_line : "";
        let result = {
          cl: current_line_first_part,
          nl: current_line_second_part + original_next_line,
          cx: new_cursor_x + 1,
          cy: current_line_second_part.length,
        };
        return result;
      }

      let last_word = last_word_match[1];

      let last_portion = last_word + current_line_second_part;

      let new_current_line = current_line.substring(0, current_line.length - last_portion.length);
      let new_next_line = this.prefix + last_portion;
      if (next_line) {
        new_next_line = new_next_line.concat(
          next_line.substring(this.prefix.length)
        )
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

    } else {
      // nothing to do here
      return null;
    }
  }
}
