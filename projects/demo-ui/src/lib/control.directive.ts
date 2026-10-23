import { Directive } from "@angular/core";
/** Native inputs keep their native label, keyboard, validity and forms contracts. */
@Directive({
  selector: "input[uiControl],select[uiControl],textarea[uiControl]",
  host: { class: "ui-control" },
})
export class UiControlDirective {}
