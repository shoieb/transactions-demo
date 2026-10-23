import { Component, input } from "@angular/core";
export type TransactionStatus = "Completed" | "In progress" | "Failed";
@Component({
  selector: "ui-badge",
  template: `<span
    class="ui-badge"
    [class.success]="status() === 'Completed'"
    [class.warning]="status() === 'In progress'"
    [class.danger]="status() === 'Failed'"
    >{{ status() }}</span
  >`,
})
export class UiBadgeComponent {
  status = input.required<TransactionStatus>();
}
