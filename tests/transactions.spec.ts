import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("transaction-1")).toBeVisible();
});
test("search, status filter, sorting and pagination", async ({ page }) => {
  await expect(page.getByText("1–10 of 24", { exact: true })).toBeVisible();
  await expect(page.getByTestId("transaction-1")).toContainText("15 Mar 2025");
  await page.getByRole("button", { name: "Next page", exact: true }).click();
  await expect(page.getByText("11–20 of 24", { exact: true })).toBeVisible();
  await page.getByLabel("Search transactions", { exact: true }).fill("Jese");
  await expect(page.locator("tbody tr")).toHaveCount(2);
  await page.getByLabel("Filter by status").selectOption("Failed");
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await expect(page.getByTestId("transaction-6")).toBeVisible();
  await page.getByLabel("Search transactions", { exact: true }).fill("");
  await page.getByLabel("Filter by status").selectOption("All");
  await page.getByRole("button", { name: "Amount", exact: true }).click();
  await expect(page.locator("tbody tr").first()).toContainText("Karen Nelson");
  await page.getByRole("button", { name: "Amount", exact: true }).click();
  await expect(page.locator("tbody tr").first()).toContainText("Bergside");
});
test("validates a form, adds a transaction, and announces success", async ({
  page,
}) => {
  await page.getByTestId("add-transaction").click();
  const dialog = page.getByRole("dialog", { name: "Add transaction" });
  await dialog.getByTestId("save-transaction").click();
  await expect(dialog.getByText("Please enter a description.")).toBeVisible();
  await dialog.getByLabel("Description").fill("Payment from Demo Client");
  await dialog.getByLabel("Amount (USD)").fill("250.50");
  await dialog.getByTestId("save-transaction").click();
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("tbody tr").first()).toContainText(
    "Payment from Demo Client",
  );
  await expect(
    page.getByRole("status").filter({ hasText: "Transaction added." }),
  ).toBeVisible();
});
test("edits and views a transaction read-only", async ({ page }) => {
  const row = page.getByTestId("transaction-1");
  await row
    .getByRole("button", { name: "Actions for Payment from Bonnie Green" })
    .click();
  await row.getByRole("button", { name: "Edit transaction" }).click();
  await page.getByLabel("Description").fill("Updated payment");
  await page.getByTestId("save-transaction").click();
  await expect(row).toContainText("Updated payment");
  await expect(
    row.getByRole("button", { name: "Actions for Updated payment" }),
  ).toBeFocused();
  await row
    .getByRole("button", { name: "Actions for Updated payment" })
    .click();
  await row.getByRole("button", { name: "View details" }).click();
  const input = page.getByLabel("Description");
  await expect(input).toHaveAttribute("readonly", "");
  await expect(page.getByRole("dialog").getByLabel("Status")).toBeDisabled();
  await expect(page.getByTestId("save-transaction")).toHaveCount(0);
});
test("confirmation protects deletion and selection supports bulk deletion", async ({
  page,
}) => {
  await page
    .getByTestId("transaction-1")
    .getByRole("button", { name: "Delete Payment from Bonnie Green" })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Cancel", exact: true })
    .click();
  await expect(page.getByTestId("transaction-1")).toBeVisible();
  await page
    .getByLabel("Select Payment from Bonnie Green", { exact: true })
    .check();
  await page
    .getByLabel("Select Payment refund to #00910", { exact: true })
    .check();
  await page
    .getByRole("button", { name: "Delete selected (2)", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Confirm delete", exact: true })
    .click();
  await expect(page.getByTestId("transaction-1")).toHaveCount(0);
  await expect(page.getByTestId("transaction-2")).toHaveCount(0);
  await expect(page.getByText("1–10 of 22", { exact: true })).toBeVisible();
  await expect(page.getByTestId("add-transaction")).toBeFocused();
});
test("loading, empty and recoverable errors", async ({ page }) => {
  await page.getByText("Demo scenarios", { exact: true }).click();
  await page.getByRole("button", { name: "Show empty state" }).click();
  await expect(page.getByTestId("loading-state")).toBeVisible();
  await expect(page.getByTestId("empty-state")).toBeVisible();
  await page.getByRole("button", { name: "Simulate load error" }).click();
  await expect(page.getByTestId("error-state")).toBeVisible();
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.getByTestId("transaction-1")).toBeVisible();
});
test("failed save preserves values and can be retried", async ({ page }) => {
  await page.getByText("Demo scenarios", { exact: true }).click();
  await page.getByRole("button", { name: "Fail next save" }).click();
  await page.getByTestId("add-transaction").click();
  await page.getByLabel("Description").fill("Retained entry");
  await page.getByTestId("save-transaction").click();
  await expect(page.getByRole("dialog").getByRole("alert")).toContainText(
    "Your entries have been kept",
  );
  await expect(page.getByLabel("Description")).toHaveValue("Retained entry");
  await page.getByTestId("save-transaction").click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator("tbody tr").first()).toContainText(
    "Retained entry",
  );
});
test("read-only mode disables mutation controls", async ({ page }) => {
  await page.getByText("Demo scenarios", { exact: true }).click();
  await page.getByLabel("Read-only mode").check();
  await expect(page.getByTestId("add-transaction")).toBeDisabled();
  await expect(
    page
      .getByTestId("transaction-1")
      .getByRole("button", { name: "Delete Payment from Bonnie Green" }),
  ).toBeDisabled();
  await page
    .getByTestId("transaction-1")
    .getByRole("button", { name: "Actions for Payment from Bonnie Green" })
    .click();
  await expect(
    page.getByRole("button", { name: "Edit transaction" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "View details" }).click();
  await expect(
    page.getByRole("dialog", { name: "Transaction details" }),
  ).toBeVisible();
});
test("keyboard dialog focus is contained and restored", async ({ page }) => {
  await page.getByTestId("add-transaction").focus();
  await page.keyboard.press("Enter");
  const close = page.getByRole("button", { name: "Close dialog" }).first();
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByTestId("save-transaction")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("add-transaction")).toBeFocused();
});
test("accessibility scan of table and invalid form", async ({ page }) => {
  let result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  await page.getByTestId("add-transaction").click();
  await page.getByTestId("save-transaction").click();
  result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});
test("mobile reflow and reduced motion keep controls reachable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  await page.getByTestId("add-transaction").click();
  await expect(page.getByRole("dialog")).toBeInViewport();
  await expect(page.getByLabel("Description")).toBeVisible();
});
