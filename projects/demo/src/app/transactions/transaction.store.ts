import { computed, inject, Injectable, signal } from "@angular/core";
import type { SortKey, TransactionStatus } from "@demo/ui";
import { TransactionApiService } from "./transaction-api.service";
import type {
  DataScenario,
  Transaction,
  TransactionDraft,
} from "./transaction.model";
@Injectable()
export class TransactionStore {
  private api = inject(TransactionApiService);
  private state = signal({
    rows: [] as Transaction[],
    loading: true,
    error: "",
    saving: false,
    saveError: "",
    query: "",
    status: "All" as TransactionStatus | "All",
    sortKey: null as SortKey | null,
    direction: "asc" as "asc" | "desc",
    page: 1,
    selected: [] as string[],
    readOnly: false,
  });
  readonly view = this.state.asReadonly();
  readonly pageSize = 10;
  readonly filtered = computed(() => {
    const s = this.state();
    let rows = s.rows.filter(
      (row) =>
        (s.status === "All" || row.status === s.status) &&
        row.description.toLowerCase().includes(s.query.toLowerCase()),
    );
    if (s.sortKey) {
      const key = s.sortKey;
      rows = [...rows].sort((a, b) => {
        const result =
          key === "amount" ? a.amount - b.amount : a.date.localeCompare(b.date);
        return s.direction === "asc" ? result : -result;
      });
    }
    return rows;
  });
  readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.filtered().length / this.pageSize)),
  );
  readonly visibleRows = computed(() =>
    this.filtered().slice(
      (this.state().page - 1) * this.pageSize,
      this.state().page * this.pageSize,
    ),
  );
  private patch(patch: Partial<ReturnType<typeof this.state>>) {
    this.state.update((s) => ({ ...s, ...patch }));
  }
  private request = 0;
  async load(scenario: DataScenario = "normal") {
    const request = ++this.request;
    this.patch({ loading: true, error: "", selected: [] });
    try {
      const rows = await this.api.list(scenario);
      if (request === this.request) this.patch({ rows, page: 1 });
    } catch (error) {
      if (request === this.request)
        this.patch({ error: this.errorMessage(error), rows: [] });
    } finally {
      if (request === this.request) this.patch({ loading: false });
    }
  }
  search(query: string) {
    this.patch({ query, page: 1, selected: [] });
  }
  filter(status: TransactionStatus | "All") {
    this.patch({ status, page: 1, selected: [] });
  }
  sort(key: SortKey) {
    const s = this.state();
    this.patch({
      sortKey: key,
      direction: s.sortKey === key && s.direction === "asc" ? "desc" : "asc",
      page: 1,
    });
  }
  setPage(page: number) {
    this.patch({ page: Math.max(1, Math.min(page, this.pageCount())) });
  }
  select(selected: string[]) {
    if (!this.state().readOnly) this.patch({ selected });
  }
  setReadOnly(readOnly: boolean) {
    this.patch({ readOnly, selected: [] });
  }
  clearSaveError() {
    this.patch({ saveError: "" });
  }
  failNextSave() {
    this.api.failNextSave = true;
  }
  async save(draft: TransactionDraft, id?: string) {
    if (this.state().readOnly || this.state().saving) return false;
    this.patch({ saving: true, saveError: "" });
    try {
      const record = await this.api.save(draft, id);
      this.state.update((s) => ({
        ...s,
        rows: id
          ? s.rows.map((row) => (row.id === id ? record : row))
          : [record, ...s.rows],
        page: 1,
      }));
      return true;
    } catch (error) {
      this.patch({ saveError: this.errorMessage(error) });
      return false;
    } finally {
      this.patch({ saving: false });
    }
  }
  async remove(ids: readonly string[]) {
    if (this.state().readOnly || this.state().saving) return false;
    this.patch({ saving: true, saveError: "" });
    try {
      await this.api.remove(ids);
      this.state.update((s) => ({
        ...s,
        rows: s.rows.filter((row) => !ids.includes(row.id)),
        selected: [],
      }));
      this.setPage(this.state().page);
      return true;
    } catch (error) {
      this.patch({ saveError: this.errorMessage(error) });
      return false;
    } finally {
      this.patch({ saving: false });
    }
  }
  reset() {
    this.api.reset();
    this.patch({
      query: "",
      status: "All",
      sortKey: null,
      page: 1,
      readOnly: false,
      saveError: "",
    });
    return this.load();
  }
  private errorMessage(error: unknown) {
    return error instanceof Error
      ? error.message
      : "Something went wrong. Please try again.";
  }
}
