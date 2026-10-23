import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const cases = [
  ["ui-button--loading", "button"],
  ["ui-form-field--error", "input"],
  ["ui-form-field--read-only", "input"],
  ["ui-select--loading", "select"],
  ["ui-transaction-table--error", "h2"],
  ["ui-transaction-table--read-only", "table"],
];
for (const [id, selector] of cases) {
  test(id, async ({ page }) => {
    await page.goto(`/iframe.html?id=${id}&viewMode=story`);
    await expect(
      page.locator("#storybook-root").locator(selector).first(),
    ).toBeVisible();
    if (id === "ui-button--loading")
      await expect(page.getByRole("button")).toBeDisabled();
    if (id === "ui-form-field--read-only")
      await expect(page.locator("input")).toHaveAttribute("readonly", "");
    if (id === "ui-transaction-table--read-only")
      await expect(
        page.getByRole("button", { name: /Delete Payment/ }).first(),
      ).toBeDisabled();
    const result = await new AxeBuilder({ page })
      .include("#storybook-root")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  });
}
test("dialog story supports opening and Escape dismissal", async ({ page }) => {
  await page.goto("/iframe.html?id=ui-dialog--default&viewMode=story");
  await page.getByRole("button", { name: "Open dialog" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open dialog" })).toBeFocused();
});
