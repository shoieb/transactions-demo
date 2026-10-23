import type { Preview } from "@storybook/angular";
const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    docs: { toc: true },
  },
};
export default preview;
