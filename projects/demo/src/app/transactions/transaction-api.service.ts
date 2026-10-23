import { Injectable } from "@angular/core";
import { SEED } from "./transaction.seed";
import type {
  DataScenario,
  Transaction,
  TransactionDraft,
} from "./transaction.model";
/** Local, deterministic API stand-in. No network, credentials or production data. */
@Injectable({ providedIn: "root" })
export class TransactionApiService {
  private data: Transaction[] = structuredClone([...SEED]);
  private nextId = 25;
  failNextSave = false;
  private pause() {
    return new Promise<void>((resolve) => setTimeout(resolve, 350));
  }
  async list(scenario: DataScenario = "normal"): Promise<Transaction[]> {
    await this.pause();
    if (scenario === "error")
      throw new Error("Transactions could not be loaded. Please try again.");
    return scenario === "empty" ? [] : structuredClone(this.data);
  }
  async save(draft: TransactionDraft, id?: string): Promise<Transaction> {
    await this.pause();
    if (this.failNextSave) {
      this.failNextSave = false;
      throw new Error(
        "The transaction could not be saved. Your entries have been kept. Please try again.",
      );
    }
    const record = { ...draft, id: id ?? String(this.nextId++) };
    this.data = id
      ? this.data.map((row) => (row.id === id ? record : row))
      : [record, ...this.data];
    return structuredClone(record);
  }
  async remove(ids: readonly string[]) {
    await this.pause();
    this.data = this.data.filter((row) => !ids.includes(row.id));
  }
  reset() {
    this.data = structuredClone([...SEED]);
    this.nextId = 25;
    this.failNextSave = false;
  }
}
