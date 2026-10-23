import { Component, input, output } from "@angular/core";
import { UiButtonDirective } from "./button.directive";
@Component({
  selector: "ui-table-state",
  imports: [UiButtonDirective],
  template: `<div class="empty-state" [attr.data-testid]="kind() + '-state'">
    <h2>{{ heading() }}</h2>
    <p [attr.role]="kind() === 'error' ? 'alert' : null">{{ description() }}</p>
    @if (actionLabel()) {
      <button uiButton type="button" (click)="action.emit()">
        {{ actionLabel() }}
      </button>
    }
  </div>`,
})
export class UiTableStateComponent {
  kind = input<"loading" | "empty" | "error">("empty");
  heading = input.required<string>();
  description = input("");
  actionLabel = input("");
  action = output();
}
