export class Wrapper {
  prefix_regex = /\s.*[#]\s{0,1}/;
  last_word_regex = /.*\s(\S+.*)$/;
  prefix = "";
  limit = 0;

  constructor(limit: number) {
    this.limit = limit;
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

    console.log("# LINES", lines.length)

    lines.forEach((line, index) => {
      if (index == 0) {
        // handle the prefix
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
          // handle the cursor
          new_cursor_x = wrapResult.cx;
          new_cursor_y = wrapResult.cy;
        }

        result.push(wrapResult.cl);

        if (lines.length == index + 1) {
          // final line
          result.push(wrapResult.nl);
        } else {
          lines[index+1] = wrapResult.nl;
        }

      } else {
        // no changes
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
      // get last word of line
      let last_word = current_line.match(this.last_word_regex)[1];

      if (last_word.length >= this.limit) {
        // German or Hawaiian word?
        return null;
      }

      let new_current_line = current_line.substring(0, current_line.length - last_word.length);
      let new_next_line = this.prefix + last_word;
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
