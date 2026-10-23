import { computed, inject, Injectable } from "@angular/core";
import { TransactionStore } from "./transaction.store";
import type { DataScenario, TransactionDraft } from "./transaction.model";
import type { SortKey, TransactionStatus } from "@demo/ui";
/** The page consumes this contract. API orchestration and mutable state stay below it. */
@Injectable()
export class TransactionFacade {
  private store = inject(TransactionStore);
  readonly state = this.store.view;
  readonly rows = this.store.visibleRows;
  readonly total = computed(() => this.store.filtered().length);
  readonly pageCount = this.store.pageCount;
  readonly pages = computed(() =>
    Array.from({ length: this.pageCount() }, (_, i) => i + 1),
  );
  readonly range = computed(() => {
    const total = this.total();
    const from = total ? (this.state().page - 1) * this.store.pageSize + 1 : 0;
    return `${from}–${Math.min(from + this.store.pageSize - 1, total)} of ${total}`;
  });
  load(scenario: DataScenario = "normal") {
    return this.store.load(scenario);
  }
  search(query: string) {
    this.store.search(query);
  }
  filter(status: TransactionStatus | "All") {
    this.store.filter(status);
  }
  sort(key: SortKey) {
    this.store.sort(key);
  }
  page(page: number) {
    this.store.setPage(page);
  }
  select(ids: string[]) {
    this.store.select(ids);
  }
  readOnly(value: boolean) {
    this.store.setReadOnly(value);
  }
  save(draft: TransactionDraft, id?: string) {
    return this.store.save(draft, id);
  }
  remove(ids: readonly string[]) {
    return this.store.remove(ids);
  }
  clearSaveError() {
    this.store.clearSaveError();
  }
  failNextSave() {
    this.store.failNextSave();
  }
  reset() {
    return this.store.reset();
  }
}
