import { Component, input } from "@angular/core";
@Component({
  selector: "ui-field",
  template: `<label [for]="controlId()"
      >{{ label() }}
      @if (required()) {
        <span aria-hidden="true">*</span>
      }</label
    ><ng-content />
    @if (error()) {
      <p class="field-error" [id]="controlId() + '-error'">{{ error() }}</p>
    } @else if (hint()) {
      <p class="field-hint" [id]="controlId() + '-hint'">{{ hint() }}</p>
    }`,
  host: { class: "ui-field" },
})
export class UiFieldComponent {
  controlId = input.required<string>();
  label = input.required<string>();
  required = input(false);
  error = input("");
  hint = input("");
}
