import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./story-tests",
  outputDir: "story-test-results",
  workers: 2,
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/storybook", open: "never" }],
  ],
  use: {
    ...devices["Desktop Chrome"],
    channel: process.env.PW_CHANNEL || "chrome",
    baseURL: "http://127.0.0.1:6006",
  },
  webServer: {
    command: "npx http-server storybook-static -a 127.0.0.1 -p 6006 -s",
    url: "http://127.0.0.1:6006",
    reuseExistingServer: !process.env.CI,
  },
});
