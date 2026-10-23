import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("transaction-1")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
});
test("desktop transaction table", async ({ page }) => {
  if (process.env.DEMO_VISUAL_CHANGE === "1") {
    await page.addStyleTag({ content: ":root{--ui-brand:#7c3aed!important}" });
  }
  await expect(page.getByTestId("transaction-panel")).toHaveScreenshot(
    "transactions-desktop.png",
  );
});
test("mobile page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page).toHaveScreenshot("transactions-mobile.png", {
    fullPage: true,
  });
});
test("add transaction dialog", async ({ page }) => {
  await page.getByTestId("add-transaction").click();
  await expect(
    page.getByRole("dialog", { name: "Add transaction" }),
  ).toHaveScreenshot("transaction-dialog.png");
});
