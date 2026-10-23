import { Component, inject, signal, viewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  UiButtonDirective,
  UiControlDirective,
  UiFieldComponent,
  UiIconComponent,
  UiDialogComponent,
  UiTransactionTableComponent,
  UiTableStateComponent,
  TransactionRow,
} from "@demo/ui";
import { TransactionFacade } from "./transactions/transaction.facade";
import { TransactionStore } from "./transactions/transaction.store";
import type {
  Transaction,
  TransactionDraft,
} from "./transactions/transaction.model";
@Component({
  selector: "demo-root",
  imports: [
    ReactiveFormsModule,
    UiButtonDirective,
    UiControlDirective,
    UiFieldComponent,
    UiIconComponent,
    UiDialogComponent,
    UiTransactionTableComponent,
    UiTableStateComponent,
  ],
  providers: [TransactionStore, TransactionFacade],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  readonly vm = inject(TransactionFacade);
  readonly message = signal("");
  readonly mode = signal<"add" | "edit" | "view">("add");
  readonly editing = signal<Transaction | null>(null);
  readonly deleteIds = signal<string[]>([]);
  readonly submitted = signal(false);
  readonly editor = viewChild.required<UiDialogComponent>("editor");
  readonly confirmation = viewChild.required<UiDialogComponent>("confirmation");
  readonly form = new FormGroup({
    description: new FormControl("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(/\S/),
      ],
    }),
    date: new FormControl("2025-10-22", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    amount: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(-1000000),
        Validators.max(1000000),
      ],
    }),
    status: new FormControl<TransactionDraft["status"]>("Completed", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  constructor() {
    void this.vm.load();
  }
  open(mode: "add" | "edit" | "view", row?: TransactionRow) {
    if (mode !== "view" && this.vm.state().readOnly) return;
    this.mode.set(mode);
    this.editing.set(row ?? null);
    this.submitted.set(false);
    this.vm.clearSaveError();
    this.form.reset(
      row ?? {
        description: "",
        date: "2025-10-22",
        amount: 0,
        status: "Completed",
      },
    );
    this.form.enable();
    if (mode === "view") this.form.controls.status.disable();
    this.editor().open();
  }
  error(field: keyof AppComponent["form"]["controls"]) {
    const control = this.form.controls[field];
    if (!(this.submitted() || control.touched) || !control.invalid) return "";
    if (control.hasError("required") || control.hasError("pattern"))
      return (
        "Please enter " +
        (field === "description"
          ? "a description."
          : field === "date"
            ? "a due date."
            : "an amount.")
      );
    if (control.hasError("maxlength")) return "Use 100 characters or fewer.";
    return "Enter an amount between −1,000,000 and 1,000,000.";
  }
  async save() {
    this.submitted.set(true);
    this.form.markAllAsTouched();
    if (this.mode() === "view") return;
    if (this.form.invalid) {
      const firstInvalid = (
        Object.keys(this.form.controls) as (keyof typeof this.form.controls)[]
      ).find((key) => this.form.controls[key].invalid);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }
    if (
      await this.vm.save(
        {
          ...this.form.getRawValue(),
          description: this.form.controls.description.value.trim(),
        },
        this.editing()?.id,
      )
    ) {
      this.editor().close();
      this.message.set(
        this.mode() === "add" ? "Transaction added." : "Transaction updated.",
      );
    }
  }
  requestDelete(ids: string[]) {
    if (this.vm.state().readOnly) return;
    this.deleteIds.set(ids);
    this.vm.clearSaveError();
    this.confirmation().open();
  }
  async confirmDelete() {
    if (await this.vm.remove(this.deleteIds())) {
      this.confirmation().close();
      this.message.set(
        this.deleteIds().length === 1
          ? "Transaction deleted."
          : "Selected transactions deleted.",
      );
    }
  }
  removeRow(row: TransactionRow) {
    this.requestDelete([row.id]);
  }
  clearFilters() {
    this.vm.search("");
    this.vm.filter("All");
  }
}
