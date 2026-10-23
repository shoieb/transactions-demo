import { Component, input } from "@angular/core";
@Component({
  selector: "ui-icon",
  template: `<img
    [src]="'/icons/' + name() + '.svg'"
    alt=""
    aria-hidden="true"
  />`,
  host: { "aria-hidden": "true", class: "ui-icon" },
})
export class UiIconComponent {
  name = input.required<string>();
}
