import type { StorybookConfig } from "@storybook/angular";
const config: StorybookConfig = {
  stories: ["../projects/demo-ui/src/**/*.stories.ts"],
  addons: ["@storybook/addon-docs"],
  framework: { name: "@storybook/angular", options: {} },
  staticDirs: ["../public"],
};
export default config;
