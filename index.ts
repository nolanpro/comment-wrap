import { Wrapper } from './src/wrapper';

let limit = 20;
let cursor_x = 80
let cursor_y = 0; // not necessary, will always be 0 because we don't neet stuff above current line

let wrapper = new Wrapper(limit);

$(document).ready(function() {
  let textarea = $("#input");
  let output = $("#output");
  textarea.keyup(() => {
    let text: string = textarea.val();

    let pos = getCursorXYFromInput(textarea);

    let result = wrapper.wrap(text, pos.cx, pos.cy);
    output.html(result.text.replace(/\n/g, "<br />"));

    let inputPos = getInputPositionFromCursorXY(result.cx, result.cy);
    let element = <HTMLInputElement>textarea[0];
    element.setSelectionRange(inputPos, inputPos);
  });
});

function getInputPositionFromCursorXY(cx: number, cy: number): number {
  let pos = textarea.prop("selectionStart");
  let text: string = textarea.val();
  let cx = pos;
  let cy = 0;
  let lines = text.split("\n");
  lines.forEach((line: string, index: number) => {
    if (cx > line.length) {
      if (index+1 != lines.length) {
        cx = cx - line.length - 1;
        cy++;
      }
    }
  });
  return { cx: cx, cy: cy }
}

function getCursorXYFromInput(textarea: JQuery): { cx: number, cy: number } {
  let pos = textarea.prop("selectionStart");
  let text: string = textarea.val();
  let cx = pos;
  let cy = 0;
  let lines = text.split("\n");
  lines.forEach((line: string, index: number) => {
    if (cx > line.length) {
      if (index+1 != lines.length) {
        cx = cx - line.length - 1;
        cy++;
      }
    }
  });
  return { cx: cx, cy: cy }
}
