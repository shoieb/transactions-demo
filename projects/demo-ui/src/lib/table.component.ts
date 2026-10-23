import { Component, input, output, signal } from "@angular/core";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { UiButtonDirective } from "./button.directive";
import { UiIconComponent } from "./icon.component";
import { UiBadgeComponent, TransactionStatus } from "./badge.component";
export interface TransactionRow {
  id: string;
  description: string;
  date: string;
  amount: number;
  status: TransactionStatus;
}
export type SortKey = "date" | "amount";
@Component({
  selector: "ui-transaction-table",
  imports: [
    CurrencyPipe,
    DatePipe,
    UiButtonDirective,
    UiIconComponent,
    UiBadgeComponent,
  ],
  templateUrl: "./table.component.html",
})
export class UiTransactionTableComponent {
  rows = input.required<readonly TransactionRow[]>();
  selected = input<readonly string[]>([]);
  sortKey = input<SortKey | null>(null);
  sortDirection = input<"asc" | "desc">("asc");
  readOnly = input(false);
  sort = output<SortKey>();
  selection = output<string[]>();
  view = output<TransactionRow>();
  edit = output<TransactionRow>();
  remove = output<TransactionRow>();
  menu = signal<string | null>(null);
  ariaSort(key: SortKey) {
    return this.sortKey() === key
      ? this.sortDirection() === "asc"
        ? "ascending"
        : "descending"
      : "none";
  }
  toggle(id: string) {
    this.selection.emit(
      this.selected().includes(id)
        ? this.selected().filter((x) => x !== id)
        : [...this.selected(), id],
    );
  }
  toggleAll() {
    const ids = this.rows().map((r) => r.id);
    const all = ids.every((id) => this.selected().includes(id));
    this.selection.emit(
      all
        ? this.selected().filter((id) => !ids.includes(id))
        : [...new Set([...this.selected(), ...ids])],
    );
  }
  allSelected() {
    return (
      this.rows().length > 0 &&
      this.rows().every((r) => this.selected().includes(r.id))
    );
  }
}
