import { moduleMetadata, Meta, StoryObj } from "@storybook/angular";
import { UiButtonDirective } from "./button.directive";
const meta: Meta = {
  title: "UI/Button",
  decorators: [moduleMetadata({ imports: [UiButtonDirective] })],
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "danger"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
  args: {
    variant: "primary",
    disabled: false,
    loading: false,
    label: "Add transaction",
  },
  render: (args) => ({
    props: args,
    template: `<button uiButton [variant]="variant" [disabled]="disabled" [loading]="loading">{{label}}</button>`,
  }),
};
export default meta;
type Story = StoryObj;
export const Primary: Story = {};
export const Secondary: Story = {
  args: { variant: "secondary", label: "Cancel" },
};
export const Danger: Story = {
  args: { variant: "danger", label: "Delete transaction" },
};
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true, label: "Saving…" } };
