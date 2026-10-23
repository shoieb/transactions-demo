import { moduleMetadata, Meta, StoryObj } from "@storybook/angular";
import { UiControlDirective } from "./control.directive";
import { UiFieldComponent } from "./field.component";
const meta: Meta = {
  title: "UI/Form field",
  decorators: [
    moduleMetadata({ imports: [UiControlDirective, UiFieldComponent] }),
  ],
  tags: ["autodocs"],
  args: {
    readOnly: false,
    disabled: false,
    error: "",
    value: "Payment from Alex Morgan",
  },
  render: (args) => ({
    props: args,
    template: `<div style="max-width:360px"><ui-field controlId="story-description" label="Description" [required]="true" [error]="error"><input uiControl id="story-description" [value]="value" [readOnly]="readOnly" [disabled]="disabled" required [attr.aria-invalid]="error?'true':null" [attr.aria-describedby]="error?'story-description-error':null"></ui-field></div>`,
  }),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
export const Error: Story = {
  args: { value: "", error: "Please enter a description." },
};
export const Disabled: Story = { args: { disabled: true } };
export const ReadOnly: Story = { args: { readOnly: true } };
