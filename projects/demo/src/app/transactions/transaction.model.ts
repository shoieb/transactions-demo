import type { TransactionRow } from "@demo/ui";
export interface Transaction extends TransactionRow {}
export type TransactionDraft = Omit<Transaction, "id">;
export type DataScenario = "normal" | "empty" | "error";
